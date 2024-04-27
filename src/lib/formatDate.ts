/**
 * Formats a date string into a specific format.
 * @param dateString - The date string to be formatted.
 * @returns The formatted date string in the format "DD.MM.YYYY".
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-indexed
  const year = date.getFullYear();

  // Padding day and month with 0 if they are less than 10
  const formattedDay = day < 10 ? `0${day}` : day.toString();
  const formattedMonth = month < 10 ? `0${month}` : month.toString();

  return `${formattedDay}.${formattedMonth}.${year}`;
};

export default formatDate;
