import ExploredCell from "./ExploredCell.js"
import Result from "./Result.js"

export default function resolveMap(map) {
    const endCell = map.cells.find(cell => cell.endPoint)
    const startCell = map.cells.find(cell => cell.startPoint)
    const result = new Result()

    if (!endCell || !startCell) {
        return result
    }

    result.addExplored(ExploredCell.fromCell(startCell))
    let actualCell = startCell
    const nextCells = []

    while (actualCell !== endCell) {
        if (actualCell.up && !result.exploredCells.some(explored => explored.cell === actualCell.up)) {
            nextCells.push(actualCell.up)
        }

        if (actualCell.right && !result.exploredCells.some(explored => explored.cell === actualCell.right)) {
            nextCells.push(actualCell.right)
        }

        if (actualCell.down && !result.exploredCells.some(explored => explored.cell === actualCell.down)) {
            nextCells.push(actualCell.down)
        }

        if (actualCell.left && !result.exploredCells.some(explored => explored.cell === actualCell.left)) {
            nextCells.push(actualCell.left)
        }

        if (actualCell.isEndOfPath()) {
            let invalidCell = actualCell
            while (invalidCell && isInvalid(invalidCell, result)) {
                result.addExplored(ExploredCell.fromCell(invalidCell).invalid())
                invalidCell = [invalidCell.up, invalidCell.right, invalidCell.down, invalidCell.left]
                    .filter(cell => cell)
                    .filter(cell => !result.isInvalidCell(cell))[0]
            }
        }

        actualCell = nextCells.pop()
        result.addExplored(ExploredCell.fromCell(actualCell))
    }

    let lastValidCell = startCell

    while (lastValidCell !== endCell) {
        result.addExplored(ExploredCell.fromCell(lastValidCell).valid())
        lastValidCell = [lastValidCell.up, lastValidCell.right, lastValidCell.down, lastValidCell.left]
            .filter(cell => cell)
            .filter(cell => result.isExploredCell(cell))
            .filter(cell => !result.isInvalidCell(cell))
            .filter(cell => !result.isValidCell(cell))
            [0]
    }

    result.addExplored(ExploredCell.fromCell(endCell).valid())

    return result
}

function isInvalid(cell, result) {
    if (cell.startPoint) {
        return false;
    }

    if (cell.endPoint) {
        return false;
    }

    if (cell.isIntersection()) {
        return [cell.up, cell.right, cell.down, cell.left]
            .filter(cell => cell)
            .filter(cell => !result.isInvalidCell(cell))
            .length === 1
    }

    return true
}
