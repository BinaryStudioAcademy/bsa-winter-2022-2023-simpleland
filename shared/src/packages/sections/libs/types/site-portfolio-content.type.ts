type SitePortfolioContent = {
  title: string;
  categories: SitePortfolioCategory[];
};

type SitePortfolioCategory = {
  name: string;
  images: string[];
};

export { type SitePortfolioContent };
