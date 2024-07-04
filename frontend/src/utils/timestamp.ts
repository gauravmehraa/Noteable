export const generateTimestamp = (dateString: string) => {
  const date: Date = new Date(dateString);
  let hours: number = date.getHours();
  let meridian: string = 'AM';
  
  if (hours >= 12) {
    meridian = 'PM';
    if (hours > 12) hours -= 12;
  } else if (hours === 0) hours = 12;
  
  const paddedHours: string = padZero(hours);
  const minutes: string = padZero(date.getMinutes());
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return `${date.getDate()} ${months[date.getMonth()-1]} ${date.getFullYear()} ${paddedHours}:${minutes}${meridian}`;
}

export const padZero = (number: number) => {
  return number.toString().padStart(2, "0");
}

export function generateDatestamp(timestamp: string): string {
  const targetDate = new Date(timestamp);
  const targetDateOnly = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return weekdays[targetDateOnly.getDay()];
}