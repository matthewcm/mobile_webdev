function setup() {
  // put setup code here
  createCanvas(400,400);
  background(230);
  text('I love you Katie', 10, 60);
  fill(0, 102, 153, 51);
  frameRate(60);

  ball = new Ball(180,360);

  board = new Board();
 board.setup();
  paddle = new Paddle();
}

function draw() {
  // put drawing code here
  fill(20);
  background(230);
   board.draw();
  ball.draw();
  ball.move();

  board.checkHits();

  paddle.draw();
  paddle.move();
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

function Paddle (){
  this.x = 160;
  this.y = 400 - 20;
  this.width = 80;
  this.height = 5;

  this.move = function (){
    if (mouseIsPressed){
      this.x = mouseX;;
    }
  }



  this.draw = function (){
    fill (130);
    rect(this.x, this.y, this.width, this.y);
  }
  this.hit = function (attacker){

  if (((attacker.x + attacker.size >= this.x  &&
      attacker.x + attacker.size <= this.x + 5 ) ||
      ( attacker.x <= this.x + this.width && attacker.x >= this.x + this.width - 5)) &&
      (attacker.y <= this.y + this.height && 
      attacker.y  >= this.y)){
        attacker.stepx *= -1;
      }
       else if (attacker.x + attacker.size >= this.x  && attacker.x <= this.x + this.width &&(( attacker.y >= this.y + this.height - 5 && attacker.y <= this.y + this.height) || ( attacker.y + attacker.size >= this.y&& attacker.y + attacker.size <= this.y + 5))){
        attacker.stepy *= -1;
       }
  }
}
function Ball (x,y){
  this.x = x;
  this.y = y;
  this.stepx = 8;
  this.stepy = 8;
  this.angle = 135;
  this.size = 10;

  this.move = function(){
    if (this.y >= 400 -this.size){
      this.stepy =-8;
      this.x = 195;
      this.y = 370;
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
  this.bounce = function(){
    this.stepy *= -1;
  }

  this.draw = function (){
    fill(55);
    rect(this.x, this.y,this.size,this.size,this.size );
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
 // left
 text(attacker.y);
      if (((attacker.x + attacker.size >= this.x  &&
      attacker.x + attacker.size <= this.x + 5 ) ||
      ( attacker.x <= this.x + this.width && attacker.x >= this.x + this.width - 5)) &&
      (attacker.y <= this.y + this.height && 
      attacker.y  >= this.y)){
        attacker.stepx *= -1;
      }
       else if (attacker.x + attacker.size >= this.x  && attacker.x <= this.x + this.width &&(( attacker.y >= this.y + this.height - 5 && attacker.y <= this.y + this.height) || ( attacker.y + attacker.size >= this.y&& attacker.y + attacker.size <= this.y + 5))){
        attacker.stepy *= -1;
       }
    else {
      return -1;
    }

      this.durability --;
        // remove 

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
