import extractScheduleData from './extractScheduleData'

const main = (): void => {
  const classes = extractScheduleData()

  if (classes === undefined) return

  console.log(classes)
}

main()
