import Coordinates from "./Coordinates.js"
import Map from "./Map.js"
import randomInt from "./randomInt.js"

export default function generateMap(width, height) {
    const map = new Map(width, height)
    let actualCoordinates = new Coordinates(randomInt(width), randomInt(height))
    let lastCell = map.getCellByCoordinates(actualCoordinates)
    const cellsInPaths = [lastCell]
    let actualCell = null
    let a = 0

    while (cellsInPaths.length < width * height) {
        while(actualCoordinates = nextRandomCoordinates(cellsInPaths, map, lastCell.coordinates)) {
            actualCell = map.getCellByCoordinates(actualCoordinates)
            actualCell.addConnectedCell(lastCell)
            cellsInPaths.push(actualCell)
            lastCell = actualCell
        }
        lastCell = cellsInPaths[a]
        a++
    }

    map.getCellByCoordinates(new Coordinates(randomInt(width), randomInt(height))).startPoint = true
    map.getCellByCoordinates(new Coordinates(randomInt(width), randomInt(height))).endPoint = true

    return map
}

function nextRandomCoordinates(cellsInPaths, map, coordinates) {
    const adjacentCoordinates = adjacentCoordinatesNotVisited(cellsInPaths, map, coordinates)

    return adjacentCoordinates[randomInt(adjacentCoordinates.length)]
}

function adjacentCoordinatesNotVisited(cellsInPaths, map, coordinates) {
    return [
        new Coordinates(coordinates.x + 1, coordinates.y),
        new Coordinates(coordinates.x - 1, coordinates.y),
        new Coordinates(coordinates.x, coordinates.y + 1),
        new Coordinates(coordinates.x, coordinates.y - 1),
    ]
    .filter(coordinates => coordinates.x >= 0)
    .filter(coordinates => coordinates.y >= 0)
    .filter(coordinates => coordinates.x < map.width)
    .filter(coordinates => coordinates.y < map.height)
    .filter(coordinates => !cellsInPaths.some(cell => cell.coordinates.sameAs(coordinates)))
}
