let y = 200;
let x = 5;
let stepx = 2;
let stepy = 2;
function setup() {
  // put setup code here
  createCanvas(400,400);
  background(230);
  text('I love you Katie', 10, 60);
  fill(0, 102, 153, 51);
  let x = 20;
  let y = 20;
  frameRate(60);

}

function draw() {
  // put drawing code here
  fill(20);
  background(230);
  rect(x,y, 60, 60, 50);
  text(x, 20, 20);
  text(y, 20, 50);
  if (y >= 400 -60 ){
  stepy *=-1;
  }else if (y <= 0){
    stepy*=-1;
  }
  if (x >= 400 - 60){
  stepx *= -1;
  }else if (x<=0){
  stepx *= -1;
  }
  y+= stepy;
  x+=stepx;

}
