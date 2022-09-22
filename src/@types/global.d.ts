export {}

declare global {
  interface HDVTScheduleBlock {
    id: string
    startTime: Time
    duration: Time
    more: string
  }

  interface HDVTSubject {
    shortName: string
    longName: string
    color: number
  }

  interface Time {
    hour: number
    minute: number
  }

  interface Class {
    subject: string
    subjectParagraph: HTMLParagraphElement

    location: string
    locationParagraph: HTMLParagraphElement

    shift: string
    shiftParagraph: HTMLParagraphElement

    startTime: Time
    endTime: Time
    timeParagraph: HTMLParagraphElement

    weekday: WeekDay
    weekdayParagraph: HTMLParagraphElement

    shiftType: string
    shiftNumber: number

    domElement: HTMLDivElement
    parentElement: HTMLDivElement

    status: 'normal' | 'selected' | 'hidden'
  }
}
