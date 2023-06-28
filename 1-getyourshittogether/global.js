const canvasSize = 500;
const gridSize = 3;
const cellSize = canvasSize / gridSize;
const themecolors = [
    [0, 0, 0],
    [255, 255, 255],
]

let cells = [];
const constraints = {
    video: {
        // frameRate: { ideal: 25, max: 25 },
        facingMode: "user",
    },
    audio: false
}

const emptyCellId = 5;