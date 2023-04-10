import { type ValueOf } from '~/libs/types/types.js';
import { SectionType } from '~/packages/sections/libs/enums/enums.js';
import {
  type SiteHeaderContent,
  type SiteHeaderUpdateContentDto,
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
  [SectionType.MAIN]: () => ({}),
  [SectionType.ABOUT]: () => ({}),
  [SectionType.PORTFOLIO]: (content, contentUpdates) => {
    const portfolioContent = content as SitePortfolioContent;
    const { title } = contentUpdates as SitePortfolioUpdateContentDto;

    portfolioContent.title = title;

    return portfolioContent;
  },
  [SectionType.SERVICE]: () => ({}),
  [SectionType.FEEDBACK]: () => ({}),
  [SectionType.FOOTER]: () => ({}),
};

export { sectionTypeToUpdateSectionHandler };
