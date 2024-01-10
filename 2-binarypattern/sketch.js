function preload() {

}


function setup() {
    createCanvas(canvasWidth, canvasHeight);
    
    background(themecolors[0]);
    fill(themecolors[1]);
    noStroke();

    drawTree(0, 1, 0, 0, width);
}

function draw() {
}

function drawTree(painted, level, x, y, width) {
    if (level > treeHeight)
        return; 
    if (painted)
        rect(x, y, width, levelHeight);
    drawTree(false, level + 1, x, y + levelHeight, width / 2); 
    drawTree(true, level + 1, x + width/2, y + levelHeight, width / 2); 
}

