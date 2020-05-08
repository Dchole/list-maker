export const timeFormat = time => {
  const time_posted = Date.parse(time)
  const now = Date.now()

  const timeRange = now - time_posted

  const seconds = timeRange / 1000
  const minutes = seconds / 60
  const hours = minutes / 60
  const days = hours / 24
  const weeks = days / 7
  const months = weeks / 4
  const years = months / 12

  if (years >= 1) {
    if (years === 1) return "About a year ago"
    return `About ${Math.ceil(years)} years ago`
  } else if (months >= 1) {
    if (months === 1) return "About a month ago"
    return `About ${Math.ceil(months)} months ago`
  } else if (weeks >= 1) {
    if (weeks === 1) return "About a week ago"
    return `About ${Math.ceil(weeks)} weeks ago`
  } else if (days >= 1) {
    if (days === 1) return "A day ago"
    return `${Math.ceil(days)} days ago`
  } else if (hours >= 1) {
    if (hours === 1) return "An hour ago"
    return `${Math.ceil(hours)} hours ago`
  } else if (minutes >= 1) {
    if (minutes === 1) return "A minute ago"
    return `${Math.ceil(minutes)} minutes ago`
  } else if (seconds >= 1) {
    if (seconds === 1) return "A second ago"
    return `${Math.ceil(seconds)} seconds ago`
  } else if (timeRange < 1000) return "Just now"
}
