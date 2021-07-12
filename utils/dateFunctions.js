const dateDifference = (dateBegin, dateEnd) => {
  const date1 = new Date(dateBegin);
  const date2 = new Date(dateEnd);

  const difference = date2.getTime() - date1.getTime();

  return difference / (1000 * 3600 * 24);
};

const formatDate = (date) => {
  let dd = date.getDate();

  let mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${yyyy}-${mm}-${dd}`;
};

const getDaysArray = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const arr = [];
  const dt = new Date(start);

  for (arr, dt; dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
};

export { dateDifference, formatDate, getDaysArray };
