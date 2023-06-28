function preload() {
    videoSource = createCapture(constraints); 
}

function setup() {
    videoSource.hide();
    createCanvas(canvasSize, canvasSize);
    background(themecolors[0]);
    fill(themecolors[0]);
    strokeWeight(0);
    videoSource.size(100, 100 * videoSource.height / videoSource.width);

    addCells();
}

function getLevel(r, g, b) {
    const avg = (r + g + b) / 3;
    return floor(map(avg, 0, 255, 0, colorLevels.length))
}

function draw() {
    crop = createImage(width, width);
    if (videoSource.width > videoSource.height) {
        crop.copy(videoSource, (videoSource.width - videoSource.height) / 2, 0, videoSource.height, videoSource.height, 0, 0, width, width);
    }
    if (videoSource.height > videoSource.width) {
        crop.copy(videoSource, (videoSource.height - videoSource.width) / 2, 0, videoSource.width, videoSource.width, 0, 0, height, height);
    }
    drawCells();

    filter(GRAY);
}

function addCells() {
    for(let i = 0; i < gridSize * gridSize; i++) 
        cells.push(new Cell(i));
    // shuffle(cells, true);
}
    
function drawCells() {
    for(let i = 0; i < gridSize; i++) {
        for(let j = 0; j < gridSize; j++) {
            cells[i * gridSize + j].show(i * cellSize, j * cellSize);
        }
    }
}

class Cell {
    constructor(id) {
        let i = Math.floor(id / gridSize);
        let j = id % gridSize;
        this.x = i * cellSize;
        this.y = j * cellSize;
        this.id = id;
    }
    
    show(x, y) {
        // textAlign(CENTER, CENTER);
        // text(this.id, x + 100, y + 100);
        // return;
        if (this.id == emptyCellId) {
            rect(x, y, cellSize);
            return;
        }
        let crop2 = crop;
        crop2.resize(random(100, 400), 0) 
        copy(crop2, this.x, this.y, cellSize, cellSize, x, y, cellSize, cellSize);
    }
}