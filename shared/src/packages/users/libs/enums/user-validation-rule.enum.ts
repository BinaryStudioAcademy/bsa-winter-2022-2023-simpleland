const UserValidationRule = {
  EMAIL_REGEX:
    /^(\w)([\w+.-]{0,34}\w)?@[\dA-Za-z][\dA-Za-z-]{0,61}[\dA-Za-z]\.[A-Za-z]{2,}$/,
  PASSWORD_REGEX: /^[\d!"#$%&()-_`a-z{|}~]{8,30}$/,
} as const;

export { UserValidationRule };
