const SiteValidationRule = {
  SITE_NAME_REGEX: /^[\w!"#$%&'()*+,./:;<=>?@[\\\]^{|}~-]{1,30}$/,
} as const;

export { SiteValidationRule };
