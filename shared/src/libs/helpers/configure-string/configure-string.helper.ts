const configureString = <
  R extends string,
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  ...parameters: [...string[], T]
): R => {
  const copiedArguments = [...parameters];

  const options = copiedArguments.pop() as T;

  let result = copiedArguments.join('');

  for (const [key, value] of Object.entries(options)) {
    result = result.replace(`:${key}`, value as string);
  }

  return result as R;
};

export { configureString };
