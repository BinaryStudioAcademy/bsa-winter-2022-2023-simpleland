import { initAsyncItemsQueue } from 'shared/build/index.js';

import { type IService } from '~/libs/interfaces/interfaces.js';
import { openAI } from '~/libs/packages/open-ai/open-ai.js';
import { type ValueOf } from '~/libs/types/types.js';

import { SectionType } from './libs/enums/enums.js';
import {
  type SectionGetAllItemResponseDto,
  type SectionGetAllResponseDto,
  type SiteAboutContent,
  type SiteFeedbackContent,
  type SiteFooterContent,
  type SiteHeaderContent,
  type SiteMainContent,
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
    | SiteFooterContent
    | SiteAboutContent
    | SiteFeedbackContent
  > {
    switch (type) {
      case SectionType.HEADER: {
        return await this.createHeaderContent(prompt);
      }
      case SectionType.MAIN: {
        return await this.createMainContent(prompt);
      }
      case SectionType.ABOUT: {
        return this.createAboutContent(prompt);
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

  private async createAboutContent(prompt: string): SiteAboutContent {
    const content = await openAI.createCompletion(prompt);

    return {
      title: content['title'] ?? '',
      description: content['description'] ?? '',
    };
  }

  private async createFeedbackContent(
    prompt: string,
  ): Promise<SiteFeedbackContent> {
    const CARDS_COUNT = 8;

    const cardsContent = await Promise.all(
      Array.from({ length: CARDS_COUNT }).map(() =>
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
      card.photo = await openAI.createImage(
        `Portrait with sigma 85mm f/1.4. ${card.photo}`,
      );
    });

    return {
      title: 'What people say',
      cards,
    };
  }
}

export { SectionService };
