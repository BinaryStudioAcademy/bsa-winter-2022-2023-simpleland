const getNumberOfDays = (start: Date, end: Date): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = endDate.getTime() - startDate.getTime();

  return Math.round(diffInTime / oneDay);
};

export { getNumberOfDays };
