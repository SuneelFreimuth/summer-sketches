const RECORDING = true;
const MAX_FRAMES = 1000;

let canvas;
let capturer;

let img;
let probs;

let progress;
if (RECORDING) {
  progress = document.createElement('progress');
  progress.value = 0;
  progress.max = MAX_FRAMES;
}

function preload() {
  img = loadImage('./Varunjit.jpg');
}

function setup() {
	let p5canvas = createCanvas(600, 600);
  canvas = p5canvas.canvas;

  if (RECORDING) {
    document.body.insertBefore(progress, canvas);
    capturer = new CCapture({
      format: 'webm',
      framerate: 60,
      quality: 100,
      name: "NAME"
    });
    capturer.start();
  }

  background(0);

  probs = [];
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    let grayValue = 0.3 * img.pixels[i] + 
      0.59 * img.pixels[i + 1] +
      0.11 * img.pixels[i + 2];
    // img.pixels[i] = grayValue;
    // img.pixels[i + 1] = grayValue;
    // img.pixels[i + 2] = grayValue;
    probs.push(grayValue);
  }
  img.updatePixels();
}

function draw() {
  for (let i = 0; i < 800; i++) {
    let i = Math.floor(random(probs.length));
    if (Math.random() < probs[i] / 255) {
      stroke(255, 100);
      point(i % 600, i / 600);
    }
  }
  
  if (RECORDING) {
    if (frameCount < MAX_FRAMES) {
      capturer.capture(canvas);
    } else {
      noLoop();
      capturer.stop();
      capturer.save();
      console.log("RECORDING FINISHED");
    }
    progress.value = frameCount;
  }
}
