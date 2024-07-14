import Action from "./map-generation/Action.js"
import { getCost } from "./search-resolution/greedyBestFirstSearch.js"

export function eraseMapResult() {
    document.querySelector('#map').childNodes.forEach(child => child.classList.remove('visited', 'valid', 'invalid'))
}

export function drawMapResult(result) {
    eraseMapResult()

    for (let exploredCell of result.exploredCells) {
        drawCellResult(exploredCell)
    }
}

function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay))
}

export async function drawMapResultStepByStep(result) {
    eraseMapResult()

    for (let exploredCell of result.exploredCells) {
        drawCellResult(exploredCell)
        await sleep(10)
    }
}

function drawCellResult(exploredCell) {
    const div = document.querySelector(`[data-x="${exploredCell.cell.coordinates.x}"][data-y="${exploredCell.cell.coordinates.y}"]`)
    div.classList.add('visited')

    if (exploredCell.isValid()) {
        div.classList.add('valid')
    }

    if (exploredCell.isInvalid()) {
        div.classList.add('invalid')
    }
}

export default function drawMap(map) {
    const mapNode = document.querySelector('#map')
    mapNode.replaceChildren()
    mapNode.style.setProperty('--map-width', map.width)
    mapNode.style.setProperty('--map-height', map.height)
    map.cells.forEach(cell => {
        mapNode.appendChild(drawCell(map, cell))
    })
}

function drawCell(map, cell) {
    const div = document.createElement('div')
    div.classList.add('cell')
    div.setAttribute('data-x', cell.coordinates.x)
    div.setAttribute('data-y', cell.coordinates.y)
    div.style.gridArea = `${map.height - cell.coordinates.y} / ${cell.coordinates.x + 1}`

    const span = document.createElement('span')
    span.appendChild(document.createTextNode(`${cell.coordinates.x},${cell.coordinates.y}`))
    span.appendChild(document.createElement('br'))
    span.appendChild(document.createTextNode(getCost(cell, map.cells.find(cell => cell.endPoint))))
    span.classList.add('debug-info')
    div.appendChild(span)

    if (!cell.actions.some(action => action.action === Action.up)) {
        div.classList.add('wall-up')
    }

    if (!cell.actions.some(action => action.action === Action.right)) {
        div.classList.add('wall-right')
    }

    if (!cell.actions.some(action => action.action === Action.down)) {
        div.classList.add('wall-down')
    }

    if (!cell.actions.some(action => action.action === Action.left)) {
        div.classList.add('wall-left')
    }

    if (cell.startPoint) {
        div.classList.add('start')
    }

    if (cell.endPoint) {
        div.classList.add('end')
    }

    return div
}
