import safeRegex from 'safe-regex'

export class InvalidRegexError extends Error {
  constructor(exp) {
    super(`The expression "${exp}" is unsafe!`)
    this.name = 'InvalidRegexError'
  }
}

export const evaluateRegex = (exp) => {
  const isSafe = safeRegex(exp)
  if (isSafe) return exp

  throw new InvalidRegexError(exp)
}
