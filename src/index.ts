const COLORS = {
  sameSubject: "#00000044",
  hoverShift: "#ff0000aa",
  selectedShift: "#808000ff",
  coloredArray: ['#3cb44b', '#ffe119', '#4363d8', '#f58231', '#f032e6', '#008080', '#9a6324', '#aaffc3',  '#000075', '#bcf60c'] 
}

const createParagraph = (text: string, parent: HTMLElement) => {
  const paragraph = document.createElement("p");

  paragraph.style.textAlign = "center"
  paragraph.innerText = text
  parent.appendChild(paragraph)

  return paragraph
}

const incrementTime = (time: Time, increment: Time) => {
  const minute = increment.hour * 60 + increment.minute
  time.hour += Math.floor((time.minute + minute) / 60)
  time.minute = (time.minute + minute) % 60
}

const getElementByXpath = (path: string) => {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')

const main = () => {
  const tableHeight = document.querySelector<HTMLDivElement>(".rsContentScrollArea")?.offsetHeight

  const cellHeight = document.querySelector<HTMLTableRowElement>(".rsContentTable tr")?.offsetHeight
  if (!cellHeight) return;

  let classes = Array<Class>()

  // get first hour row
  const firstHour = getElementByXpath("/html/body/form/div[12]/div/div[4]/div[1]/div[3]/div[1]/div[3]/div/div[2]/div/div/div[1]/div/div/div/div[3]/div[4]/div[2]/div/div[2]/table/tbody/tr[2]/td[1]/div/div/table/tbody/tr[1]/th/div")?.textContent?.split(":")
  if (!firstHour) return;
  let startTime: Time = {hour: +firstHour[0], minute: +firstHour[1]}

  document.querySelectorAll<HTMLTableRowElement>(".rsContentTable tr").forEach((row) => {
    row.querySelectorAll<HTMLDivElement>(".rsApt").forEach((classContainer) => {
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

      const durationInMinutes = ((classContainer.offsetHeight + 4) / cellHeight) * 30
      const duration = {hour: 0, minute: 0}
      incrementTime(duration, {hour: 0, minute: durationInMinutes})

      const endTime = {hour: startTime.hour, minute: startTime.minute}
      incrementTime(endTime, duration)

      const subjectParagraph = createParagraph(subject, _class);
      const locationParagraph = createParagraph(location, _class);
      const shiftParagraph = createParagraph(shift, _class);
      const timeParagraph = createParagraph(`${startTime.hour}:${zeroPad(startTime.minute, 2)} - ${endTime.hour}:${zeroPad(endTime.minute, 2)}`, _class);

      classContainer.replaceChildren(_class);

      classes.push({
        subject,
        subjectParagraph,

        location,
        locationParagraph,

        shift,
        shiftParagraph,

        shiftType: shift.replace(/[^a-z]/gi, ''),
        shiftNumber: Number(shift.replace(/[^1-9]/gi, '') || "1"),

        domElement: _class,
        parentElement: classContainer,

        status: "normal",
        startTime,
        duration
      })
    })
    incrementTime(startTime, {hour: 0, minute: 30})
  })

  console.log(classes)

  classes.forEach(selectedClass => {
    selectedClass.domElement.addEventListener("mouseenter", () => {
      
      classes.forEach(_class => {
        if (_class.subject == selectedClass.subject) {

            if (_class.shiftType == selectedClass.shiftType) {

              if (_class.shiftNumber == selectedClass.shiftNumber) {
                _class.domElement.style.backgroundColor = COLORS.hoverShift
              } else {
                _class.domElement.style.backgroundColor = COLORS.coloredArray[_class.shiftNumber - 1]
              }

            } else if (selectedClass.status === "normal" && _class.status === "normal") {
              _class.domElement.style.backgroundColor = COLORS.sameSubject
            }
        }
      })
    })

    selectedClass.domElement.addEventListener("mouseleave", () => {
      classes.forEach((_class) => {
        _class.domElement.style.backgroundColor = _class.status !== "selected" ? "" : COLORS.selectedShift
      })
    })
  })


  classes.forEach(selectedClass => {
    selectedClass.domElement.addEventListener("mouseup", () => {
      
      classes.forEach(_class => {
        if (_class.subject == selectedClass.subject) {
          if (_class.shiftType == selectedClass.shiftType) {
            if (_class.shiftNumber == selectedClass.shiftNumber) {
              _class.domElement.style.backgroundColor = COLORS.selectedShift
              _class.parentElement.style.opacity = "1"
  
              _class.status = "selected"
            } else {
              _class.parentElement.style.opacity = "0.4"
  
              _class.status = "hidden"
            }
          } else {
            _class.domElement.style.backgroundColor = ""
          }
          
        }
      })
    })
  })
}

main()
