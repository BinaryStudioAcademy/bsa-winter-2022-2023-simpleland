import { initAsyncItemsQueue } from '~/libs/helpers/helpers.js';
import { type IService } from '~/libs/interfaces/interfaces.js';
import { file } from '~/libs/packages/file/file.js';
import { openAI } from '~/libs/packages/open-ai/open-ai.js';
import { type ValueOf } from '~/libs/types/types.js';

import { SectionType } from './libs/enums/enums.js';
import {
  type SectionGetAllItemResponseDto,
  type SectionGetAllResponseDto,
  type SiteFooterContent,
  type SiteHeaderContent,
  type SiteMainContent,
  type SitePortfolioContent,
} from './libs/types/types.js';
import { SectionEntity } from './section.entity.js';
import { type SectionRepository } from './section.repository.js';

class SectionService
  implements Omit<IService, 'find' | 'findAll' | 'update' | 'delete'>
{
  private sectionRepository: SectionRepository;

  public constructor(sectionRepository: SectionRepository) {
    this.sectionRepository = sectionRepository;
  }

  public async findBySiteId(siteId: number): Promise<SectionGetAllResponseDto> {
    const sections = await this.sectionRepository.findBySiteId(siteId);

    return { items: sections.map((section) => section.toObject()) };
  }

  public async create({
    siteId,
    prompt,
    type,
  }: {
    siteId: number;
    prompt: string;
    type: ValueOf<typeof SectionType>;
  }): Promise<SectionGetAllItemResponseDto> {
    const content = await this.createSectionContent(prompt, type);

    const section = await this.sectionRepository.create({
      siteId,
      entity: SectionEntity.initializeNew({
        type,
        content,
      }),
    });

    return section.toObject();
  }

  private async createSectionContent<T extends ValueOf<typeof SectionType>>(
    prompt: string,
    type: T,
  ): Promise<
    | SiteHeaderContent
    | SiteMainContent
    | SitePortfolioContent
    | SiteFooterContent
  > {
    const response = await openAI.createCompletion(prompt);

    switch (type) {
      case SectionType.HEADER: {
        return this.createHeaderContent(response);
      }
      case SectionType.MAIN: {
        return this.createMainContent(response);
      }
      case SectionType.PORTFOLIO: {
        return await this.createPortfolioContent(response);
      }
      case SectionType.FOOTER: {
        return this.createFooterContent(response);
      }
      default: {
        throw new Error('Should not reach here');
      }
    }
  }

  private createHeaderContent(
    content: Record<string, string>,
  ): SiteHeaderContent {
    return {
      logo: content['logo'] ?? '',
      phone: content['phone'] ?? '',
    };
  }

  private createMainContent(content: Record<string, string>): SiteMainContent {
    return {
      title: content['title'] ?? '',
      description: content['description'] ?? '',
      picture: '',
    };
  }

  private async createPortfolioContent(
    content: Record<string, string>,
  ): Promise<SitePortfolioContent> {
    const portfolioContent = {
      categories:
        content['categories']?.split(', ').map((item) => {
          return { name: item, images: [] };
        }) ?? [],
    } as SitePortfolioContent;

    await initAsyncItemsQueue(portfolioContent.categories, async (category) => {
      const images = await openAI.createImages({
        prompt: `Portfolio images for website by category: ${category.name}`,
        n: 8,
        response_format: 'b64_json',
      });
      const imagePromises = images.map((image) => {
        return file.upload({ file: Buffer.from(image) });
      });
      const s3Images = await Promise.all(imagePromises);
      category.images = s3Images.map((image) => image.url);
    });

    return portfolioContent;
  }

  private createFooterContent(
    content: Record<string, string>,
  ): SiteFooterContent {
    return {
      logo: content['logo'] ?? '',
      description: content['description'] ?? '',
      contacts: [],
      socials: [],
    };
  }
}

export { SectionService };
