export function formatDate(timestamp: string) {
  // Remove the trailing 'Z' if present
  timestamp = timestamp?.replace("Z", "");

  const datePart = timestamp.split("T")[0];

  // Split the date into year, month, and day
  const year = datePart.substring(0, 4);
  const month = datePart.substring(4, 6);
  const day = datePart.substring(6, 8);

  // Return the formatted date in "YYYY-MM-DD" format
  return `${year}-${month}-${day}`;
}
