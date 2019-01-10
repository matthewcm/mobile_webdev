// improve collision detect
//
// calculate distance between two circle centers.
// if that answer is smaller than radiuss then collision is made.
//
function setup() {

  // put setup code here
  createCanvas(400,400);
  background(230);
  text('I love you Katie', 10, 60);
  fill(0, 102, 153, 51);
  ellipseMode(RADIUS);
  frameRate(60);
  

  paddle = new Paddle();
  ball = new Ball();

  board = new Board();
  board.setup();
  angleLine = new AngleLine();
}

function draw() {
  // put drawing code here
  fill(20);
  background(230);
  paddle.draw();
  paddle.move();
  board.draw();
  ball.draw();
  ball.setup();
  ball.move();


  board.checkHits();

  if (ball.start){
    angleLine.draw();

  }
  paddle.hit(ball);
  // also pass size of ball

}

function Board (){
  this.bricks = []; 
  this.draw = function(){
    fill(198);
    rect(0,0,400,400);
  }

  this.setup = function (){
    for(let j =0 ; j < 3 ; j++){

      for(let i = 0; i < 400; i += 50){

        this.bricks.push( new Brick(i ,j * 20,1));
      }
    }
  }
  this.draw = function(){
    text("new ball: "+ ball.start, 20, 350);
    this.bricks.forEach(brick => {
      brick.draw();
    });
  }

  this.checkHits = function (){
    this.bricks.forEach(brick => {
      brick.hit(ball);
    });
  }

}

function AngleLine (){
  this.y = 380;
  this.angle = PI / 2;
  this.spinSpeed = 0.055;

  this.draw = function (){
    this.angle += this.spinSpeed;;
    if(this.angle > PI || this.angle < 0){
      this.spinSpeed *= -1;
    }

    let y2 = this.y -( sin(this.angle) * 20);
    let x2 = paddle.middle() - (cos(this.angle) * 20);
    //sohcahtoa
    line(paddle.middle(), this.y, x2, y2);
  }
}

function Paddle (){
  this.x = 200;
  this.y = 460 ;
  this.width = 80;
  this.height = 5;

  this.move = function (){
    if (mouseIsPressed){
      this.x = mouseX;
    }
  }

  this.middle = function (){
    return (this.x );
  }



  this.draw = function (){
    fill (130);
    ellipse(this.x, this.y, this.width, this.width);
  }
  this.hit = function (attacker){

    let x_dist = abs(attacker.x - this.x);
    let y_dist = abs(attacker.y - this.y);

    let mag = (attacker.x - this.x)/x_dist;

    let dist = sqrt(pow(x_dist , 2) + pow(y_dist ,2));

    let c_dist = this.width + attacker.size;

    text(dist, 20, 270);
    text(c_dist , 20, 280);

    // if dist is greater than cdist. there is collision
    // calc angle of rebound
    if (dist <= c_dist){
      attacker.bounce(atan(y_dist/x_dist), mag);
    }
  }

}
function Ball (){
  this.x = paddle.middle();
  this.y = paddle.y - 5;
  this.stepx = 0;
  this.stepy = 0;
  this.angle = 135;
  this.size = 5;
  this.start = true;

  this.move = function(){
    if (this.y >= 400 -this.size){
      this.stepy =0;
      this.stepx = 0;
      this.x = 195;
      this.y = 370;
      this.start = true;
      // Dead ball
    }else if (this.y <= 0){
      this.stepy*=-1;
    }
    if (this.x >= 400 - this.size){
      this.stepx *= -1;
    }else if (this.x<=0){
      this.stepx *= -1;
    }
    this.y+= this.stepy;
    this.x+=this.stepx;
  }
  this.bounce = function(angle, mag){
    this.stepy = - sin(angle) * 6;
    this.stepx = mag * cos(angle) * 6;
  }

  this.draw = function (){

    text(ball.angle , 20, 250);
    fill(55);
    ellipse(this.x, this.y,this.size,this.size);
  }
    this.setup = function(){

      if( this.start){
        this.x = paddle.middle() ;
      }
    }

  
}

function Brick (x,y, durability){
  this.x = x;
  this.y = y;
  this.colour = "rgb(255,255,0)";
  this.durability = 1;
  this.width = 50;
  this.height = 20;

  this.hit = function(attacker){
  
    let c_dist = attacker.size;
    // left 
    let in_left = abs(attacker.x - this.x) <= c_dist;
    let in_right = abs(attacker.x - (this.x + this.width)) <= c_dist;
    let in_top = abs(attacker.y - this.y) <= c_dist;
    let in_bottom = abs(attacker.y  - (this.y + this.height)) <= c_dist;

    let in_width = attacker.x > this.x && attacker.x < this.x + this.width;
    let in_height = attacker.y > this.y && attacker.y < this.y + this.height;



    if ((in_bottom || in_top)  && (in_width)) {
      attacker.stepy *= -1;
    this.durability --;
    }
    else if ((in_left|| in_right) && (in_height)){
      attacker.stepy *= -1;
    this.durability --;
    }
    

    if (this.durability === 1){

      this.colour = "rgb(255,255,0)";
    }
    else{

      this.colour = "rgb(0,55,255)";
    }
    if (this.durability === 0){
      this.x = -100;
      this.y = -100;
    }
  }

  this.draw = function(){
    fill(this.colour);
    rect (this.x, this.y, this.width, this.height);
  }
}

function mouseReleased() {
  if (ball.start){
    ball.stepy = - sin(angleLine.angle) * 6;
    ball.stepx = -cos(angleLine.angle) * 6;
    ball.start = false;

  }
  return false;
}


