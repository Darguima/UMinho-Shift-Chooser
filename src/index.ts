import createParagraph from './utils/createParagraph'
import incrementTime from './utils/incrementTime'
import zeroPad from './utils/zeroPad'

import COLORS from './constants/COLORS'

import { WeekDay, exportHDVT, setupHDVTExportButton } from './hdvtFeature'

const main = (): void => {
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
    minute: +firstHourOnSchedule[1]
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

          const _class = document.createElement('div')

          classContainer.style.overflow = 'hidden'
          classContainer.style.border = 'none'
          classContainer.style.borderRight = '1px solid #444'

          _class.style.height = '100%'
          _class.style.width = '100%'

          _class.style.display = 'flex'
          _class.style.flexDirection = 'column'
          _class.style.alignItems = 'center'
          _class.style.justifyContent = 'center'

          const durationInMinutes = ((classContainer.offsetHeight + 4) / cellHeight) * 30

          const endTime = incrementTime(startTime, durationInMinutes)

          const subjectParagraph = createParagraph(subject, _class)
          const locationParagraph = createParagraph(location, _class)
          const shiftParagraph = createParagraph(shift, _class)
          const timeParagraph = createParagraph(`${zeroPad(startTime.hour, 2)}:${zeroPad(startTime.minute, 2)} - ${zeroPad(endTime.hour, 2)}:${zeroPad(endTime.minute, 2)}`, _class)
          const weekdayParagraph = createParagraph(`${WeekDay[weekday]}`, _class)

          classContainer.replaceChildren(_class)

          return {
            subject,
            subjectParagraph,

            location,
            locationParagraph,

            shift,
            shiftParagraph,

            startTime,
            endTime,
            timeParagraph,

            weekday,
            weekdayParagraph,

            shiftType: shift.replace(/[^a-z]/gi, ''),
            shiftNumber: Number(shift.replace(/^\D+/g, '') || '1'),

            domElement: _class,
            parentElement: classContainer,

            status: 'normal' as const
          }
        })
      })
    }).flat(2)

  console.log(classes)

  const exportHDVTButton = setupHDVTExportButton()
  if (exportHDVTButton === undefined) {
    alert('UMinho Shift Chooser - Error creating export HDVT file button. Extension running with limited functionality!')
  } else {
    exportHDVTButton.onclick = (): void => {
      const text = exportHDVT(classes)
      const tempLink = document.createElement('a')
      tempLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
      tempLink.setAttribute('download', 'data.hdvt')
      tempLink.click()
    }
  }

  classes.forEach(selectedClass => {
    selectedClass.domElement.addEventListener('mouseenter', () => {
      classes.forEach(_class => {
        if (_class.subject === selectedClass.subject) {
          if (_class.shiftType === selectedClass.shiftType) {
            if (_class.shiftNumber === selectedClass.shiftNumber) {
              _class.domElement.style.backgroundColor = COLORS.hoverShift
            } else {
              _class.domElement.style.backgroundColor = COLORS.coloredArray[_class.shiftNumber - 1]
            }
          } else if (selectedClass.status === 'normal' && _class.status === 'normal') {
            _class.domElement.style.backgroundColor = COLORS.sameSubject
          }
        }
      })
    })

    selectedClass.domElement.addEventListener('mouseleave', () => {
      classes.forEach((_class) => {
        _class.domElement.style.backgroundColor = _class.status !== 'selected' ? '' : COLORS.selectedShift
      })
    })
  })

  classes.forEach(selectedClass => {
    selectedClass.domElement.addEventListener('mouseup', () => {
      classes.forEach(_class => {
        if (_class.subject === selectedClass.subject) {
          if (_class.shiftType === selectedClass.shiftType) {
            if (_class.shiftNumber === selectedClass.shiftNumber) {
              _class.domElement.style.backgroundColor = COLORS.selectedShift
              _class.parentElement.style.opacity = '1'

              _class.status = 'selected'
            } else {
              _class.parentElement.style.opacity = '0.4'

              _class.status = 'hidden'
            }
          } else {
            _class.domElement.style.backgroundColor = ''
          }
        }
      })
    })
  })
}

main()
