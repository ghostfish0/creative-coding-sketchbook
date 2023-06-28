function preload() {
    videoSource = createCapture(constraints); 
    soundFormats('wav');
    clicky = loadSound('../global/assets/soundfx/mixkit-interface-click-1126.wav');
}

function setup() {
    createCanvas(canvasSize, canvasSize);
    background(themecolors[0]);
    fill(themecolors[0]);
    strokeWeight(0);
    videoSource.hide();
    addCells();
}

function draw() {
    crop = createImage(canvasSize, canvasSize);
    if (videoSource.width > videoSource.height) {
        crop.copy(videoSource, (videoSource.width - videoSource.height) / 2 + zoom, zoom, videoSource.height - zoom, videoSource.height - zoom, 0, 0, canvasSize, canvasSize);
    }
    if (videoSource.height > videoSource.width) {
        crop.copy(videoSource, (videoSource.height - videoSource.width) / 2, 0, videoSource.width, videoSource.width, 0, 0, canvasSize, canvasSize);
    }
    drawCells();
    
    filter(GRAY);
}

class Cell {
    constructor(id) {
        let i = Math.floor(id / gridSize);
        let j = id % gridSize;
        this.x = i * cellSize;
        this.y = j * cellSize;
        this.id = id;
        this.res = cellSize * random(minres, maxres);
    }
    
    show(x, y) {
        // textAlign(CENTER, CENTER);
        // text(this.id, x + 100, y + 100);
        // return;
        if (this.id == emptyCellId) {
            rect(x, y, cellSize);
            return;
        }
        let crop2 = createImage(cellSize, cellSize);
        crop2.copy(crop, this.x, this.y, cellSize, cellSize, 0, 0, cellSize, cellSize);
        crop2.resize(this.res, 0);
        crop2.resize(cellSize, 0);
        image(crop2, x, y);
    }
}
function mousePressed() {
    let i = floor(mouseX / cellSize);
    let j = floor(mouseY / cellSize);
    slide(j, i);
}

function addCells() {
    for(let i = 0; i < gridSize * gridSize; i++) 
        cells.push(new Cell(i));
    shuffle(cells, true);
}
    
function drawCells() {
    for(let i = 0; i < gridSize; i++) {
        for(let j = 0; j < gridSize; j++) {
            cells[i * gridSize + j].show(i * cellSize, j * cellSize);
        }
    }
}

function isAdjacent(a, b, c, d) {
    return ((b == d && abs(a - c) == 1) || (a == c && (abs(b - d) == 1)));
}

function slide(i, j) {
    let empty = findEmtpy();
    let emptyCol = empty % gridSize; 
    let emptyRow = Math.floor(empty / gridSize); 

    if (isAdjacent(i, j, emptyCol, emptyRow)) {
        [cells[empty], cells[i + j * gridSize]] = [cells[i + j * gridSize], cells[empty]]; 
        clicky.play(0.15);
    }
}

function findEmtpy() {
    for (let i = 0; i < cells.length; i++) { 
        if (cells[i].id == emptyCellId) return i;
    }
}