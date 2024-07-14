export default class Frontier {
    nodes = []
    nextNodeCallback

    constructor(nextNodeCallback) {
        this.nextNodeCallback = nextNodeCallback
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
        return this.nextNodeCallback(this.nodes)
    }
}
