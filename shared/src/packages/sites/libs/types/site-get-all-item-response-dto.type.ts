type SiteGetAllItemResponseDto = {
  id: number;
  name: string;
  targetAudience: { label: string; value: string }[];
  publishedUrl: string | null;
};

export { type SiteGetAllItemResponseDto };
