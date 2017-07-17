// FEATURE: IS PREFERRED LANGUAGE & DIALECT AVAILABLE ?

// It might be faster to use a search other than linear, but no benchmarks for this yet
function binarySearch (arr, val) {
  let exactMatch = exact(arr, val)
  let fuzzyMatch = fuzzy(arr, val)

  // return search results
  if (exact) {
    return [2]
  } else if (fuzzyMatch) {
    return [1, fuzzyMatch]
  } else return 0
}

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
}

function fuzzy (arr, val) {
  let lowIndex = 0
  let highIndex = arr.length - 1
  let midIndex = Math.floor((lowIndex + highIndex) / 2)
  let match = val.indexOf(arr[midIndex]) === 0

  while (!match && lowIndex < highIndex) {
    // BUG: May iterate through all fuzzy matches instead of keeping best match
    fuzzyMatch = fuzzyCheck ? arr[midIndex] : null
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
      console.log('Preferred language (${lang}) is unavailable. Add \'en\' to api call.')
      return 'en'
  }
}
