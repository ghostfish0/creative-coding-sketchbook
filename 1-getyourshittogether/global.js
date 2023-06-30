const canvasSize = Math.floor(720);
const gridSize = 3;
const cellSize = canvasSize / gridSize;
const zoom = 50;
const themecolors = [
    [15, 15, 15],
    [255, 255, 255],
]
const minres = 0.05;
const maxres = 1;
let cells = [];
const constraints = {
    video: {
        // frameRate: { ideal: 25, max: 25 },
        facingMode: "user",
    },
    audio: false
}

const emptyCellId = gridSize * gridSize - 1;

let clicky;