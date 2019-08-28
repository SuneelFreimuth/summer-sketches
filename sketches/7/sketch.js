const MAX_FRAMES = 360;
const RECORDING = true;
let canvas;
let capturer;

let progress;
let timeDisplay;
let prevTime, currTime;
if (RECORDING) {
  progress = document.createElement('progress');
  progress.value = 0;
  progress.max = MAX_FRAMES;

  timeDisplay = document.createElement('p');
  timeDisplay.appendChild(document.createTextNode("0 m 0 s"));
}

let fcDisplay;

let length;
let angle;
let DEPTH_THRESHOLD = 10;
let MAX_ANGLE = 47;

function setup() {
	let p5canvas = createCanvas(600, 600);
  canvas = p5canvas.canvas;
  if (RECORDING) {
    document.body.insertBefore(progress, canvas);
    document.body.insertBefore(timeDisplay, canvas);
    capturer = new CCapture({
      format: 'webm',
      framerate: 40,
      quality: 100,
      name: "sketch7"
    });
    capturer.start();
  }

  fcDisplay = document.createElement('p');
  let textNode = document.createTextNode("New thing");
  fcDisplay.appendChild(textNode);
  document.body.appendChild(fcDisplay);

  background(0);
  angleMode(DEGREES);
  colorMode(HSB);
  prevTime = 0;
}

function draw() {
  angle = MAX_ANGLE * Math.pow(sin(frameCount / 2), 2);
  length = angle * 7;
  translate(width / 2, height);

  background(angle * 0.5);
  branch(1);

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

  fcDisplay.innerText = "Frame Count: " + frameCount;

  currTime = Date.now();
  let timeDiff = currTime - prevTime;
  let secondsLeft = timeDiff * (MAX_FRAMES - frameCount) / 1000;
  timeDisplay.innerText = `${Math.floor(secondsLeft / 60)} m ${secondsLeft % 60} s`;
  prevTime = currTime;
}

function branch(depth) {
  // draw the current branch
  stroke(150, depth**2 * (angle / MAX_ANGLE), 100, 1.0);
  strokeWeight(0.20 * angle / (0.7 * depth));
  line(0, 0, 0, -length / (2*depth));

  // translate origin to tip of branch
  translate(0, -length / (2*depth));
  
  if (depth < DEPTH_THRESHOLD) {
    // rotate plane ccw and draw a branch
    push();
    rotate(-angle);
    branch(depth + 1);
    pop();

    // rotate plane cw and draw a branch
    push();
    rotate(angle);
    branch(depth + 1);
    pop();
  }
}
