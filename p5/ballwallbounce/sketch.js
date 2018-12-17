let balls = [];

function setup() {
  // put setup code here
  createCanvas(400,400);
  background(230);
  frameRate(60);

}

function draw() {
  // put drawing code here
  fill(20);
  background(230);



  balls.forEach(ball => ball.draw());

}

function Ball(xcoord, ycoord){
this.size = 30;
this.xcoord = xcoord;
this.ycoord = ycoord;
this.stepRandomx = random(2);
this.stepRandomy = random(2);
if (this.stepRandomx >= 1){
 this.stepx= 2;

}else {
this.stepx = -2;
}if (this.stepRandomy >= 1){
 this.stepy=2;

}else {
this.stepy = -2;
}
this.r = random(255);
this.g = random(255);
this.b = random(255);
this.draw = function () {
text(this.stepRandom, 10,10);
 fill(this.r,this.g,this.b);
 rect(this.xcoord, this.ycoord, this.size, this.size, this.size);

 if (this.ycoord >= 400 -this.size ){
  this.stepy *=-1;
  }else if (this.ycoord <= 0){
    this.stepy*=-1;
  }
  if (this.xcoord >= 400 - this.size){
  this.stepx *= -1;
  }else if (this.xcoord<=0){
  this.stepx *= -1;
  }
  this.ycoord+= this.stepy;
  this.xcoord+=this.stepx;

}

}
 function touchEnded(){
  balls.push(new Ball(mouseX, mouseY));
  }
