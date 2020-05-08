export const timeDecoration = time => {
  const now = new Date()
  const currentSecond = now.getSeconds()
  const currentMinute = now.getMinutes()
  const currentHour = now.getHours()
  const today = now.getDate()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const timePosted = new Date(time)
  const secondsFromTimePosted = timePosted.getSeconds()
  const minutesFromTimePosted = timePosted.getMinutes()
  const hoursFromTimePosted = timePosted.getHours()
  const datePosted = timePosted.getHours()
  const monthPosted = timePosted.getMonth()
  const yearPosted = timePosted.getFullYear()

  const secondsAgo = Math.abs(currentSecond - secondsFromTimePosted)
  const minutesAgo = Math.abs(currentMinute - minutesFromTimePosted)
  const hoursAgo = Math.abs(currentHour - hoursFromTimePosted)
  const daysAgo = Math.abs(today - datePosted)
  const monthsAgo = Math.abs(currentMonth - monthPosted)
  const yearsAgo = Math.abs(currentYear - yearPosted)

  if (now - timePosted < 1000) return "Just now"
  else if (yearsAgo > 0) return `${yearsAgo} years ago`
  else if (monthsAgo > 0) return `${monthsAgo} months ago`
  else if (daysAgo > 0) return `${daysAgo} days ago`
  else if (hoursAgo > 0) {
    if (minutesAgo > 0) return `${hoursAgo} hrs ${minutesAgo} mins ago `
  } else if (minutesAgo > 0) {
    if (secondsAgo > 0) return `${minutesAgo} mins ${secondsAgo} secs ago `
  } else if (secondsAgo > 0) return `${secondsAgo} seconds ago`
}
