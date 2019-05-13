export const isNotNullOrUndefined = (obj) => {
  if (obj === null) {
    return true
  }
  if (obj === undefined) {
    return true
  }
  if (obj !== undefined && obj !== null) {
    return false
  }
}