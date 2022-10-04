import extractScheduleData from './payloads/extractScheduleData'
import workingWithSchedule from './payloads/workingWithSchedule'

const main = (): void => {
  const classes = extractScheduleData()

  if (classes === undefined) return

  workingWithSchedule(classes)
}

main()
