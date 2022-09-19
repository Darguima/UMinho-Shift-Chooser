const COLORS = {
  sameSubject: '#00000044',
  hoverShift: '#ff0000aa',
  selectedShift: '#808000ff',
  coloredArray: ['#3cb44b', '#ffe119', '#4363d8', '#f58231', '#f032e6', '#008080', '#9a6324', '#aaffc3', '#000075', '#bcf60c']
}

enum WeekDay {
  Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
}

const createParagraph = (text: string, parent: HTMLElement): HTMLParagraphElement => {
  const paragraph = document.createElement('p')

  paragraph.style.textAlign = 'center'
  paragraph.innerText = text
  parent.appendChild(paragraph)

  return paragraph
}

const incrementTime = (initialTime: Time, elapsedTimeInMinutes: number): Time => {
  // const finalTimeInMinutes = (initial Time In Minutes) + elapsedTimeInMinutes
  const finalTimeInMinutes = (initialTime.hour * 60 + initialTime.minute) + elapsedTimeInMinutes

  return {
    hour: Math.floor(finalTimeInMinutes / 60),
    minute: finalTimeInMinutes % 60
  }
}

const zeroPad = (num: number, places: number): string => String(num).padStart(places, '0')

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

        const extractedClasses: HTMLDivElement[] = Array.from(column.querySelectorAll<HTMLDivElement>(".rsApt"))

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
          console.log(WeekDay[weekday])

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
        }).flat(1)
      }).flat(1)
    }).flat(1)

  console.log(classes)

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
