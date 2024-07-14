import Cell from "./Cell.js"
import Coordinates from "./Coordinates.js"

export default class Map {
    cells = []
    resolved = false
    width
    height

    constructor(width, height) {
        this.width = width
        this.height = height

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                this.cells.push(new Cell(new Coordinates(x, y)))
            }
        }
    }

    getCellByCoordinates(coordinates) {
        return this.cells.find(cell => cell.coordinates.sameAs(coordinates))
    }
}
