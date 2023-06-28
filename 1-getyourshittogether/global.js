const canvasSize = Math.floor(500);
const gridSize = 3;
const cellSize = canvasSize / gridSize;
const zoom = 200;
const themecolors = [
    [0, 0, 0],
    [255, 255, 255],
]
const minres = 0.05;
const maxres = 0.3;
let cells = [];
const constraints = {
    video: {
        // frameRate: { ideal: 25, max: 25 },
        facingMode: "user",
    },
    audio: false
}

const emptyCellId = gridSize * gridSize - 1;