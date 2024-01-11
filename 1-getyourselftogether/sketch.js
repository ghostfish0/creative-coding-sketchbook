console.log("sketch.js loaded");

function preload() {
    soundFormats('wav');
    clicky = loadSound('../global/assets/soundfx/mixkit-interface-click-1126.wav');
}


function setup() {
    createCanvas(canvasWidth, canvasHeight);
    
    background(themecolors[0]);
    fill(themecolors[0]);
    noStroke();
    
    videoSource = createCapture(constraints); 
    videoSource.hide();
    waitFor(_ => videoSource.loadedmetadata === true)
    .then(() => {
        addCells();
        shuffling();
        loop();
    });
    noLoop();
}

function draw() {
    drawCells();
}

function keyPressed() {
    if (key === " ") {
        loop();
    } else if (key === ".") {
        noLoop();
    }
    return false; // prevent default
}

class Cell {
    constructor(id) {
        let i = id % gridSize;
        let j = floor(id / gridSize);
        this.x = j * cellWidth;
        this.y = i * cellHeight;
        this.id = id;
        console.log(i, j, this.x, this.y);
    }
    
    show(x, y) {
        if (this.id == emptyCellId) {
            rect(x, y, cellWidth, cellHeight);
            return;
        }
    
        push();
        copy(videoSource, this.x, this.y, 
            cellWidth, cellHeight, 
            x, y, 
            cellWidth, cellHeight);

        fill(0);
        textAlign(CENTER, CENTER);
        text(this.i, x + cellWidth / 2 - 10, y + 100);
        text(this.j, x + cellWidth / 2 + 10, y + 100);
        pop();
    }
}

function addCells() {
    for(let i = 0; i < gridSize * gridSize; i++) {
        cells.push(new Cell(i));
    }
}

function shuffling() {
    for(let k = 0; k < 100; k++) {
        let empty = findEmtpy();
        let emptyCol = empty % gridSize; 
        let emptyRow = Math.floor(empty / gridSize); 
        let i = emptyCol;
        let j = emptyRow;
        let set = [
            (i + 1 < gridSize) ? 1 : 0,
            (i - 1 >= 0) ? 2 : 0,
            (j + 1 < gridSize) ? 3 : 0,
            (j - 1 >= 0) ? 4 : 0,
        ]
        let r = set[Math.floor(Math.random() * set.length)];
        while (r == 0) r = set[Math.floor(Math.random() * set.length)];
        switch(r) {
            case 1: i++; break;
            case 2: i--; break;
            case 3: j++; break;
            case 4: j--; break;
        }
        [cells[empty], cells[i + j * gridSize]] = [cells[i + j * gridSize], cells[empty]]; 
    }
}

function drawCells() {
    for(let i = 0; i < gridSize; i++) {
        for(let j = 0; j < gridSize; j++) {
                if (cells[i * gridSize + j] == undefined) continue;  
                cells[i * gridSize + j].show(i * cellWidth, j * cellHeight);
        }
    }
}

function isAdjacent(a, b, c, d) {
    return ((b == d && abs(a - c) == 1) || (a == c && (abs(b - d) == 1)));
}

function mousePressed() {
    console.log(mouseX, mouseY)
    let i = gridSize - floor(mouseX / cellWidth) - 1;
    let j = floor(mouseY / cellHeight);
    slide(i, j);
}

function slide(i, j) {
    let empty = findEmtpy();
    let emptyRow = empty % gridSize; 
    let emptyCol = Math.floor(empty / gridSize); 
    console.log(i, j, emptyRow, emptyCol);
    
    if (isAdjacent(i, j, emptyCol, emptyRow)) {
        [cells[empty], cells[i * gridSize + j]] = [cells[i * gridSize + j], cells[empty]]; 
        // clicky.play(0.15);
    }
}

function findEmtpy() {
    for (let i = 0; i < cells.length; i++) { 
        if (cells[i].id == emptyCellId) return i;
    }
}
