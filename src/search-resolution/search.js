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

                invalidCell = invalidCell.actions
                    .filter(action => result.isExploredCell(action.state))
                    .find(action => !result.isInvalidCell(action.state))
                    ?.state

                if (invalidCell && checkIfItIsInvalidAfterFindSolution(invalidCell, result)) {
                    frontier.add(invalidCell)
                }
            }
            break;
        }

        actualCell.actions
            .filter(action => !result.exploredCells.some(explored => explored.cell === action.state))
            .forEach(action => frontier.add(action.state))

        if (actualCell.isEndOfPath()) {
            let invalidCell = actualCell
            while (invalidCell && isInvalid(invalidCell, result)) {
                result.addExplored(ExploredCell.fromCell(invalidCell).invalid())
                invalidCell = invalidCell.actions
                    .find(action => !result.isInvalidCell(action.state))
                    .state
            }
        }
    }

    let lastValidCell = startCell

    while (lastValidCell && lastValidCell !== endCell) {
        result.addExplored(ExploredCell.fromCell(lastValidCell).valid())
        lastValidCell = lastValidCell.actions
            .filter(action => result.isExploredCell(action.state))
            .filter(action => !result.isInvalidCell(action.state))
            .find(action => !result.isValidCell(action.state))
            .state
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
        return cell.actions
            .filter(action => !result.isInvalidCell(action.state))
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
        return cell.actions
            .filter(action => result.isExploredCell(action.state))
            .filter(action => !result.isInvalidCell(action.state))
            .length === 1
    }

    return true
}
