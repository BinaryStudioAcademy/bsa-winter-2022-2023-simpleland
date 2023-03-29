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
import { SectionTypeToPrompt } from './libs/enums/enums.js';
import {
  type SiteCreateRequestDto,
  type SiteCreateResponseDto,
  type SiteGetAllResponseDto,
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
  ): Promise<SiteGetAllResponseDto> {
    const sites = await this.siteRepository.findAllByProjectId(projectId);

    return {
      items: sites.map((site) => site.toObject()),
    };
  }

  public async create(
    payload: SiteCreateRequestDto,
  ): Promise<SiteCreateResponseDto> {
    const entity = await this.siteRepository.create(
      SiteEntity.initializeNew({ name: payload.name }),
    );
    const site = entity.toObject();

    await Promise.all([
      sectionService.create({
        siteId: site.id,
        prompt: this.createPrompt(SectionType.HEADER, payload),
        type: SectionType.HEADER,
      }),
      sectionService.create({
        siteId: site.id,
        prompt: this.createPrompt(SectionType.MAIN, payload),
        type: SectionType.MAIN,
      }),
      sectionService.create({
        siteId: site.id,
        prompt: this.createPrompt(SectionType.FOOTER, payload),
        type: SectionType.FOOTER,
      }),
    ]);

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

    const { example, request } = SectionTypeToPrompt[type];

    const prompt = [
      PROMPT_HEADING,
      'Example:',
      exampleSiteDescription,
      request,
      example,
      siteDescription,
      request,
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
