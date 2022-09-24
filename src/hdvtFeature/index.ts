enum WeekDay {
  Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
}

const subTime = (lhs: Time, rhs: Time): Time => {
  const lhsInMinutes = (lhs.hour * 60 + lhs.minute)
  const rhsInMinutes = (rhs.hour * 60 + rhs.minute)
  return {
    hour: Math.floor((lhsInMinutes - rhsInMinutes) / 60),
    minute: (lhsInMinutes - rhsInMinutes) % 60
  }
}

const shorten = (subject: string): string => {
  return subject.split(' ').filter(name => name.length > 2 && name.charAt(0) === name.charAt(0).toUpperCase()).map(name =>
    name.charAt(0).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  ).join('')
}

const toJavaWeekDay = (weekday: WeekDay): number => {
  return weekday + 2 % 7
}

const exportHDVT = (classes: Class[]): string => {
  const schedule: { [weekday: number]: [HDVTScheduleBlock] } = {}
  const subjects: { [id: string]: HDVTSubject } = {}

  classes.forEach(class_ => {
    if (class_.status === 'selected') {
      const shortName = shorten(class_.subject)
      if (!(shortName in subjects)) {
        subjects[shortName] = { shortName, longName: class_.subject, color: -16777216 }
      }
      const javaWeekDay = toJavaWeekDay(class_.weekday)
      const startTime = class_.startTime
      const duration = subTime(class_.endTime, class_.startTime)
      const more = class_.location.substring(15, 23)
      if (!schedule[javaWeekDay]) schedule[javaWeekDay] = [{ id: shortName, startTime, duration, more }]
      else schedule[javaWeekDay].push({ id: shortName, startTime, duration, more })
    }
  })

  return JSON.stringify(schedule) + '|' + JSON.stringify(subjects)
}

const setupHDVTExportButton = (): HTMLButtonElement | undefined => {
  const printButtonContainer = document.querySelector<HTMLDivElement>('#ctl00_ctl40_g_e84a3962_8ce0_47bf_a5c3_d5f9dd3927ef_ctl00_divPrint')

  if (printButtonContainer === undefined) {
    return undefined
  }

  const buttons = printButtonContainer?.querySelectorAll<HTMLButtonElement>('.btn')

  if (buttons === undefined || buttons?.length === 0) {
    return undefined
  } else if (buttons?.length === 1) {
    // create button
    const exportHDVTButton = document.createElement('button')
    exportHDVTButton.classList.add('btn')
    exportHDVTButton.classList.add('btn-default')
    exportHDVTButton.classList.add('btn-sm')
    exportHDVTButton.type = 'button'
    exportHDVTButton.innerText = 'Exportar Ficheiro HDVT'

    printButtonContainer?.appendChild(exportHDVTButton)
    return exportHDVTButton
  }

  return buttons[2] // button already exists
}

export {
  WeekDay,
  exportHDVT,
  setupHDVTExportButton
}
