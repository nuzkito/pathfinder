export default class Result {
    exploredCells = []

    addExplored(exploredCell) {
        this.exploredCells.push(exploredCell)
    }

    isExploredCell(cell) {
        return this.exploredCells.some(explored => explored.cell === cell)
    }

    isValidCell(cell) {
        return this.exploredCells
            .filter(explored => explored.cell === cell)
            .some(explored => explored.isValid())
    }

    isInvalidCell(cell) {
        return this.exploredCells
            .filter(explored => explored.cell === cell)
            .some(explored => explored.isInvalid())
    }
}
