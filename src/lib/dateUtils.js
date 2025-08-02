// Utility functions for IST (Indian Standard Time) formatting

export const getISTDate = () => {
  return new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}))
}

export const formatISTDate = (date) => {
  const istDate = new Date(date)
  return istDate.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit", 
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  })
}

export const formatISTDateShort = (date) => {
  const istDate = new Date(date)
  return istDate.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  })
}

export const formatISTDateForLog = (date) => {
  const istDate = new Date(date)
  return istDate.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  })
}
