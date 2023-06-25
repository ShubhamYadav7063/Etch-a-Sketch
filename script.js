const DEFAULT_COLOR = '#DB5757'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

let pad = document.getElementById('sketch-area');
let dimensions = document.getElementById('value')
let colorWheel = document.getElementById('color-wheel')
let buttons = document.querySelectorAll('button')
let rainbowbtn = document.getElementById('rainbow')
let erasebtn = document.getElementById('erase')
let clear = document.getElementById('clear')
let colorbtn = document.getElementById('color')
let rangeInput = document.getElementById('range-input')



function curMode(mode) {
    currentMode = mode;
    // console.log(currentMode);
}

function curColor(color) {
    currentColor = color;
}

function curSize(size) {
    currentSize = size;
}

rangeInput.addEventListener('input', () => {
    dimensions.textContent = rangeInput.value + "x" + rangeInput.value;
})


colorWheel.addEventListener('input', (e) => curColor(e.target.value))
colorbtn.addEventListener('click', () => curMode('color'))
rainbowbtn.addEventListener('click', () => curMode('rainbow'))
erasebtn.addEventListener('click', () => curMode('erase'))
clear.addEventListener('click', clearGrid)
rangeInput.addEventListener('change', () => changeSize(rangeInput.value))


let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function gridSetup(size) {
    pad.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    pad.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size*size; i++) {
        const gridBox = document.createElement('div')
        gridBox.classList.add('grid-element')
        // gridBox.style.backgroundColor = 'red'
        gridBox.addEventListener('mouseover', newColor)
        gridBox.addEventListener('mousedown', newColor)
        pad.appendChild(gridBox)
    }
}

function changeSize(value) {
    curSize(value)
    reloadGrid()
}

function clearGrid() {
    pad.innerHTML = ''
}

function reloadGrid() {
    clearGrid()
    gridSetup(currentSize)
}

function newColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return

    else if (currentMode === 'rainbow') {
        let randomR = Math.floor(Math.random() * 256)
        let randomG = Math.floor(Math.random() * 256)
        let randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    }

    else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;

    }

    else if (currentMode === 'erase') {
        e.target.style.backgroundColor = '#fefefe'
    }
}

window.onload = () => {
    gridSetup(DEFAULT_SIZE)
}