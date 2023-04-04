import { initAsyncItemsQueue } from '~/libs/helpers/helpers.js';
import { type IService } from '~/libs/interfaces/interfaces.js';
import { type File } from '~/libs/packages/file/file.package.js';
import { openAI } from '~/libs/packages/open-ai/open-ai.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type SectionGetAllResponseDto,
  sectionService,
  SectionType,
} from '~/packages/sections/sections.js';
import { SiteEntity } from '~/packages/sites/site.entity.js';
import { type SiteRepository } from '~/packages/sites/site.repository.js';

import { PROMPT_HEADING } from './libs/constants/constants.js';
import { SectionTypeToPrompt } from './libs/maps/maps.js';
import {
  type SiteCreateRequestDto,
  type SiteCreateResponseDto,
  type SiteGetAllResponseDto,
} from './libs/types/types.js';

type Constructor = {
  siteRepository: SiteRepository;
  file: File;
};

class SiteService implements Omit<IService, 'find' | 'update' | 'delete'> {
  private siteRepository: SiteRepository;

  private file: File;

  public constructor({ siteRepository, file }: Constructor) {
    this.siteRepository = siteRepository;
    this.file = file;
  }

  public async findAll(): Promise<SiteGetAllResponseDto> {
    const sites = await this.siteRepository.findAll();

    return {
      items: sites.map((site) => site.toObject()),
    };
  }

  public async findAllByProjectId(
    projectId: number,
  ): Promise<SiteGetAllResponseDto> {
    const sites = await this.siteRepository.findAllByProjectId(projectId);

    return {
      items: sites.map((site) => site.toObject()),
    };
  }

  public async create(
    payload: SiteCreateRequestDto & {
      projectId: number;
    },
  ): Promise<SiteCreateResponseDto> {
    const siteImage = await openAI.createImage(
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
          prompt: this.createPrompt(SectionType.HEADER, payload),
          type: SectionType.HEADER,
        },
        {
          siteId: site.id,
          prompt: this.createPrompt(SectionType.MAIN, payload),
          type: SectionType.MAIN,
        },
        {
          siteId: site.id,
          prompt: this.createPrompt(SectionType.PORTFOLIO, payload),
          type: SectionType.PORTFOLIO,
        },
        {
          siteId: site.id,
          prompt: this.createPrompt(SectionType.ABOUT, payload),
          type: SectionType.ABOUT,
        },
        {
          siteId: site.id,
          prompt: this.createPrompt(SectionType.FEEDBACK, payload),
          type: SectionType.FEEDBACK,
        },
        {
          siteId: site.id,
          prompt: this.createPrompt(SectionType.FOOTER, payload),
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
    siteInfo: SiteCreateRequestDto,
  ): string {
    const EXAMPLE_COMPANY_NAME = 'id Studio';
    const EXAMPLE_INDUSTRY = 'interior design';

    const exampleSiteDescription = this.createSiteDescription({
      name: EXAMPLE_COMPANY_NAME,
      industry: EXAMPLE_INDUSTRY,
    });

    const siteDescription = this.createSiteDescription(siteInfo);

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
  }: SiteCreateRequestDto): string => {
    return `Generate content for website with name ${name}. It is site for ${industry} company.`;
  };

  private createSiteImagePrompt = ({
    name,
    industry,
  }: SiteCreateRequestDto): string => {
    return `Generate image for website with name ${name}. It is site for ${industry} company.`;
  };
}

export { SiteService };
