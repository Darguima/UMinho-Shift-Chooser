export {}

declare global {
  interface Class {
    subject: string
    location: string
    shift: string

    subjectShortName: string

    startTime: Time
    endTime: Time
    duration: Time

    weekday: WeekDay

    shiftType: string
    shiftNumber: number

    status: 'normal' | 'selected' | 'hidden'
  }

  interface ScheduleClassesObject {
    [startTime: number]: ScheduleRowClassesObject
  }

  type ScheduleRowClassesObject = [
    Class[], // Monday Classes
    Class[], // Tuesday Classes
    Class[], // Wednesday Classes
    Class[], // Thursday Classes
    Class[], // Friday Classes
  ]

  interface Time {
    hour: number
    minutes: number
  }
}
