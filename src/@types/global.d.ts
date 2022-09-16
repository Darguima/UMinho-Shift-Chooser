export {};

declare global {
	interface Class {
		subject: string,
		subjectParagraph: HTMLParagraphElement,
	
		location: string,
		locationParagraph: HTMLParagraphElement,
	
		shift: string,
		shiftParagraph: HTMLParagraphElement,
	
		shiftType: string,
		shiftNumber: number,
	
		domElement: HTMLDivElement
		parentElement: HTMLDivElement,

		status: "normal" | "selected" | "hidden"
	}
}
