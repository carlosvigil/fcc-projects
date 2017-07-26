// FEATURE: IS PREFERRED LANGUAGE & DIALECT AVAILABLE ?
// FIXME: Still ignores fuzzy matches, check if the indexes are correct

function binarySearch (arr, val) {
  let exactMatch = exact(arr, val)
  let fuzzyMatch = fuzzy(arr, val)

  // return search results
  if (exactMatch) return [2]
  else if (fuzzyMatch[0] === 1) return fuzzyMatch
  else return [0]
}

// does nothing if lang is in supported api langs array and the app continues
function exact (arr, val) {
  let lowIndex = 0
  let highIndex = arr.length - 1
  let midIndex = Math.floor((lowIndex + highIndex) / 2)
  let match = arr[midIndex].indexOf(val) === 0

  while (!match && lowIndex < highIndex) {
    // change the center to reflect the decided halve of the arr
    if (val < arr[midIndex]) {
      highIndex = midIndex - 1
    } else if (val > arr[midIndex]) {
      lowIndex = midIndex + 1
    }
    // these variables don't update unless reassigned
    midIndex = Math.floor((lowIndex + highIndex) / 2)
    match = arr[midIndex].indexOf(val) === 0
  }
  return match
}

// fuzzy search function that accepts the first match
function fuzzy (arr, val) {
  let lowIndex = 0
  let highIndex = arr.length - 1
  let midIndex = Math.floor((lowIndex + highIndex) / 2)
  let match = val.indexOf(arr[midIndex]) === 0

  while (!match && lowIndex < highIndex) {
    // change the center to reflect the decided halve of the arr
    if (val < arr[midIndex]) {
      highIndex = midIndex - 1
    } else if (val > arr[midIndex]) {
      lowIndex = midIndex + 1
    }
    // these variables don't update unless reassigned
    midIndex = Math.floor((lowIndex + highIndex) / 2)
    match = val.indexOf(arr[midIndex]) === 0
  }
  return [match, midIndex]
}

// to provide a better UX, send best matched language string to the calling f()
export default function setLanguage (arr, lang) {
  const results = binarySearch(arr, lang)
  switch (results[0]) {
    case 2:
      console.log(`Preferred language is available. Add '${lang}' to api call.`)
      return lang
    case 1:
      console.log(`Preferred language dialect (${lang}) is unavailable. Add '${results[1]}' to api call.`)
      return results[1]
    default:
      console.log(`Preferred language (${lang}) is unavailable. Add 'en' to api call.`)
      return 'en'
  }
}
