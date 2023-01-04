// Calculate dates

export const CreateDate = (date: string): Date => {
  let time = new Date(date);
  time.setHours(6) // 6 AM EET
  time.getTimezoneOffset()
  return time
}

export const MorningsLeft = (date: Date): Number => {
  let now = new Date();
  return Math.ceil((date.getTime() - now.getTime()) / 86400000 - 1) // ms in 24 h
}

export const DaysLeftToString = (date: Date): String => {
  let now = new Date();
  const DayDiff = date.getDate() - now.getDate()
  const MonthDiff = date.getMonth() - now.getMonth()
  const YearDiff = date.getFullYear() - now.getFullYear()
  let daysLeft = Math.ceil((date.getTime() - now.getTime()) / 86400000 - 1)
  return `${daysLeft} days left. That is ${YearDiff==0 ? "" : YearDiff + " years"} ${MonthDiff==0 ? "" : MonthDiff + " months"} ${DayDiff==0 ? daysLeft : DayDiff + " days"}`
}

