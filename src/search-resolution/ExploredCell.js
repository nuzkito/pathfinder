export default class ExploredCell {
    cell
    #valid = false
    #invalid = false

    constructor(cell) {
        this.cell = cell
    }

    static fromCell(cell) {
        return new ExploredCell(cell)
    }

    valid() {
        this.#valid = true

        return this
    }

    invalid() {
        this.#invalid = true

        return this
    }

    isValid() {
        return this.#valid
    }

    isInvalid() {
        return this.#invalid
    }
}
