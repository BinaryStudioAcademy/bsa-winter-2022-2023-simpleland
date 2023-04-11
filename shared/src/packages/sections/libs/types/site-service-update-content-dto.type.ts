type SiteServiceUpdateContentDto = {
  title: string;
  cards: {
    title: string;
    description: string;
    picture: string;
  }[];
};

export { type SiteServiceUpdateContentDto };
