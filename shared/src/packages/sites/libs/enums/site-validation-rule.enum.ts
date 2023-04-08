const SiteValidationRule = {
  SITE_NAME_REGEX: /^(?! )[\w !"#$%&'()*+,./:;<=>?@[\\\]^{|}~-]{1,30}$/,
  SITE_INDUSTRY_REGEX: /^[ A-Za-z-]{1,16}$/,
} as const;

export { SiteValidationRule };
