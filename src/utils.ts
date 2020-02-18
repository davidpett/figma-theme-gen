export const camelCase = (str: string) =>
  str
    .split('/')
    .join(' ')
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      if (+match === 0) return ''
      return index == 0 ? match.toLowerCase() : match.toUpperCase()
    })
