import WeekDay from '../constants/WeekDay'

import incrementTime from '../utils/incrementTime'
import { convertMinutesToTime } from '../utils/convertTime'
import nameShortener from '../utils/nameShortener'

export default (): Class[] | undefined => {
  const cellHeight = document.querySelector<HTMLTableRowElement>('.rsContentTable tr')?.offsetHeight

  if (cellHeight === undefined) {
    // alert('UMinho Shift Chooser - Error getting the Cell Height. Extension disabled!')
    // This alert can't be shown because before choose the course is no cells to select

    return
  }

  const firstHourOnSchedule = document.querySelector<HTMLDivElement>('.rsVerticalHeaderTable tbody tr th div')?.innerText.split(':')

  if (firstHourOnSchedule === undefined) {
    alert('UMinho Shift Chooser - Error getting the first hour on schedule. Extension disabled!')
    return
  }

  const firstTime: Time = {
    hour: +firstHourOnSchedule[0],
    minutes: +firstHourOnSchedule[1]
  }

  const extractedRows = Array.from(document.querySelectorAll<HTMLTableRowElement>('.rsContentTable tr'))

  const classes: Class[] = extractedRows
    .map((row, rowIndex) => {
      // elapsed time in minutes = index * 30 -> each row is a 30 min block
      const startTime = incrementTime(firstTime, rowIndex * 30)

      const extractedColumns: HTMLTableRowElement[] = Array.from(row.querySelectorAll<HTMLTableRowElement>('td'))

      return extractedColumns.map((column, columnIndex) => {
        const weekday: WeekDay = columnIndex

        const extractedClasses: HTMLDivElement[] = Array.from(column.querySelectorAll<HTMLDivElement>('.rsApt'))

        return extractedClasses.map(classContainer => {
          const classInfo = Array.from(classContainer.querySelectorAll<HTMLDivElement>('.rsAptContent'))[0]

          const [subject, location, shift] = classInfo.innerText.split('\n')

          const durationInMinutes = ((classContainer.offsetHeight + 4) / cellHeight) * 30
          const duration = convertMinutesToTime(durationInMinutes)

          const endTime = incrementTime(startTime, durationInMinutes)

          return {
            subject,
            location,
            shift,

            subjectShortName: nameShortener(subject),

            startTime,
            endTime,
            duration,

            weekday,

            shiftType: shift.replace(/[^a-z]/gi, ''),
            shiftNumber: Number(shift.replace(/^\D+/g, '') || '1'),

            status: 'normal' as const
          }
        })
      })
    }).flat(2)

  return classes
}
