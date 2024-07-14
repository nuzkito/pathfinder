export default class Action {
    static up = Symbol('move up')
    static right = Symbol('move right')
    static down = Symbol('move down')
    static left = Symbol('move left')

    action
    state

    constructor(action, state) {
        this.action = action
        this.state = state
    }

    static moveUp(state) {
        return new Action(self.up, state)
    }

    static moveRight(state) {
        return new Action(self.up, state)
    }

    static moveDown(state) {
        return new Action(self.up, state)
    }

    static moveLeft(state) {
        return new Action(self.up, state)
    }
}
