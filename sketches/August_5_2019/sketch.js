let canvas;
let capturer;

let points = [];
let threshold = 25;
let numPoints = 30;
let hue = 180;

function setup() {
	let p5canvas = createCanvas(600, 600);
  canvas = p5canvas.canvas;
  for (let i = 0; i < numPoints; i++) {
    points.push([width * noise(frameCount * 0.01 + i), 
      height * noise(frameCount * 0.01 + i + 10000)]);
  }
  colorMode(HSB);
  capturer = new CCapture({
    format: 'webm',
    framerate: 30,
    quality: 100,
    name: "Vertices.webm"
  });
  capturer.start();
}

function draw() {
  background(0);
  for (let i = 0; i < numPoints; i++) {
    let others = points.filter(pt => pt[0] != points[i][0] || pt[1] != points[i][1]);
    strokeWeight(1);
    for (let pt of others) {
      stroke(
        hue,
        100,
        map(1 / dist(points[i][0], points[i][1], pt[0], pt[1]), 
        0, 1, 
        0, threshold*100),
      );
      line(points[i][0], points[i][1], pt[0], pt[1]);
    }
    points[i] = [width * noise(frameCount * 0.01 + 50*i), 
      height * noise(frameCount * 0.01 + 50*i + 10000)];
  }
  strokeWeight(3);
  stroke(hue, 100, 50);
  for (let pt of points) {
    point(pt[0], pt[1]);
  }

  if (frameCount < 300) {
    capturer.capture(canvas);
  } else {
    noLoop();
    capturer.stop();
    capturer.save();
  }
}
