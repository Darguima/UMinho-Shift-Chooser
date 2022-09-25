const zeroPad = (num: number): string => String(num).padStart(2, '0')

const convertTimeToMinutes = (time: Time): number => {
  return time.hour * 60 + time.minutes
}

const convertMinutesToTime = (minutes: number): Time => {
  return {
    hour: Math.floor(minutes / 60),
    minutes: minutes % 60
  }
}

const convertTimeToString = (time: Time): string => {
  return `${zeroPad(time.hour)}:${zeroPad(time.minutes)}`
}

export {
  convertMinutesToTime,
  convertTimeToMinutes,
  convertTimeToString
}
