const canvasWidth = 640; 
const canvasHeight = 480;
const gridSize = 4;
const cellHeight = canvasHeight / gridSize;
const cellWidth = canvasWidth / gridSize;
const zoom = 100;
const themecolors = [
    [15, 15, 15],
    [255, 255, 255],
]
// const minres = 0.05;
let cells = [];
const constraints = {
    video: {
        // frameRate: { ideal: 25, max: 25 },
        facingMode: "user",
    },
    audio: false
}

const emptyCellId = gridSize - 1;

let clicky;
let revCellSize;

function waitFor(conditionFunction) {

  const poll = resolve => {
    if(conditionFunction()) resolve();
    else setTimeout(_ => poll(resolve), 400);
  }

  return new Promise(poll);
}
