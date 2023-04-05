import { initAsyncItemsQueue } from '~/libs/helpers/helpers.js';
import { type IService } from '~/libs/interfaces/interfaces.js';
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
  type SitesSearchRequestDto,
} from './libs/types/types.js';

class SiteService implements Omit<IService, 'find' | 'update' | 'delete'> {
  private siteRepository: SiteRepository;

  public constructor(siteRepository: SiteRepository) {
    this.siteRepository = siteRepository;
  }

  public async findAll(): Promise<SiteGetAllResponseDto> {
    const sites = await this.siteRepository.findAll();

    return {
      items: sites.map((site) => site.toObject()),
    };
  }

  public async findAllByProjectId(
    projectId: number,
    parameters: SitesSearchRequestDto,
  ): Promise<SiteGetAllResponseDto> {
    const sites = await this.siteRepository.findAllByProjectId(
      projectId,
      parameters,
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
    const entity = await this.siteRepository.create(
      SiteEntity.initializeNew({
        name: payload.name,
        projectId: payload.projectId,
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
          prompt: this.createPrompt(SectionType.SERVICE, payload),
          type: SectionType.SERVICE,
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
}

export { SiteService };
