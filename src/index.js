import Map from './map-generation/Map.js'
import drawMap, { drawMapResult, drawMapResultStepByStep, eraseMapResult } from './drawMap.js'
import generateMap from './map-generation/generateMap.js'
import resolveMap from './search-resolution/resolveMap.js'

/* Generate map form */
document.querySelector('#generate-map').addEventListener('submit', function (event) {
    const width = event.target.querySelector('#map-width').value
    const height = event.target.querySelector('#map-height').value

    if (event.submitter === event.target.querySelector('#generate-new-map')) {
        map = generateMap(width, height)
    } else if (event.submitter === event.target.querySelector('#empty-map')) {
        map = new Map(width, height)
    }

    drawMap(map)
})

document.querySelector('#map-width').value = localStorage.getItem('map-width') ?? 20
document.querySelector('#map-width').addEventListener('change', function (event) {
    localStorage.setItem('map-width', event.target.value)
})

document.querySelector('#map-height').value = localStorage.getItem('map-height') ?? 20
document.querySelector('#map-height').addEventListener('change', function (event) {
    localStorage.setItem('map-height', event.target.value)
})

/* Resolve map form */
document.querySelector('#resolve-map').addEventListener('submit', function (event) {
    if (event.submitter === event.target.querySelector('#resolve')) {
        drawMapResult(resolveMap(map, event.target.querySelector('#pathfinding-algorithm').value))
    } else if (event.submitter === event.target.querySelector('#resolve-step-by-step')) {
        drawMapResultStepByStep(resolveMap(map, event.target.querySelector('#pathfinding-algorithm').value))
    } else if (event.submitter === event.target.querySelector('#erase-result')) {
        eraseMapResult()
    }
})

document.querySelector('#pathfinding-algorithm').value = localStorage.getItem('pathfinding-algorithm') ?? 'depth-first search'
document.querySelector('#pathfinding-algorithm').addEventListener('change', function (event) {
    localStorage.setItem('pathfinding-algorithm', event.target.value)
})

/* Debug form */
function setDebugStatus() {
    if (localStorage.getItem('debug') === 'debug') {
        document.querySelector('#map').classList.add('debug')
    } else {
        document.querySelector('#map').classList.remove('debug')
    }
}

document.querySelector('#toggle-debug').addEventListener('submit', function () {
    localStorage.setItem('debug', localStorage.getItem('debug') === 'debug' ? '' : 'debug')
    setDebugStatus()
})

/* First draw after load */
let map = generateMap(document.querySelector('#map-width').value, document.querySelector('#map-height').value)
drawMap(map)
setDebugStatus()
