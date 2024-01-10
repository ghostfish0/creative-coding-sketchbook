public void settings() {
    size(500, 500);
    noSmooth();
    randomSeed(12);
}

void setup() {
    noStroke();
}

void mousePressed() {
  noLoop();
}

void mouseReleased() {
  loop();
}

void draw() {

  //if (frameCount > 120)
  //  exit();
  
  frameRate(30);
  background(theme[0]);
  float yoff = 0;
  for (int y = 0; y < canvasHeight; y++) {
    float xoff = 0;
    for(int x = 0; x < canvasWidth; x++) {
      int index = (x + y + canvasWidth) * 4;
      float angle = noise(xoff, yoff, zoff) * TWO_PI;
      PVector v = PVector.fromAngle(angle);
      xoff += inc;
      stroke(0);
      push();
        translate(x * scl, y * scl);
        rotate(v.heading());
        line(0, 0, scl, 0);
      pop();
    }
    yoff += inc;
  }

  zoff += (loopDirection ? 1 : -1) * 0.5 * inc;

  if (frameCount > 60) {
    loopDirection = false;
  }
  
  //saveFrame("./export_img/######.png"); 
}
