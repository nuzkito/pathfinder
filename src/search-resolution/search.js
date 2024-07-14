import ExploredCell from "./ExploredCell.js"
import Result from "./Result.js"

export default function search(map, frontier) {
    const endCell = map.cells.find(cell => cell.endPoint)
    const startCell = map.cells.find(cell => cell.startPoint)
    const result = new Result()

    if (!endCell || !startCell) {
        return result
    }

    frontier.add(startCell)

    while (true) {
        if (frontier.isEmpty()) {
            return result
        }

        const actualCell = frontier.next()
        result.addExplored(ExploredCell.fromCell(actualCell))

        if (actualCell.endPoint === true) {
            while (!frontier.isEmpty()) {
                let invalidCell = frontier.next()

                if (result.isExploredCell(invalidCell)) {
                    result.addExplored(ExploredCell.fromCell(invalidCell).invalid())
                }

                invalidCell = invalidCell.getConnectedCells()
                    .filter(cell => result.isExploredCell(cell))
                    .filter(cell => !result.isInvalidCell(cell))[0]

                if (invalidCell && checkIfItIsInvalidAfterFindSolution(invalidCell, result)) {
                    frontier.add(invalidCell)
                }
            }
            break;
        }

        actualCell.actions.filter(action => !result.exploredCells.some(explored => explored.cell === action.state))
            .forEach(action => frontier.add(action.state))

        if (actualCell.isEndOfPath()) {
            let invalidCell = actualCell
            while (invalidCell && isInvalid(invalidCell, result)) {
                result.addExplored(ExploredCell.fromCell(invalidCell).invalid())
                invalidCell = invalidCell.getConnectedCells()
                    .filter(cell => !result.isInvalidCell(cell))[0]
            }
        }
    }

    let lastValidCell = startCell

    while (lastValidCell && lastValidCell !== endCell) {
        result.addExplored(ExploredCell.fromCell(lastValidCell).valid())
        lastValidCell = lastValidCell.getConnectedCells()
            .filter(cell => result.isExploredCell(cell))
            .filter(cell => !result.isInvalidCell(cell))
            .filter(cell => !result.isValidCell(cell))[0]
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
        return cell.getConnectedCells()
            .filter(cell => !result.isInvalidCell(cell))
            .length === 1
    }

    return true
}

function checkIfItIsInvalidAfterFindSolution(cell, result) {
    if (cell.startPoint) {
        return false;
    }

    if (cell.endPoint) {
        return false;
    }

    if (cell.isIntersection()) {
        return cell.getConnectedCells()
            .filter(cell => result.isExploredCell(cell))
            .filter(cell => !result.isInvalidCell(cell))
            .length === 1
    }

    return true
}
