export function msToTime(time) {
  const ms = new Date().getTime() - new Date(time).getTime()
  let seconds = ms / 1000
  let minutes = ms / (1000 * 60)
  let hours = ms / (1000 * 60 * 60)
  let days = ms / (1000 * 60 * 60 * 24)
  if (seconds < 60) {
    return 'few seconds'
  } else if (minutes < 60) {
    return Math.round(minutes) + 'm'
  } else if (hours < 24) {
    return Math.round(hours) + 'h'
  } else {
    return Math.round(days) + 'd'
  }
}

export const filePlaceholder = (file) => {
  const images = ['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG']
  const word = ['doc', 'docx']
  const excel = 'xlsx'
  const powerpoint = 'pptx'
  const pdf = 'pdf'
  const extension = file.split('.')[1]
  if (images.includes(extension)) return `img.png`
  else if (word.includes(extension)) return 'word.png'
  else if (extension === pdf) return 'pdf.png'
  else if (extension === powerpoint) return 'powerpoint.png'
  else if (extension === excel) return 'excel.png'
}
