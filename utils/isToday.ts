export default function isToday(date: string | number | Date): boolean {
  const date1 = new Date(date);
  const date2 = new Date();
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
