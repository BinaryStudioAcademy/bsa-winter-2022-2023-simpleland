import { initAsyncItemsQueue } from '~/libs/helpers/helpers.js';
import { type IService } from '~/libs/interfaces/interfaces.js';
import { type File } from '~/libs/packages/file/file.package.js';
import { type OpenAI } from '~/libs/packages/open-ai/open-ai.package.js';
import { type ValueOf } from '~/libs/types/types.js';
import { projectService } from '~/packages/projects/projects.js';
import {
  type SectionGetAllResponseDto,
  sectionService,
  SectionType,
} from '~/packages/sections/sections.js';
import { SiteEntity } from '~/packages/sites/site.entity.js';
import { type SiteRepository } from '~/packages/sites/site.repository.js';

import { PROMPT_HEADING } from './libs/constants/constants.js';
import { SiteTargetType, SiteToneType } from './libs/enums/enums.js';
import { SectionTypeToPrompt } from './libs/maps/maps.js';
import {
  type SiteCreateRequestDto,
  type SiteCreateResponseDto,
  type SiteGetAllResponseDto,
  type SitesFilterQueryDto,
} from './libs/types/types.js';

type Constructor = {
  siteRepository: SiteRepository;
  file: File;
  openAI: OpenAI;
};

class SiteService implements Omit<IService, 'find' | 'update' | 'delete'> {
  private siteRepository: SiteRepository;

  private file: File;

  private openAI: OpenAI;

  public constructor({ siteRepository, file, openAI }: Constructor) {
    this.siteRepository = siteRepository;
    this.file = file;
    this.openAI = openAI;
  }

  public async findAll(): Promise<SiteGetAllResponseDto> {
    const sites = await this.siteRepository.findAll();

    return {
      items: sites.map((site) => site.toObject()),
    };
  }

  public async findAllByProjectId(
    projectId: number,
    queryParameters: SitesFilterQueryDto,
  ): Promise<SiteGetAllResponseDto> {
    const sites = await this.siteRepository.findAllByProjectId(
      projectId,
      queryParameters,
    );

    return {
      items: sites.map((site) => site.toObject()),
    };
  }

  public async create(
    payload: SiteCreateRequestDto & {
      projectId: number;
    },
  ): Promise<SiteCreateResponseDto> {
    const { category } = await projectService.find(payload.projectId);

    const siteImage = await this.openAI.createImage(
      this.createSiteImagePrompt(payload),
    );
    const { url } = await this.file.upload({ file: siteImage });

    const entity = await this.siteRepository.create(
      SiteEntity.initializeNew({
        name: payload.name,
        projectId: payload.projectId,
        image: url,
      }),
    );
    const site = entity.toObject();

    await initAsyncItemsQueue(
      [
        {
          siteId: site.id,
          prompt: this.createPrompt(SectionType.HEADER, {
            ...payload,
            category,
          }),
          type: SectionType.HEADER,
        },
        {
          siteId: site.id,
          prompt: this.createPrompt(SectionType.MAIN, {
            ...payload,
            category,
          }),
          type: SectionType.MAIN,
        },
        {
          siteId: site.id,
          prompt: this.createPrompt(SectionType.PORTFOLIO, {
            ...payload,
            category,
          }),
          type: SectionType.PORTFOLIO,
        },
        {
          siteId: site.id,
          prompt: this.createPrompt(SectionType.ABOUT, {
            ...payload,
            category,
          }),
          type: SectionType.ABOUT,
        },
        {
          siteId: site.id,
          prompt: this.createPrompt(SectionType.SERVICE, {
            ...payload,
            category,
          }),
          type: SectionType.SERVICE,
        },
        {
          siteId: site.id,
          prompt: this.createPrompt(SectionType.FEEDBACK, {
            ...payload,
            category,
          }),
          type: SectionType.FEEDBACK,
        },
        {
          siteId: site.id,
          prompt: this.createPrompt(SectionType.FOOTER, {
            ...payload,
            category,
          }),
          type: SectionType.FOOTER,
        },
      ],
      async (section) => {
        await sectionService.create(section);
      },
    );

    return site;
  }

  public async findSectionsBySiteId(
    siteId: number,
  ): Promise<SectionGetAllResponseDto> {
    return await sectionService.findBySiteId(siteId);
  }

  private createPrompt(
    type: ValueOf<typeof SectionType>,
    siteInfo: SiteCreateRequestDto & { category: string },
  ): string {
    const exampleSiteDescription = this.createSiteDescription({
      name: 'id Studio',
      industry: 'interior design',
      tone: SiteToneType.OFFICIAL,
      targetAudience: SiteTargetType.YOUNG_ADULT,
      category: siteInfo.category,
    });

    const siteDescription = this.createSiteDescription({
      ...siteInfo,
      category: siteInfo.category,
    });

    const { EXAMPLE, REQUEST } = SectionTypeToPrompt[type];

    const prompt = [
      PROMPT_HEADING,
      'Example:',
      exampleSiteDescription,
      REQUEST,
      EXAMPLE,
      siteDescription,
      REQUEST,
    ];

    return prompt.join('\n');
  }

  private createSiteDescription = ({
    name,
    industry,
    tone,
    targetAudience,
    category,
  }: SiteCreateRequestDto & { category: string }): string => {
    return `Generate content for a website with name ${name} and ${category}. It is a site for a ${industry} company. The target audience is ${targetAudience}. The tone and style should be ${tone}.`;
  };

  private createSiteImagePrompt = ({
    name,
    industry,
    tone,
    targetAudience,
  }: SiteCreateRequestDto): string => {
    return `Generate content for a website with name ${name}. It is a site for ${industry} company. The target audience is ${targetAudience}. The tone and style should be ${tone}.`;
  };
}

export { SiteService };
