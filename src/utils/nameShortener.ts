const nameShortener = (name: string): string => {
  return name
    // Algebra Linear para Engenharia
    .split(' ')
    // ["Álgebra", "Linear", "para", "Engenharia"]
    .filter(name => name.length > 2 && name.charAt(0) === name.charAt(0).toUpperCase())
    // ["Álgebra", "Linear", "Engenharia"] -> it removes words like "de" and "para"
    .map(name => name.charAt(0).normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    // https://stackoverflow.com/a/37511463 -> Remove accents/diacritics
    // ["A", "L", "E"]
    .join('')
}

export default nameShortener
