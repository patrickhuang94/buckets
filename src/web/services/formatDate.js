export const formatMonth = (month) => {
  let monthName = null
  switch (month) {
    case 0:
      monthName = 'January'
      break
    case 1:
      monthName = 'February'
      break
    case 2:
      monthName = 'March'
      break
    case 3:
      monthName = 'April'
      break
    case 4:
      monthName = 'May'
      break
    case 5:
      monthName = 'June'
      break
    case 6:
      monthName = 'July'
      break
    case 7:
      monthName = 'August'
      break
    case 8:
      monthName = 'September'
      break
    case 9:
      monthName = 'October'
      break
    case 10:
      monthName = 'November'
      break
    case 11:
      monthName = 'December'
      break
  }

  return monthName
}

export const formatDayOfWeek = (date) => {
  let dayOfWeekName = null
  switch (date) {
    case 0:
      dayOfWeekName = 'Sunday'
      break
    case 1:
      dayOfWeekName = 'Monday'
      break
    case 2:
      dayOfWeekName = 'Tuesday'
      break
    case 3:
      dayOfWeekName = 'Wednesday'
      break
    case 4:
      dayOfWeekName = 'Thursday'
      break
    case 5:
      dayOfWeekName = 'Friday'
      break
    case 6:
      dayOfWeekName = 'Saturday'
      break
  }

  return dayOfWeekName
}
