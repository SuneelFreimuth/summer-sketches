const RECORDING = true;
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


}

function draw() {
  

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
