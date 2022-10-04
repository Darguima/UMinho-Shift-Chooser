export default (initialTime: Time, elapsedTimeInMinutes: number): Time => {
  // const finalTimeInMinutes = (initial Time In Minutes) + elapsedTimeInMinutes
  const finalTimeInMinutes = (initialTime.hour * 60 + initialTime.minutes) + elapsedTimeInMinutes

  return {
    hour: Math.floor(finalTimeInMinutes / 60),
    minutes: finalTimeInMinutes % 60
  }
}
