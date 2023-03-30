type Function_<T extends unknown[], R> = (...arguments_: T) => R;

function initDebounce<T extends unknown[], R>(
  function_: Function_<T, R>,
  delay: number,
): Function_<T, void> {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...arguments_: T) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      function_(...arguments_);
      timer = undefined;
    }, delay);
  };
}

export { initDebounce };
