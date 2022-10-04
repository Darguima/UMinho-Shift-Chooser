const createParagraph = (text: string, parent: HTMLElement): HTMLParagraphElement => {
  const paragraph = document.createElement('p')

  paragraph.style.textAlign = 'center'
  paragraph.innerText = text
  parent.appendChild(paragraph)

  return paragraph
}

export default createParagraph
