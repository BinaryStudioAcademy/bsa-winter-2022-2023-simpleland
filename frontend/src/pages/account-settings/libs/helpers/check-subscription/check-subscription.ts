const checkHasSubscription = (end: string | null): boolean => {
  if (!end) {
    return false;
  }

  const startDate = new Date();
  const endDate = new Date(end);

  const diffInTime = endDate.getTime() - startDate.getTime();

  return diffInTime > 0;
};

export { checkHasSubscription };
