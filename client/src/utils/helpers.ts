import moment from "moment";

export function isToday(date: Date) {
  const now = new Date()

  return date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
};

export function isThisWeek(data: Date) {
  const now = moment();
  const input = moment(data);
  return (now.isoWeek() === input.isoWeek());
}

export function isThisMonth (date: Date) {
  const now = new Date()

  return date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
}

export function isThisYear(date: Date) {
  const now = new Date()

  return date.getFullYear() === now.getFullYear()
}