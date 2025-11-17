// Takes a java LocalDateTime and formats it to DD-MM-YY Hour : Minutes
export function formatArrayDate(arr) {
  const [year, month, day, hour, minute] = arr;
  return `${String(day).padStart(2, "0")}-${String(month).padStart(
    2,
    "0"
  )}-${year} ${String(hour).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0"
  )}`;
}
