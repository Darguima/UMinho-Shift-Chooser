import { convertTimeToMinutes } from './convertTime'

const organizeClassesToSchedule = (classes: Class[]): ScheduleClassesObject => {
  return classes.reduce<ScheduleClassesObject>((scheduleData, currentClass) => {
    const startTimeInMinutes = convertTimeToMinutes(currentClass.startTime)

    if (scheduleData[startTimeInMinutes] === undefined) {
      scheduleData[startTimeInMinutes] = Array(5).fill([]) as ScheduleRowClassesObject
    }

    scheduleData[startTimeInMinutes][currentClass.weekday] = [
      ...scheduleData[startTimeInMinutes][currentClass.weekday],
      currentClass
    ]

    return scheduleData
  }, {})
}

export default organizeClassesToSchedule
