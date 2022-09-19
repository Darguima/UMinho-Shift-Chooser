export {}

declare global {
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
