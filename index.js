import Map from './Map.js'
import drawMap, { drawMapResult, drawMapResultStepByStep, eraseMapResult } from './drawMap.js'
import generateMap from './generateMap.js'
import resolveMap from './resolveMap.js'

document.querySelector('#pathfinding-algorithm').value = localStorage.getItem('pathfinding-algorithm') ?? 'depth-first search'
document.querySelector('#pathfinding-algorithm').addEventListener('change', function (event) {
    localStorage.setItem('pathfinding-algorithm', event.target.value)
})

document.querySelector('#generate-new-map').addEventListener('click', function () {
    map = generateMap(document.querySelector('#map-width').value, document.querySelector('#map-height').value)
    drawMap(map)
})

document.querySelector('#resolve-map').addEventListener('click', function () {
    drawMapResult(resolveMap(map, document.querySelector('#pathfinding-algorithm').value))
})

document.querySelector('#resolve-map-step-by-step').addEventListener('click', function () {
    drawMapResultStepByStep(resolveMap(map, document.querySelector('#pathfinding-algorithm').value))
})

document.querySelector('#erase-result').addEventListener('click', function () {
    eraseMapResult()
})

document.querySelector('#empty-map').addEventListener('click', function () {
    map = new Map(document.querySelector('#map-width').value, document.querySelector('#map-height').value)
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

document.querySelector('#toggle-debug').addEventListener('click', function () {
    localStorage.setItem('debug', localStorage.getItem('debug') === 'debug' ? '' : 'debug')
    setDebugStatus()
})

let map = generateMap(document.querySelector('#map-width').value, document.querySelector('#map-height').value)
drawMap(map)
setDebugStatus()

function setDebugStatus() {
    if (localStorage.getItem('debug') === 'debug') {
        document.querySelector('#map').classList.add('debug')
    } else {
        document.querySelector('#map').classList.remove('debug')
    }
}
