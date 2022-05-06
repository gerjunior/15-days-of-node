export class TextProcessorFluentAPI {
  #content

  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    // ?<= (positive lookbehind) will extract data that comes after the following group
    // [contratante|contratada] one or another (also consider the 'i' flag at the end of expression to make it case insensitive)
    // :\s{1} will search for the literal character cólon followed by a space
    // everything above is inside parentheses, which means "get everything coming after"

    // (?!\s) negative look around, will ignore where it contains an extra space after the previous group
    // .*\n takes everything until \n
    // .*? non greety, makes the expression group stop at its first occurrence, avoiding loops
    // $ expression finishes at the end of the line
    // g -> global
    // m -> multiline
    // i -> case insensitive

    const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim
    const onlyPerson = this.#content.match(matchPerson)
    this.#content = onlyPerson

    return this
  }

  build() {
    return this.#content
  }
}
