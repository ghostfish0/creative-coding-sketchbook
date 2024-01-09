function preload() {
    soundFormats('wav');
    clicky = loadSound('../global/assets/soundfx/mixkit-interface-click-1126.wav');

}


function setup() {
    createCanvas(canvasSize, canvasSize);
    frameRate(15);
    
    background(themecolors[0]);
    fill(themecolors[0]);
    noStroke();
    

    videoSource = createCapture(constraints); 
    videoSource.hide();
    waitFor(_ => videoSource.loadedmetadata === true)
        .then(() => {
            revCellSize = (videoSource.height - 2 * zoom) / gridSize;
            addCells();
            loop();
        });

    noLoop();
}

function draw() {
    drawCells();
    filter(GRAY);
}

class Cell {
    constructor(id) {
        let i = Math.floor(id / gridSize);
        let j = id % gridSize;
        this.x = i * revCellSize + zoom;
        this.y = j * revCellSize + (videoSource.width - videoSource.height) / 2 + zoom;
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
        let crop2 = createImage(this.res, this.res);
        crop2.copy(videoSource, this.x, this.y, revCellSize, revCellSize, 0, 0, this.res, this.res);
        crop2.resize(cellSize, 0);
        image(crop2, x, y);
    }
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
            console.log(i, j, gridSize);
        }
    }
}

function isAdjacent(a, b, c, d) {
    return ((b == d && abs(a - c) == 1) || (a == c && (abs(b - d) == 1)));
}

function mousePressed() {
    let i = gridSize - floor(mouseX / cellSize) - 1;
    let j = floor(mouseY / cellSize);
    slide(j, i);
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