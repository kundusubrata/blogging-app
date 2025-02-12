export function FormatDate(date: string) {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "Invalid date";

  return parsedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
