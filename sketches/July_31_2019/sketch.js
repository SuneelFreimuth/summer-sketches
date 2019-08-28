let p = 28;
let s = 10;
let B = 8.0 / 3;
let amp = 0.01;
let scale = 5.0;

let trace = {
  x: Math.random() * 200,
  y: 99,
  z: 85
};

let traces = [];
traces.push(trace);

let canvas;

function setup() {
  let p5canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas = p5canvas.canvas;
  background(0);
  noStroke();
}

function draw() {
  for (let t of traces) {
    traces[0].x += amp * (s * (trace.y - trace.x));
    traces[0].y += amp * (trace.x * (p - trace.z) - trace.y);
    traces[0].z += amp * (trace.x * trace.y - B * trace.z);
  }
  push();
  translate(scale * traces[0].x, scale * traces[0].y, scale * traces[0].z);
  sphere(2);
  pop();
}
