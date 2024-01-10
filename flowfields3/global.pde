static final float inc = 0.10;
static final float scl = 10.0;
static final int canvasWidth = 200;  
static final int canvasHeight = 200;  
static final int cols = (int) Math.floor(canvasWidth / scl);
static final int rows = (int) Math.floor(canvasHeight / scl);

float zoff = 0;
boolean loopDirection = true;

int[] theme = {
    // color(200),
    // color(0),
    // color(0),
    color(255),
    color(255, 0, 0),
    color(255, 204, 0),
};
