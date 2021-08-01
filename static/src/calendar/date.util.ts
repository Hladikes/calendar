type Calendar = Array<Array<Date | null>>

const days = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday', 'Sunday'
]

const months = [
  'January', 'February', 'March', 'April', 
  'May', 'June', 'July', 'August', 
  'September', 'October', 'November', 'December'
]

function getFirstDayOfMonth(year: number, month: number): Date {
  return new Date(year, month, 1)
}

function getLastDayOfMonth(year: number, month: number): Date {
  return new Date(year, month + 1, 0)
}

export function getCurrentYear(): number {
  return new Date().getFullYear()
}

export function getCurrentMonth(): number {
  return new Date().getMonth()
}

export function getCurrentDate(): number {
  return new Date().getDate()
}

export function getDayNames(): string[] {
  return days
}

export function getDayName(index: number): string {
  return days[index] || '---'
}

export function getShortDayName(index: number): string {
  return getDayName(index).substr(0, 3)
}

export function getMonthName(index: number): string {
  return months[index] || '---'
}

export function correctDayIndex(index: number): number {
  return ((index - 1) === - 1) ? 6 : (index - 1)
}

export function generateCalendar(year: number, month: number): Calendar {
  const firstDay = getFirstDayOfMonth(year, month)
  const lastDay = getLastDayOfMonth(year, month)
  const calendar = []
  
  let weekIndex = 0
  let dayIndex = firstDay.getDate()
  let dayInWeekIndex = firstDay.getDay() - 1
  if (dayInWeekIndex === -1) dayInWeekIndex = 6

  while (dayIndex <= lastDay.getDate()) {
    if (!Array.isArray(calendar[weekIndex])) {
      calendar[weekIndex] = new Array(7).fill(null)
    }
  
    calendar[weekIndex][dayInWeekIndex] = new Date(year, month, dayIndex)
    dayIndex++
    dayInWeekIndex++
  
    if (dayInWeekIndex === 7) {
      dayInWeekIndex = 0
      weekIndex++
    }
  }
  
  return calendar
}
