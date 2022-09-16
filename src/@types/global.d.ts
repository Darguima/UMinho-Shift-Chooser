export {};

declare global {
	interface Time {
		hour: number;
		minute: number;
	}

	interface Class {
		subject: string,
		subjectParagraph: HTMLParagraphElement,
	
		location: string,
		locationParagraph: HTMLParagraphElement,
	
		shift: string,
		shiftParagraph: HTMLParagraphElement,
	
		shiftType: string,
		shiftNumber: number,
	
		domElement: HTMLDivElement,
		parentElement: HTMLDivElement,

		status: "normal" | "selected" | "hidden",
		startTime: Time,
		duration: Time
	}
}
