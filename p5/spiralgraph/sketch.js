let y = 200;
let angle = 90;
let x = 200;
function setup() {
  // put setup code here
  createCanvas(400,400);
  text('I love you Katie', 10, 60);
  background(230);
  fill(0, 102, 153, 51);
  frameRate(65);
  angleMode(DEGREES);

}

function draw() {
  // put drawing code here7
  let colour = 0;
  // text(sin(angle), 20, 150);
  fill(colour);
  colour ++;

  if (angle < 600){

  x += 3 *(  (sin(angle)));
  y += cos( 4*angle);
  rect(y,x, 10, 10, 50);
  }
  else {


  x += 3 *(  (sin(angle)));
  y += cos( 4*angle);
  rect(x,y, 10, 10, 50);
  }

  angle ++;

}
