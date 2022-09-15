const COLORS = {
  sameSubject: "#00000044",
  selectedShift: "#ff0000aa",
  coloredArray: ['#3cb44b', '#ffe119', '#4363d8', '#f58231', '#f032e6', '#008080', '#9a6324', '#aaffc3', '#808000',  '#000075', '#bcf60c'] 
}

const extractedClasses = Array.from(document.querySelectorAll<HTMLDivElement>(".rsAptContent"))

const classes = extractedClasses.map((_class) => {
  const [subject, location, shift] = _class.innerText.split("\n")

  return {
    subject,
    location,
    shift,

    shiftType: shift.replace(/[^a-z]/gi, ''),
    shiftNumber: Number(shift.replace(/[^1-9]/gi, '') || "1"),

    domElement: _class
  }
})

classes.forEach(selectedClass => {
  selectedClass.domElement.addEventListener("mouseenter", () => {
    classes.forEach(_class => {
      if (_class.subject == selectedClass.subject) {

          if (_class.shiftType == selectedClass.shiftType) {

            if (_class.shiftNumber == selectedClass.shiftNumber) {
              _class.domElement.style.backgroundColor = COLORS.selectedShift
            } else {
              _class.domElement.style.backgroundColor = COLORS.coloredArray[_class.shiftNumber - 1]
            }
            
          } else {
					  _class.domElement.style.backgroundColor = COLORS.sameSubject
          }
      }
    })
  })

  selectedClass.domElement.addEventListener("mouseleave", () => {
    classes.forEach((_class) => {
      _class.domElement.style.backgroundColor = ""
      _class.domElement.style.border = ""
    })
  })
})