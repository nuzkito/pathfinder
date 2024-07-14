export default class Coordinates {
    x
    y

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    sameAs(coordinates) {
        return this.x === coordinates.x && this.y === coordinates.y
    }
}
