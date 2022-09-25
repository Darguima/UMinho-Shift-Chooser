import extractScheduleData from './payloads/extractScheduleData'
import scheduleDrawer from './payloads/scheduleDrawer'

import organizeClassesToSchedule from './utils/organizeClassesToSchedule'

import './styles/schedule.css'

const main = (): void => {
  const classes = extractScheduleData()

  if (classes === undefined) return

  const scheduleData = organizeClassesToSchedule(classes)

  scheduleDrawer(scheduleData)
}

main()
