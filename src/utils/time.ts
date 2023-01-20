// Calculate dates

export const CreateDate = (date: string): Date => {
  let time = new Date(date);
  time.setHours(3) // 5AM
  time.getTimezoneOffset()
  return time
}

export const MorningsLeft = (date: Date): Number => {
  let now = new Date();
  return Math.ceil((date.getTime() - now.getTime()) / 86400000) // ms in 24 h
}

export const DaysLeftToString = (date: Date): String => {
  let now = new Date();
  const diff = date.getTime() - now.getTime();
  const DayDiff = Math.floor(diff / (1000 * 60 * 60 * 24));
  const MonthDiff = Math.floor(DayDiff / 30);
  const YearDiff = date.getFullYear() - now.getFullYear()
  let daysLeft = Math.ceil((DayDiff % 30));
  return `${daysLeft} days left. That is ${YearDiff==0 ? "" : YearDiff + " years"} ${MonthDiff==0 ? "" : MonthDiff + " months"} ${DayDiff==0 ? daysLeft : DayDiff % 30 + " days"}`
}

