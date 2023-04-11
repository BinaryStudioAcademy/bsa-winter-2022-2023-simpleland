import { type ValueOf } from '~/libs/types/types.js';
import { SectionType } from '~/packages/sections/libs/enums/enums.js';
import {
  type SiteAboutContent,
  type SiteAboutUpdateContentDto,
  type SiteHeaderContent,
  type SiteHeaderUpdateContentDto,
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
  [SectionType.ABOUT]: (content, contentUpdates) => {
    const aboutContent = content as SiteAboutContent;
    const { title, description } = contentUpdates as SiteAboutUpdateContentDto;

    aboutContent.title = title;
    aboutContent.description = description;

    return aboutContent;
  },
  [SectionType.PORTFOLIO]: () => ({}),
  [SectionType.SERVICE]: () => ({}),
  [SectionType.FEEDBACK]: () => ({}),
  [SectionType.FOOTER]: () => ({}),
};

export { sectionTypeToUpdateSectionHandler };
