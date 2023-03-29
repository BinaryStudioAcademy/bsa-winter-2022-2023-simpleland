const SiteNameValidationRule = {
  SITE_NAME_REGEX: /^[\w!"#$%&'()*+,./:;<=>?@[\\\]^{|}~-]{1,30}$/,
} as const;

export { SiteNameValidationRule };
