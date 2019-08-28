let capturer;
let canvas;

let num = 45;
let gap = 500 / num;
let low = 2;
let range = 10;
let high = low + range;

function setup() {
	let p5canvas = createCanvas(600, 600);
  canvas = p5canvas.canvas;
  noStroke();
  colorMode(HSB);
  rectMode(CENTER);
  capturer = new CCapture({
    format: 'webm',
    framerate: 30,
    quality: 100,
  });
  capturer.start();
}

function draw() {
  background(0, 100, 40);
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      let r = low + range*noise((frameCount+i)*0.02, (frameCount+j)*0.02);
      fill(0, map(r, low, high, 0, 100), 100);
      rect(50 + gap*i, 50 + gap*j, r, r);
    }
  }

  if (frameCount < 300) {
    capturer.capture(canvas);
  } else {
    noLoop();
    capturer.stop();
    capturer.save();
  }
}
