const COLORS = {
  sameSubject: "#00000044",
  selectedShift: "#ff0000aa",
  coloredArray: ['#3cb44b', '#ffe119', '#4363d8', '#f58231', '#f032e6', '#008080', '#9a6324', '#aaffc3', '#808000',  '#000075', '#bcf60c'] 
}

const createParagraph = (text: string, parent: HTMLElement) => {
  const paragraph = document.createElement("p");

  paragraph.style.textAlign = "center"
  paragraph.innerText = text
  parent.appendChild(paragraph)

  return paragraph
}

const main = () => {
  const extractedClassesContainer = Array.from(document.querySelectorAll<HTMLDivElement>(".rsApt"))

  const classes: Array<Class> = extractedClassesContainer.map((classContainer) => {
    let classInfo = Array.from(classContainer.querySelectorAll<HTMLDivElement>(".rsAptContent"))[0]

    const [subject, location, shift] = classInfo.innerText.split("\n")
    
    const _class = document.createElement("div");

    classContainer.style.overflow = "hidden"
    classContainer.style.border = "none"
    classContainer.style.borderRight = "1px solid #444"

    _class.style.height = "100%"
    _class.style.width = "100%"

    _class.style.display = "flex"
    _class.style.flexDirection = "column"
    _class.style.alignItems = "center"
    _class.style.justifyContent = "center"

    const subjectParagraph = createParagraph(subject, _class);
    const locationParagraph = createParagraph(location, _class);
    const shiftParagraph = createParagraph(shift, _class);

    classContainer.replaceChildren(_class)

    return {
      subject,
      subjectParagraph,

      location,
      locationParagraph,

      shift,
      shiftParagraph,

      shiftType: shift.replace(/[^a-z]/gi, ''),
      shiftNumber: Number(shift.replace(/[^1-9]/gi, '') || "1"),

      domElement: _class
    }
  })

  console.log(classes)

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
      })
    })
  })

}

main()
