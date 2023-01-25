import { DIGIT, ALPHA, ALPHANUM, MINUTES, SECONDS, HOURS, DIGIT_SPACE, DIGIT_SPACE_PLUS_MINUS, ALPHA_SPACE, ALPHANUM_SPACE, CHAR, CHAR_SPACE, ESCAPE } from './constants'
import addPlaceholder from './addPlaceholder'

type OptionPattern = {
  pattern: string
  placeholder: string
}

/**
 * function toPattern
 * @param {number | string} value
 * @param {string | OptionPattern} optionPattern
 * @returns {string}
 */
function toPattern(
  value: number | string,
  optionPattern: string | OptionPattern
): string {
  const pattern =
    typeof optionPattern === 'object' ? optionPattern.pattern : optionPattern
  const patternChars = pattern
  const output = pattern.split('')
  const values = value.toString()
  const charsValues = values
  const placeholder =
    typeof optionPattern === 'object' ? optionPattern.placeholder : undefined
  let charCounter = 0
  let index

  const outputLength = output.length
  for (index = 0; index < outputLength; index++) {
    console.log('checking',output[index],'against',values[charCounter]);
    // Reached the end of input
    if (charCounter >= values.length) {
      if (patternChars.length === charsValues.length) {
        console.log('###1', output);
        return output.join('')
      }
      if (
        placeholder !== undefined &&
        patternChars.length > charsValues.length
      ) {
        console.log('###2', 'addPlaceholder', {output, index, placeholder});
        return addPlaceholder(output, index, placeholder).join('')
      }
      break
    } else if (
      (output[index] === DIGIT && values[charCounter].match(/\d/)) ||
      (output[index] === DIGIT_SPACE && values[charCounter].match(/[\d\s]/)) ||
      (output[index] === DIGIT_SPACE_PLUS_MINUS && values[charCounter].match(/[\d\s+-]/)) ||

      (output[index] === ALPHA && values[charCounter].match(/[a-zA-Z]/)) ||
      (output[index] === ALPHA_SPACE && values[charCounter].match(/[a-zA-Z\s]/)) ||
      (output[index] === ALPHANUM && values[charCounter].match(/[a-zA-Z0-9]/)) ||
      (output[index] === ALPHANUM_SPACE && values[charCounter].match(/[a-zA-Z0-9\s]/)) ||
      (output[index] === CHAR && values[charCounter].match(/[\S]/)) ||
      (output[index] === CHAR_SPACE && values[charCounter].match(/./)) ||

      (output[index] === HOURS && values[charCounter].match(/[0-23]/)) ||
      (output[index] === MINUTES && values[charCounter].match(/[0-59]/)) ||
      (output[index] === SECONDS && values[charCounter].match(/[0-59]/)) ||
      (output[index] === SECONDS && values[charCounter].match(/[0-59]/))
    ) {
      console.log('###3', 'match expression', {
        index,
        'output[index]': output[index],
        'values[charCounter++]': values[charCounter+1],
      });
      output[index] = values[charCounter++]
    } else if (
      (output[index] === DIGIT && !values[charCounter].match(/\d/)) ||
      (output[index] === DIGIT_SPACE && !values[charCounter].match(/[\d\s]/)) ||
      (output[index] === DIGIT_SPACE_PLUS_MINUS && !values[charCounter].match(/[\d\s+-]/)) ||

      (output[index] === ALPHA && !values[charCounter].match(/[a-zA-Z]/)) ||
      (output[index] === ALPHA_SPACE && !values[charCounter].match(/[a-zA-Z\s]/)) ||
      (output[index] === ALPHANUM && !values[charCounter].match(/[a-zA-Z0-9]/)) ||
      (output[index] === ALPHANUM_SPACE && !values[charCounter].match(/[a-zA-Z0-9\s]/)) ||
      (output[index] === CHAR && !values[charCounter].match(/[\S]/)) ||
      (output[index] === CHAR_SPACE && !values[charCounter].match(/./)) ||

      (output[index] === HOURS && !values[charCounter].match(/[0-23]/)) ||
      (output[index] === MINUTES && !values[charCounter].match(/[0-59]/)) ||
      (output[index] === SECONDS && !values[charCounter].match(/[0-59]/)) ||
      (output[index] === SECONDS && !values[charCounter].match(/[0-59]/))
    ) {
      if (placeholder !== undefined) {
          console.log('###4', 'placeholder', {output, index, placeholder});
          return addPlaceholder(output, index, placeholder).join('')
      }
      console.log('###5', 'invalid character retry with next character', {output, index, placeholder, thisSlice:output.slice(0, index).join('')});
      // return output.slice(0, index).join('')
      index--
      charCounter++
      // output[index] = values[charCounter++]

      // escape character so move index up and have a literal character
    } else if (output[index] === ESCAPE)
    {
      console.log('###6', 'escape', {index: index+1,charCounter: charCounter+2});
      index++
      charCounter++
      charCounter++
      // exact match for a non-magic character
    } else if (output[index] === values[charCounter]) {
      console.log('###7', 'non-magic', {charCounter: charCounter+1});
      charCounter++
    }
  console.log('output so far', output);
  }
  console.log('###8', output.join('').substr(0, index), {output, index});
  return output.join('').substr(0, index)
}

export default toPattern
