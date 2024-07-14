import Frontier from "./Frontier.js"
import search from "./search.js"

export default function greedyBestFirstSearch(map) {
    const frontier = new Frontier(nodes => {
        return nodes.sort(function (a, b) {
            return getCost(a, map.cells.find(cell => cell.endPoint)) - getCost(b, map.cells.find(cell => cell.endPoint))
        }).shift()
    })

    return search(map, frontier)
}

export function getCost(cell, end) {
    return Math.abs(cell.coordinates.x - end.coordinates.x) + Math.abs(cell.coordinates.y - end.coordinates.y)
}
