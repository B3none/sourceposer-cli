export function isAlphaNumeric(string: string): boolean {
  return Boolean(/^[\da-z]+$/i.test(string))
}
