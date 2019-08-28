let num = 100;
let length = 500;
let dilation = 20;
const RECORDING = true;

let canvas;
let capturer;

function setup() {
	let p5canvas = createCanvas(600, 600);
  canvas = p5canvas.canvas;

  if (RECORDING) {
    capturer = new CCapture({
      format: 'webm',
      framerate: 60,
      quality: 100,
      name: "Iris"
    });
    capturer.start();
  }
  colorMode(HSL);
}

function draw() {
  background(0);
  translate(width/2, height/2);
  for (let i = 0; i < num; i++) {
    push();
    if (i % 2 == 0) {
      rotate(TWO_PI * i / num + frameCount * 0.001);
    } else {
      rotate(TWO_PI * i / num - frameCount * 0.001);
    }
    stroke(i / num * 360, 100, 50);
    line(-length / 2, -dilation, length / 2, -dilation);
    pop();
  }

  if (RECORDING) {
    if (frameCount < 1000) {
      capturer.capture(canvas);
    } else {
      noLoop();
      capturer.stop();
      capturer.save();
    }
  }
}
