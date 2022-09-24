export default (initialTime: Time, elapsedTimeInMinutes: number): Time => {
  // const finalTimeInMinutes = (initial Time In Minutes) + elapsedTimeInMinutes
  const finalTimeInMinutes = (initialTime.hour * 60 + initialTime.minute) + elapsedTimeInMinutes

  return {
    hour: Math.floor(finalTimeInMinutes / 60),
    minute: finalTimeInMinutes % 60
  }
}
