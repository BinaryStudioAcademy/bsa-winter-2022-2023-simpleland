const checkSubscription = (start: Date, end: Date): boolean => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const diffInTime = endDate.getTime() - startDate.getTime();

  return Boolean(diffInTime > 0);
};

export { checkSubscription };
