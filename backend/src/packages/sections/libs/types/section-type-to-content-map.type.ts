import { type SectionType } from '~/packages/sections/libs/enums/enums.js';

import { type Footer } from './footer.type.js';
import { type Header } from './header.type.js';
import { type Main } from './main.type.js';

type SectionTypeToContentMap = {
  [SectionType.HEADER]: Header;
  [SectionType.MAIN]: Main;
  [SectionType.FOOTER]: Footer;
};

export { type SectionTypeToContentMap };
