export function isAlphaNumeric(string: string, allowedSpecial = ''): boolean {
  if (allowedSpecial.length > 0) {
    [...allowedSpecial].map(character => {
      string = string.replace(character, '')
    })
  }

  return Boolean(/^[\da-z]+$/i.test(string))
}
