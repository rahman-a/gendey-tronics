export const tm = (se, lang) => {
  let h = se / 60 / 60
  if (h < 1) {
    let t =
      lang === 'ar'
        ? Math.ceil((se / 60).toFixed(2)) + ' دقيقة'
        : Math.ceil((se / 60).toFixed(2)) + ' minutes'
    return t
  }
  if (h === 1) return lang === 'ar' ? 'ساعة واحدة' : 'one hour'
  return lang === 'ar'
    ? Math.ceil(h.toFixed(2)) + ' ساعة'
    : Math.ceil(h.toFixed(2)) + ' hours'
}

export function extractInitials(name) {
  // split the name into an array of words
  const words = name.split(' ')
  // initialize an empty string for the initials
  let initials = ''
  // iterate over the words in the name
  for (const word of words) {
    // add the first character of the word to the initials string
    initials += word[0]
  }
  // return the initials
  return initials
}

export const capitalizeSentences = (sentence) => {
  return sentence
    .split(' ')
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1)
    })
    .join(' ')
}
