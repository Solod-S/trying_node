const isLeapYear = (year) => {
  const type = typeof year;

  if (year === undefined) {
    throw new Error("Year must be exist");
  }

  if (type !== "number") {
    throw new Error("Year must be number");
  }

  if (year < 42) {
    throw new Error("Year must start from 42 or more");
  }

  if (!Number.isInteger(year)) {
    throw new Error("Year must be integer");
  }

  const date = new Date(year, 2, 0);
  // последний день февраля === нулевой день марта
  const days = date.getDate();
  return days === 29;
};
module.exports = isLeapYear;
//  √ 2008 - true
//  √ 2003 - false
//  √ 2000 - true
//  √ 1900 - false
