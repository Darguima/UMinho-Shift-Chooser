const scheduleDrawer = (classes: Class[]): void => {
  const container = document.querySelector('#section-to-print')

  if (container === null) {
    alert('UMinho Shift Chooser - Error getting the #section-to-print on DOM. Extension disabled!')
    return
  }

  container.classList.add('newSectionToPrint')

  const oldSchedule = container.querySelector('#ctl00_ctl40_g_e84a3962_8ce0_47bf_a5c3_d5f9dd3927ef_ctl00_schHorario')

  if (oldSchedule === null) {
    alert('UMinho Shift Chooser - Error getting the schedule on DOM. Some visual errors can happen!')
  } else oldSchedule.remove()

  const scheduleContainer = document.createElement('div')
  scheduleContainer.classList.add('scheduleContainer')
  scheduleContainer.innerText = 'Here will be a schedule!'
  container.appendChild(scheduleContainer)
}

export default scheduleDrawer
