type SiteCreateRequestDto = {
  name: string;
  industry: string;
  targetAudience: { label: string; value: string }[];
};

export { type SiteCreateRequestDto };
