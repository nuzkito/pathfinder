import search from "./search.js"

class Frontier {
    nodes = []
    pathCostCallback

    constructor(pathCostCallback = nodes => nodes) {
        this.pathCostCallback = pathCostCallback
    }

    add(node) {
        if (!this.nodes.includes(node)) {
            this.nodes.push(node)
        }
    }

    isEmpty() {
        return this.nodes.length === 0
    }

    next() {
        return this.pathCostCallback(this.nodes).shift()
    }
}

export default function greedyBestFirstSearch(map) {
    const frontier = new Frontier(nodes => {
        return nodes.sort(function (a, b) {
            return getCost(a, map.cells.find(cell => cell.endPoint)) - getCost(b, map.cells.find(cell => cell.endPoint))
        })
    })

    return search(map, frontier)
}

export function getCost(cell, end) {
    return Math.abs(cell.coordinates.x - end.coordinates.x) + Math.abs(cell.coordinates.y - end.coordinates.y)
}
