import Action from './Action.js'

export default class Cell {
    coordinates
    up = null
    right = null
    down = null
    left = null
    actions = []
    startPoint = false
    endPoint = false

    constructor(coordinates) {
        this.coordinates = coordinates
    }

    addConnectedCell(cell) {
        if (this.coordinates.x + 1 === cell.coordinates.x) {
            this.right = cell
            cell.left = this
            this.actions.push(Action.moveRight(cell))
            cell.actions.push(Action.moveLeft(this))
        } else if (this.coordinates.x - 1 === cell.coordinates.x) {
            this.left = cell
            cell.right = this
            this.actions.push(Action.moveLeft(cell))
            cell.actions.push(Action.moveRight(this))
        } else if (this.coordinates.y + 1 === cell.coordinates.y) {
            this.up = cell
            cell.down = this
            this.actions.push(Action.moveUp(cell))
            cell.actions.push(Action.moveDown(this))
        } else if (this.coordinates.y - 1 === cell.coordinates.y) {
            this.down = cell
            cell.up = this
            this.actions.push(Action.moveDown(cell))
            cell.actions.push(Action.moveUp(this))
        }
    }

    isEndOfPath() {
        return this.actions.length < 2
    }

    isIntersection() {
        return this.actions.length > 2
    }
}
