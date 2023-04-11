const getNumberOfDays = (start: Date, end: Date): number => {
  const date1 = new Date(start);
  const date2 = new Date(end);

  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();

  return Math.round(diffInTime / oneDay);
};

export { getNumberOfDays };
