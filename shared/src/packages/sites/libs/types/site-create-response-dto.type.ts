type SiteCreateResponseDto = {
  id: number;
  name: string;
  targetAudience: string[];
  publishedUrl: string | null;
  image: string | null;
};

export { type SiteCreateResponseDto };
