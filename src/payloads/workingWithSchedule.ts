import { convertTimeToString } from '../utils/convertTime'
import createParagraph from '../utils/createParagraphs'

import Colors from '../constants/Colors'

const workingWithSchedule = (classes: Class[]): void => {
  classes.forEach(_class => {
    const { classDiv, classContainer } = _class

    classContainer.replaceChildren(classDiv)

    classContainer.style.overflow = 'hidden'
    classContainer.style.border = 'none'
    classContainer.style.borderRight = '1px solid #444'

    classDiv.style.height = '100%'
    classDiv.style.width = '100%'

    classDiv.style.display = 'flex'
    classDiv.style.flexDirection = 'column'
    classDiv.style.alignItems = 'center'
    classDiv.style.justifyContent = 'center'

    createParagraph(_class.subject, classDiv)
    createParagraph(_class.location, classDiv)
    createParagraph(_class.shift, classDiv)
    createParagraph(convertTimeToString(_class.startTime) + ' - ' + convertTimeToString(_class.endTime), classDiv)
    createParagraph(_class.weekday, classDiv)

    classDiv.className = `${_class.subjectShortName} ${_class.shiftType} ${_class.shift}`

    const style = document.createElement('style')
    document.head.appendChild(style)

    // if (selectedClass.status === 'normal' && _class.status === 'normal') {
    //   _class.domElement.style.backgroundColor = COLORS.sameSubject
    // }

    classDiv.addEventListener('mouseenter', () => {
      style.textContent = `
        .${_class.subjectShortName} {
          background-color: ${Colors.sameSubject};
        }

        ${Colors.coloredArray.map((color, index) => {
          return `
              .${_class.subjectShortName}.${_class.shiftType}.${_class.shiftType}${index} {
                background-color: ${color};
              }
            `
        }).join('\n')}

        .${_class.subjectShortName}.${_class.shiftType}.${_class.shift} {
          background-color: ${Colors.hoverShift};
        }
      `
    })

    classDiv.addEventListener('mouseleave', () => {
      style.textContent = ''
    })
  })
}

export default workingWithSchedule
