const camelToSpaceSeparated = (camelCaseString: string): string =>
  camelCaseString.replace(/([A-Z])/g, (match) => ` ${match}`).trim();

export { camelToSpaceSeparated };
