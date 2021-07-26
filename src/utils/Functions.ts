export function validURL(url: string): boolean {
  const regex =
    /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
  if (!regex.test(url)) {
    return false
  } else {
    return true
  }
}
