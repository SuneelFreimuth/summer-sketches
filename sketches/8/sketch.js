const MAX_FRAMES = 1000;
const RECORDING = false;
let canvas;
let capturer;

let progress;
if (RECORDING) {
  progress = document.createElement('progress');
  progress.value = 0;
  progress.max = MAX_FRAMES;
}

let x, y;
let wiggleRange = 4;
let flashInterval = 125;
let flashTime = 15;
let margin = 100;

let bodyImg;
let faceImg;

function preload() {
  bodyImg = loadImage('busquivious_body.png');
  faceImg = loadImage('busquivious_face.png');
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
      name: "busquivious"
    });
    capturer.start();
  }

  background(0);
  x = 200;
  y = 200;
}

function draw() {
  if (frameCount % flashInterval > flashInterval - flashTime && 
    frameCount % flashInterval < flashInterval) 
  {
    background(random(255), random(255), random(255));
  } else {
    background(0);
  }

  if (frameCount % flashInterval == 0) {
    x = 100 + random(margin, width - margin);
    y = 100 + random(margin, height - margin);
  }

  drawCat(x + random(-wiggleRange, wiggleRange), y + random(-wiggleRange, wiggleRange));
  // stroke(255, 0, 0);
  // strokeWeight(4);
  // point(x, y);

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

function drawCat(x, y) {
  noStroke();
  fill(255);
  push();
  translate(x - bodyImg.width / 2, y - bodyImg.height / 2);
  scale(0.5);
  image(bodyImg, 0, 0);
  let faceWiggle = 2;
  image(faceImg, 50 + random(-faceWiggle, faceWiggle), 63 + random(-faceWiggle, faceWiggle));
  pop();
}
