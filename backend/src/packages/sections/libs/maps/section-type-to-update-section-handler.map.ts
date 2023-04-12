import { type ValueOf } from '~/libs/types/types.js';
import { SectionType } from '~/packages/sections/libs/enums/enums.js';
import {
  type SiteAboutContent,
  type SiteAboutUpdateContentDto,
  type SiteFeedbackContent,
  type SiteFeedbackUpdateContentDto,
  type SiteFooterContent,
  type SiteFooterUpdateContentDto,
  type SiteHeaderContent,
  type SiteHeaderUpdateContentDto,
  type SiteMainContent,
  type SiteMainUpdateContentDto,
  type SitePortfolioContent,
  type SitePortfolioUpdateContentDto,
} from '~/packages/sections/libs/types/types.js';

const sectionTypeToUpdateSectionHandler: Record<
  ValueOf<typeof SectionType>,
  (content: unknown, contentUpdates: unknown) => unknown
> = {
  [SectionType.HEADER]: (content, contentUpdates) => {
    const headerContent = content as SiteHeaderContent;
    const { logo, phone } = contentUpdates as SiteHeaderUpdateContentDto;

    headerContent.logo = logo;
    headerContent.phone = phone;

    return headerContent;
  },
  [SectionType.MAIN]: (content, contentUpdates) => {
    const mainContent = content as SiteMainContent;
    const { title, description } = contentUpdates as SiteMainUpdateContentDto;

    mainContent.title = title;
    mainContent.description = description;

    return mainContent;
  },
  [SectionType.ABOUT]: (content, contentUpdates) => {
    const aboutContent = content as SiteAboutContent;
    const { title, description } = contentUpdates as SiteAboutUpdateContentDto;

    aboutContent.title = title;
    aboutContent.description = description;

    return aboutContent;
  },
  [SectionType.PORTFOLIO]: (content, contentUpdates) => {
    const portfolioContent = content as SitePortfolioContent;
    const { title } = contentUpdates as SitePortfolioUpdateContentDto;

    portfolioContent.title = title;

    return portfolioContent;
  },
  [SectionType.SERVICE]: () => ({}),
  [SectionType.FEEDBACK]: (content, contentUpdates) => {
    const feedbackContent = content as SiteFeedbackContent;
    const { title, cards } = contentUpdates as SiteFeedbackUpdateContentDto;

    feedbackContent.title = title;
    feedbackContent.cards = cards;

    return feedbackContent;
  },
  [SectionType.FOOTER]: (content, contentUpdates) => {
    const footerContent = content as SiteFooterContent;
    const { email, address, phone } = (
      contentUpdates as SiteFooterUpdateContentDto
    ).contacts;

    footerContent.contacts.email = email;
    footerContent.contacts.address = address;
    footerContent.contacts.phone = phone;

    return footerContent;
  },
};

export { sectionTypeToUpdateSectionHandler };
