const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getFormattedDate = (dateString: string | Date): string => {
  const dateObj = new Date(dateString);

  return `${dateObj.getDay()} ${
    months[dateObj.getMonth()]
  }, ${dateObj.getFullYear()}`;
};

export default getFormattedDate;
