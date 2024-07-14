import Frontier from "./Frontier.js"
import search from "./search.js"

export default function depthFirstSearch(map) {
    return search(map, new Frontier(nodes => nodes.pop()))
}
