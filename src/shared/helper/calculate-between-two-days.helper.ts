export function calculateYearAndDaysDifference(startDate, endDate) {
  // Convert the input strings to Date objects
  const start = new Date(startDate) as any;
  const end = new Date(endDate) as any;

  // Calculate the time difference in milliseconds
  const timeDifference = end - start;

  // Convert the time difference to days
  const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

  // Calculate the years
  const yearsDifference = Math.floor(daysDifference / 365);

  // Calculate the remaining days
  const remainingDays = daysDifference % 365;

  return { years: yearsDifference, days: remainingDays };
}
