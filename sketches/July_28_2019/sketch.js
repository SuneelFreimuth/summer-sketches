let capturer;
let canvas;

function setup() {
	let p5canvas = createCanvas(500, 500);
  canvas = p5canvas.canvas;
  colorMode(HSB);
  capturer = new CCapture({
    format: 'webm',
    framerate: 30,
    quality: 100,
  });
  capturer.start();
}

function draw() {
  background(0);
  for (let i = 0; i < 12; i++) {
    let angle = (TWO_PI / 12 * i + frameCount * TWO_PI / 300) % TWO_PI;
    let pos = createVector(0, 175 + 30*sin(angle * 2 + TWO_PI / 2 * i));
    pos.rotate(angle);
    fill(map(angle, 0, TWO_PI, 0, 360), 100, 100);
    ellipse(pos.x + width/2, pos.y + height/2, 50, 50);
  }

  if (frameCount < 300) {
    capturer.capture(canvas);
  } else {
    noLoop();
    capturer.stop();
    capturer.save();
  }
}
