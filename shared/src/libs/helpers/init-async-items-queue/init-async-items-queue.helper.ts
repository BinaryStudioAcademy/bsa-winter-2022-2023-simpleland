const initAsyncItemsQueue = async <T>(
  items: T[],
  callback: (item: T) => Promise<void>,
): Promise<void> => {
  for await (const item of items) {
    await callback(item);
  }
};

export { initAsyncItemsQueue };
