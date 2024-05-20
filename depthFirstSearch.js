import search from "./search.js"

class Stack {
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
        return this.nodes.pop()
    }
}

export default function depthFirstSearch(map) {
    return search(map, new Stack())
}
