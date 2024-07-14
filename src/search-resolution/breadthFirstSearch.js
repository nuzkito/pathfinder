import Frontier from "./Frontier.js"
import search from "./search.js"

export default function breadthFirstSearch(map) {
    return search(map, new Frontier(nodes => nodes.shift()))
}
