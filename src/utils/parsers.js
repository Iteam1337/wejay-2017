/**
 * Takes a value in seconds and returns a parsed duration
 * @param {int} sum - Seconds to parse
 * @return {string} - The parsed string
 *
 * i.e. timeParser(929) -> 06:22
 */

export function timeParser (sum) {
  sum = sum / 1000
  let hours = Math.floor(sum / 60 / 60)
  let minutes = Math.floor(sum / 60 - 60 * hours)
  let seconds = Math.round(((sum / 60) % 1) * 60)

  if (minutes < 10 && hours > 0) {
    minutes = `0${minutes}`
  }

  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  hours = `${hours > 0 ? `${hours}:` : ''}`

  return `${hours}${minutes}:${seconds}`
}
