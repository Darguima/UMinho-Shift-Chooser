import extractScheduleData from './payloads/extractScheduleData'
import scheduleDrawer from './payloads/scheduleDrawer'

import './styles/schedule.css'

const main = (): void => {
  const classes = extractScheduleData()

  if (classes === undefined) return

  scheduleDrawer(classes)
}

main()
