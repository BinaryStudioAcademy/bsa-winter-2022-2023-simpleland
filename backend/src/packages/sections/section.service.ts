import { initAsyncItemsQueue } from '~/libs/helpers/helpers.js';
import { type IService } from '~/libs/interfaces/interfaces.js';
import { type File } from '~/libs/packages/file/file.package.js';
import { openAI } from '~/libs/packages/open-ai/open-ai.js';
import { type ValueOf } from '~/libs/types/types.js';

import { SectionType } from './libs/enums/enums.js';
import {
  type SectionGetAllItemResponseDto,
  type SectionGetAllResponseDto,
  type SectionUpdateParametersDto,
  type SectionUpdateRequestDto,
  type SiteAboutContent,
  type SiteFeedbackContent,
  type SiteFooterContent,
  type SiteHeaderContent,
  type SiteHeaderUpdateContentDto,
  type SiteMainContent,
  type SitePortfolioContent,
} from './libs/types/types.js';
import { SectionEntity } from './section.entity.js';
import { type SectionRepository } from './section.repository.js';

type Constructor = {
  sectionRepository: SectionRepository;
  file: File;
};

class SectionService
  implements Omit<IService, 'find' | 'findAll' | 'update' | 'delete'>
{
  private sectionRepository: SectionRepository;

  private file: File;

  private static feedbackCardsQuantity = 2;

  private static portfolioCategoryImagesQuantity = 2;

  public constructor({ sectionRepository, file }: Constructor) {
    this.sectionRepository = sectionRepository;
    this.file = file;
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

  public async update(
    payload: SectionUpdateParametersDto & SectionUpdateRequestDto,
  ): Promise<SectionGetAllItemResponseDto | null> {
    const id = Number(payload.id);

    const entity = await this.sectionRepository.find(id);

    if (!entity) {
      return null;
    }

    const section = entity.toObject();

    if (section.type !== payload.type) {
      null;
    }

    if (payload.type === SectionType.HEADER) {
      const content = section.content as SiteHeaderContent;
      const { logo, phone } = payload.content as SiteHeaderUpdateContentDto;

      content.logo = logo;
      content.phone = phone;

      const updatedSection = await this.sectionRepository.update(
        SectionEntity.initialize({ id, content, type: null }),
      );

      return updatedSection.toObject();
    }

    return section;
  }

  private async createSectionContent<T extends ValueOf<typeof SectionType>>(
    prompt: string,
    type: T,
  ): Promise<
    | SiteHeaderContent
    | SiteMainContent
    | SitePortfolioContent
    | SiteAboutContent
    | SiteFeedbackContent
    | SiteFooterContent
  > {
    switch (type) {
      case SectionType.HEADER: {
        return await this.createHeaderContent(prompt);
      }
      case SectionType.MAIN: {
        return await this.createMainContent(prompt);
      }
      case SectionType.ABOUT: {
        return await this.createAboutContent(prompt);
      }
      case SectionType.PORTFOLIO: {
        return await this.createPortfolioContent(prompt);
      }
      case SectionType.FOOTER: {
        return await this.createFooterContent(prompt);
      }
      case SectionType.FEEDBACK: {
        return await this.createFeedbackContent(prompt);
      }
      default: {
        throw new Error('Should not reach here');
      }
    }
  }

  private async createHeaderContent(
    prompt: string,
  ): Promise<SiteHeaderContent> {
    const content = await openAI.createCompletion(prompt);

    return {
      logo: content['logo'] ?? '',
      phone: content['phone'] ?? '',
    };
  }

  private async createMainContent(prompt: string): Promise<SiteMainContent> {
    const content = await openAI.createCompletion(prompt);

    return {
      title: content['title'] ?? '',
      description: content['description'] ?? '',
      picture: '',
    };
  }

  private async createFooterContent(
    prompt: string,
  ): Promise<SiteFooterContent> {
    const content = await openAI.createCompletion(prompt);

    return {
      logo: content['logo'] ?? '',
      description: content['description'] ?? '',
      contacts: [],
      socials: [],
    };
  }

  private async createAboutContent(prompt: string): Promise<SiteAboutContent> {
    const content = await openAI.createCompletion(prompt);

    return {
      title: content['title'] ?? '',
      description: content['description'] ?? '',
    };
  }

  private async createFeedbackContent(
    prompt: string,
  ): Promise<SiteFeedbackContent> {
    const cardsContent = await Promise.all(
      Array.from({ length: SectionService.feedbackCardsQuantity }, () =>
        openAI.createCompletion(prompt),
      ),
    );

    const cards = cardsContent.map((cardContent) => ({
      name: cardContent['name'] ?? '',
      profession: cardContent['profession'] ?? '',
      feedback: cardContent['feedback'] ?? '',
      photo: cardContent['photoDescription'] ?? '',
    }));

    await initAsyncItemsQueue(cards, async (card) => {
      const image = await openAI.createImage(
        `Portrait with sigma 85mm f/1.4. ${card.photo}`,
      );

      const { url } = await this.file.upload({ file: image });

      card.photo = url;
    });

    return {
      title: 'What people say',
      cards,
    };
  }

  private async createPortfolioContent(
    prompt: string,
  ): Promise<SitePortfolioContent> {
    const content = await openAI.createCompletion(prompt);
    const portfolioContent = {
      title: 'Our portfolio',
      categories:
        content['categories']?.split(',').map((item) => {
          return { name: item, images: [] };
        }) ?? [],
    } as SitePortfolioContent;

    await initAsyncItemsQueue(portfolioContent.categories, async (category) => {
      const rawImages = await openAI.createImages(
        `Find website portfolio images for the ${category.name} category.`,
        SectionService.portfolioCategoryImagesQuantity,
      );
      const images = await Promise.all(
        rawImages.map((image) => {
          return this.file.upload({ file: image });
        }),
      );
      category.images = images.map((image) => image.url);
    });

    return portfolioContent;
  }
}

export { SectionService };
