// FEATURE: IS PREFERRED LANGUAGE & DIALECT AVAILABLE ?

function binarySearch (arr, val) {
  let lowIndex = 0
  let highIndex = arr.length - 1
  let midIndex = Math.floor((lowIndex + highIndex) / 2)
  let exact = arr[midIndex].indexOf(val) === 0
  let fuzzyCheck = val.indexOf(arr[midIndex]) === 0
  let fuzzyMatch
  // search
  while (!exact && lowIndex < highIndex) {
    // BUG: May iterate through all fuzzy matches instead of keeping best match
    fuzzyMatch = fuzzyCheck ? arr[midIndex] : null
    // re-center
    if (val < arr[midIndex]) {
      highIndex = midIndex - 1
    } else if (val > arr[midIndex]) {
      lowIndex = midIndex + 1
    }
    // reset checks
    midIndex = Math.floor((lowIndex + highIndex) / 2)
    exact = arr[midIndex].indexOf(val) === 0
    fuzzyCheck = val.indexOf(arr[midIndex]) === 0
  }
  // return results
  if (exact) {
    return [2]
  } else if (fuzzyMatch) {
    return [1, fuzzyMatch]
  } else return 0
}
// let dev know if the preferred language is available; return string for api
export default function setLanguage (arr, lang) {
  const results = binarySearch(arr, lang)
  switch (results[0]) {
    case 2:
      console.log(`Preferred language is available. Add '${lang}' to api call.`)
      return lang
    case 1:
      console.log(`Preferred language dialect is unavailable. Add '${results[1]}' to api call.`)
      return results[1]
    default:
      console.log('Preferred language is unavailable. Add \'en\' to api call.')
      return 'en'
  }
}
