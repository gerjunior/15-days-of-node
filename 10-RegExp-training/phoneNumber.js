/**
 * regExp are stateful, which means that the next time you run the same regExp it will not return the same result from before.
 * To avoid this behavior and reuse the same expression multiple times, I created this Proxy object that will reset the lastIndex property,
 * making it behave like it is a new expression.
 */
const generatePhoneExp = () => {
  const phoneExp =
    /(?:(?<country_code>\+\d{2})\s)?\(?(?<area_code>\d{2})\)?\s?(\d{5})[\s-]?(\d{4})/g

  const expProxy = new Proxy(phoneExp, {
    get(target, prop) {
      if (prop === 'exec') {
        phoneExp.lastIndex = 0
      }

      if (typeof phoneExp[prop] === 'function') {
        return (...params) => phoneExp[prop](...params)
      }

      return target[prop]
    },
  })

  return expProxy
}

const phoneExp = generatePhoneExp()

const results = [
  phoneExp.exec('37991785049'),
  phoneExp.exec('98 991785049'),
  phoneExp.exec('12 99178 5049'),
  phoneExp.exec('11 99178-5049'),
  phoneExp.exec('(43) 99178 5049'),
  phoneExp.exec('(32) 99178-5049'),
  phoneExp.exec('+55 (23) 99178-5049'),
  phoneExp.exec('+55 (33) 99178-5049'),
  phoneExp.exec('NaN'),
]

// get all area codes from matching expressions
const areaCodes = results.map((r) => r && r.groups?.area_code).filter((r) => r)
console.log(areaCodes)
