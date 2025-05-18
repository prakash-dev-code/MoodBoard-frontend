export const formatFriendlyDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  // Format as "May 16"
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};
