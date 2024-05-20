import search from "./search.js"

class Queue {
    nodes = []

    add(node) {
        if (!this.nodes.includes(node)) {
            this.nodes.push(node)
        }
    }

    isEmpty() {
        return this.nodes.length === 0
    }

    next() {
        return this.nodes.shift()
    }
}

export default function breadthFirstSearch(map) {
    return search(map, new Queue())
}
