import { type ValueOf } from '~/libs/types/types.js';
import { SectionType } from '~/packages/sections/libs/enums/enums.js';

const SectionTypeToPrompt: Record<
  ValueOf<typeof SectionType>,
  { EXAMPLE: string; REQUEST: string }
> = {
  [SectionType.HEADER]: {
    EXAMPLE: 'logo: id Studio\nphone: (303)555-0105',
    REQUEST:
      'Generate text logo for header section, phone number for header section.',
  },
  [SectionType.MAIN]: {
    EXAMPLE:
      'title: We create your space better\ndescription: Our team creates comfortable spaces for our clients. We’ve been designing your everyday life and work through great ideas since 1999.\nimageDescription: Picture showcases a sleek and sophisticated black sofa in a modern interior room designed by an interior design company. The room exudes a sense of elegance and simplicity, with clean lines and minimalistic decor. The black sofa is the focal point of the room, inviting viewers to imagine themselves lounging on its plush cushions.',
    REQUEST:
      'Generate title for main section, description for main section, imageDescription for main section.',
  },
  [SectionType.ABOUT]: {
    EXAMPLE:
      'title: About Studio\ndescription: Interiart is an award-winning architecture and interior design practice based in NYC. We work internationally on projects of residential & commercial interior design that require a creative approach. Our talented and experienced designers leverage their knowledge and expertise to create unique and comfortable interiors for you. Our team knows that interior design can be stressful for the client and we do our best to make it as easy as possible. We listen to your needs, ideas, and inputs. And most importantly, we make it exciting and enjoyable for our clients.',
    REQUEST: 'Generate title for about section, description for about section.',
  },
  [SectionType.PORTFOLIO]: {
    EXAMPLE:
      'categories: commercial,residential,office,other\ncommercialImageDescription: Interior of a modern retail store with sleek furniture and lighting\nresidentialImageDescription: A cozy living room with a comfortable sofa and a fireplace\nofficeImageDescription: An open-plan office with modern furniture and plenty of natural light\notherImageDescription: An artistic installation in a public space, featuring colorful and dynamic designs.',
    REQUEST:
      'Generate four category names for the portfolio section, separated by commas without spaces and imageDescription for each category. If you supposed to place space in category name replace it with hyphen',
  },
  [SectionType.FOOTER]: {
    EXAMPLE:
      'logo: id Studio\ndescription: We are one of the leading interior design and remodeling studios available for all of your residential and commercial interior design needs.',
    REQUEST:
      'Generate logo text for footer section, description for footer section.',
  },
  [SectionType.FEEDBACK]: {
    EXAMPLE:
      'name: Annette Black\nphotoDescription: The woman in the photo has long, wavy hair and bright green eyes that sparkle with kindness. She is dressed in a flowing floral dress, standing in a lush green field with a peaceful and contented demeanor.\nprofession: Merchandising Associate\nfeedback: This interior design company offers impressive designs that are both practical and imaginative. They have a reliable team and a strong portfolio that demonstrates their skill in creating beautiful spaces. Highly recommended.',
    REQUEST:
      'Generate name for feedback section, photoDescription for feedback section, profession for feedback section, feedback for feedback section',
  },
  [SectionType.SERVICE]: {
    EXAMPLE:
      'title: Space Planning\npictureDescription: sofa with pictures above it and high leg lamp on the left hand side .\ndescription: We create better interior experiences through our space planning services.',
    REQUEST:
      'Generate title for service section, pictureDescription for feedback section, description for feedback section',
  },
} as const;

export { SectionTypeToPrompt };
