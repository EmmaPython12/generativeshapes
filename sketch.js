// This code takes an image with dimensions of 768 x 1152, gets the pixels, converts them to shapes, and then fills the canvas - now resized to the original image - with circles.
// The code ensures that the image is properly loaded first.  If it isn't, then it throws an image error.  

let img;
let circles = [];
let imageLoaded = false;

function preload() {
  img = loadImage("face1.jpg", onImageLoad, onImageLoadError);
}

function onImageLoad() {
  imageLoaded = true;
}

function onImageLoadError(err) {
  imageLoaded = false;
  console.error("Image not loaded:", err);
}

function setup() {
  if (imageLoaded) {
    createCanvas(800, 800);
    pixelDensity(1);

    img.resize(768, 1152); // Resize the image to match the canvas dimensions
    img.loadPixels();

    generateShapesFromImage();
    rearrangeShapes();
  } else {
    createCanvas(400, 100);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Image not loaded. Please check the file path.", width / 2, height / 2);
  }
}

function generateShapesFromImage() {
  // noprotect
	for (let x = 0; x < img.width; x += 5) {
    for (let y = 0; y < img.height; y += 5) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let brightness = (r + g + b) / 3;

      let size = map(brightness, 0, 255, 3, 15);

      // Declare and initialize the color variable using the p5.js color function
      let circleColor = color(r, g, b, 150);

      circles.push(new Circle(x, y, size, circleColor));
    }
  }
}

function rearrangeShapes() {
  for (let i = 0; i < circles.length; i++) {
    let newX = random(width);
    let newY = random(height);
    circles[i].setPosition(newX, newY);
  }
}

function draw() {
  background(240);

  // Draw circles on the canvas
  for (let i = 0; i < circles.length; i++) {
    circles[i].display();
  }
}

class Circle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  setPosition(newX, newY) {
    this.x = newX;
    this.y = newY;
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}
