export default class Cell {
    coordinates
    up = null
    right = null
    down = null
    left = null
    startPoint = false
    endPoint = false

    constructor(coordinates) {
        this.coordinates = coordinates
    }

    addConnectedCell(cell) {
        if (this.coordinates.x + 1 === cell.coordinates.x) {
            this.right = cell
            cell.left = this
        } else if (this.coordinates.x - 1 === cell.coordinates.x) {
            this.left = cell
            cell.right = this
        } else if (this.coordinates.y + 1 === cell.coordinates.y) {
            this.up = cell
            cell.down = this
        } else if (this.coordinates.y - 1 === cell.coordinates.y) {
            this.down = cell
            cell.up = this
        }
    }

    getConnectedCells() {
        return [this.up, this.right, this.down, this.left].filter(cell => cell)
    }

    isEndOfPath() {
        return [
            this.up,
            this.right,
            this.down,
            this.left,
        ].filter(n=>n).length < 2;
    }

    isIntersection() {
        return [
            this.up,
            this.right,
            this.down,
            this.left,
        ].filter(cell => cell).length > 2;
    }
}
