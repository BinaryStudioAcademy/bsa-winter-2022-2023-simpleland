type SitePortfolioContent = {
  categories: SitePortfolioCategory[];
};

type SitePortfolioCategory = {
  name: string;
  images: string[];
};

export { type SitePortfolioContent };
