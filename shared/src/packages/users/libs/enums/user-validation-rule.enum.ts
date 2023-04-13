const UserValidationRule = {
  EMAIL_REGEX:
    /^(\w)([\w+.-]{0,33}\w)?@[\dA-Za-z][\dA-Za-z-]{0,57}[\dA-Za-z]\.[A-Za-z]{2,}$/,
  PASSWORD_REGEX:
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~-])(?=.*[a-z]).{8,30}$/,
  FIRST_NAME_REGEX: /^[A-Z]['A-Za-z-]{1,29}$/,
  LAST_NAME_REGEX: /^[A-Z]['A-Za-z-]{1,29}$/,
  ACCOUNT_NAME_REGEX: /^[\w!#$%&()*+,./:;<=>?@[\]^-{|}~“]{1,30}$/,
} as const;

export { UserValidationRule };
