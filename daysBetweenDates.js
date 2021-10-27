function calculateDaysBetweenDates(begin, end) {
  var beginDate = new Date(begin);
  var endDate = new Date(end);
  var diff = endDate.getTime() - beginDate.getTime();
  return diff / (1000 * 60 * 60 * 24);
}

const days = calculateDaysBetweenDates('01/01/2019', '01/01/2020');
console.log(days);
