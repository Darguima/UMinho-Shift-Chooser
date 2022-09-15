const classes = Array.from(document.getElementsByClassName("rsAptContent"))

const organizedClasses = classes.map((_class) => {
  const classInfo = _class.innerText.split("\n")

  return {
    subjectName: classInfo[0],
    shift: classInfo[2],
    domElement: _class
  }
})


organizedClasses.forEach((selectedClass) => {
  selectedClass.domElement.addEventListener("mouseenter", () => {
    organizedClasses.forEach((_class) => {
      if (_class.subjectName == selectedClass.subjectName) {
        
					_class.domElement.style.backgroundColor = "rgba(0, 0, 0, 0.2)"

				if (_class.shift == selectedClass.shift) {
					_class.domElement.style.backgroundColor = "rgba(100, 0, 0, 0.3)"
				}

      }
    })
  })

  selectedClass.domElement.addEventListener("mouseleave", () => {
    organizedClasses.forEach((_class) => {
      _class.domElement.style.backgroundColor = ""
    })
  })
})