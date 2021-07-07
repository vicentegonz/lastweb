const dateDifference = (dateBegin, dateEnd) => {
  const date1 = new Date(dateBegin);
  const date2 = new Date(dateEnd);

  const difference = date2.getTime() - date1.getTime();

  return difference / (1000 * 3600 * 24);
};

export default dateDifference;
