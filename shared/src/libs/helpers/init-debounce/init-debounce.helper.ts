type FunctionToDebounce<T extends unknown[], R> = (...arguments_: T) => R;

const initDebounce = <T extends unknown[], R>(
  functionToDebounce: FunctionToDebounce<T, R>,
  delay = 500,
): FunctionToDebounce<T, void> => {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...arguments_: T) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      functionToDebounce(...arguments_);
      timer = undefined;
    }, delay);
  };
};

export { initDebounce };
