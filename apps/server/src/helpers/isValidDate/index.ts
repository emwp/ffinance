const isValidDate = (date: string) => {
  const searchDate = new Date(date);
  return searchDate instanceof Date && !isNaN(searchDate.valueOf());
};

export default isValidDate;
