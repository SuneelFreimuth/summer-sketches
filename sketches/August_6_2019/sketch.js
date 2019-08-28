let canvas;
let capturer;

let particles = [];
let all = [];

let scale = 6.5;
let amp = 0.010;
let spread = 4.0;

let centerHue = Math.random() * 360;
let hueRange = 150;

let s = 10;
let B = 8.0/3;
let r = 28;

let maxRotSpeed = 0.05;
let minRotSpeed = 0.01;
let rotSpeedChangeAmp = (maxRotSpeed - minRotSpeed) / 2;

function setup() {
	let p5canvas = createCanvas(600, 600, WEBGL);
  canvas = p5canvas.canvas;
  background(0);
  colorMode(HSL);
  for (let i = 0; i < 20; i++) {
    particles[i] = {
      x: random(-spread, spread),
      y: random(-spread, spread),
      z: random(-spread, spread),
      color: color((random(hueRange) + centerHue) % 360, 100, 50)
    };
  }
  noStroke();
  capturer = new CCapture({
    format: 'webm',
    framerate: 30,
    quality: 100,
    name: "Lorenz Attractor"
  });
  capturer.start();

}

function draw() {
  background(0);
  for (let part of particles) {
    let xstep = amp * s * (part.y - part.x);
    let ystep = amp * (part.x * (r - part.z) - part.y);
    let zstep = amp * (part.x * part.y - B * part.z);
    part.x += xstep;
    part.y += ystep;
    part.z += zstep;
    all.push(Object.assign({}, part));
  }
  for (let part of all) {
    push();
    rotateY(2/3 * frameCount * 0.01 + 2/3 * sin(frameCount * 0.01));
    translate(0, 0, -175);
    translate(scale * part.x, scale * part.y, scale * part.z);
    fill(part.color);
    sphere(2);
    pop();
  }
  
  if (frameCount % 2 == 0) {
  if (frameCount < 2000) {
    capturer.capture(canvas);
  } else {
    noLoop();
    capturer.stop();
    capturer.save();
  }
  }
}
