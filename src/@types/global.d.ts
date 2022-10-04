export {}

declare global {
  interface Class {
    classContainer: HTMLDivElement
    classDiv: HTMLDivElement

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

  interface Time {
    hour: number
    minutes: number
  }
}
