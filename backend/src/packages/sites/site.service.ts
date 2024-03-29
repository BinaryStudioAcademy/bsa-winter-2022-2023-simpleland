import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/interfaces.js';
import { type File } from '~/libs/packages/file/file.package.js';
import { type OpenAI } from '~/libs/packages/open-ai/open-ai.package.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type ProjectService } from '~/packages/projects/project.service.js';
import { projectService } from '~/packages/projects/projects.js';
import {
  type SectionGetAllResponseDto,
  sectionService,
  SectionType,
} from '~/packages/sections/sections.js';
import { SiteEntity } from '~/packages/sites/site.entity.js';
import { type SiteRepository } from '~/packages/sites/site.repository.js';

import { PROMPT_HEADING } from './libs/constants/constants.js';
import {
  SiteImagePrompt,
  SiteTargetType,
  SiteToneType,
} from './libs/enums/enums.js';
import { SectionTypeToPrompt } from './libs/maps/maps.js';
import {
  type SiteCreateRequestDto,
  type SiteCreateResponseDto,
  type SiteGetAllItemResponseDto,
  type SiteGetAllResponseDto,
  type SitesFilterQueryDto,
} from './libs/types/types.js';

type Constructor = {
  projectService: ProjectService;
  siteRepository: SiteRepository;
  file: File;
  openAI: OpenAI;
};

class SiteService implements Omit<IService, 'find' | 'update' | 'delete'> {
  private siteRepository: SiteRepository;

  private projectService: ProjectService;

  private file: File;

  private openAI: OpenAI;

  public constructor({
    projectService,
    siteRepository,
    file,
    openAI,
  }: Constructor) {
    this.projectService = projectService;
    this.siteRepository = siteRepository;
    this.file = file;
    this.openAI = openAI;
  }

  public async findAll(): Promise<SiteGetAllResponseDto> {
    const sites = await this.siteRepository.findAll();

    return {
      items: sites.map((site) => site.toObject()),
      totalCount: sites.length,
    };
  }

  public async find(id: number): Promise<SiteGetAllItemResponseDto> {
    const site = await this.siteRepository.find(id);

    if (!site) {
      throw new ApplicationError({
        message: `Site with id ${id} not found`,
      });
    }

    return site.toObject();
  }

  public async findAllByProjectId(
    userId: number,
    projectId: number,
    queryParameters: SitesFilterQueryDto,
  ): Promise<SiteGetAllResponseDto> {
    const project = await this.projectService.find(projectId);

    if (project.userId !== userId) {
      throw new ApplicationError({
        message: 'Access denied',
      });
    }

    const { items, totalCount } = await this.siteRepository.findAllByProjectId(
      project.id,
      queryParameters,
    );

    return {
      totalCount,
      items: items.map((item) => item.toObject()),
    };
  }

  public async create(
    payload: SiteCreateRequestDto & {
      projectId: number;
    },
  ): Promise<SiteCreateResponseDto> {
    const { category } = await projectService.find(payload.projectId);

    const image = await this.openAI.createCompletion(
      this.createPrompt('siteImage', {
        ...payload,
        category,
      }),
    );

    const siteImage = await this.openAI.createImage(
      image['imageDescription'] ?? '',
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

    await Promise.all(
      Object.values(SectionType).map((type) =>
        sectionService.create({
          siteId: site.id,
          prompt: this.createPrompt(type, {
            ...payload,
            category,
          }),
          type,
        }),
      ),
    );

    return site;
  }

  public async findSectionsBySiteId(
    siteId: number,
  ): Promise<SectionGetAllResponseDto> {
    return await sectionService.findBySiteId(siteId);
  }

  private createPrompt(
    type: ValueOf<typeof SectionType> | 'siteImage',
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

    const { EXAMPLE, REQUEST } =
      type === 'siteImage' ? SiteImagePrompt : SectionTypeToPrompt[type];

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
}

export { SiteService };
