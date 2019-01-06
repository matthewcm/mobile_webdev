function setup() {
  // put setup code here
  createCanvas(400,400);
  background(230);
  text('I love you Katie', 10, 60);
  fill(0, 102, 153, 51);
  frameRate(60);

  ball = new Ball(200,380);
  // brick = new Brick(200,100);

}

function draw() {
  // put drawing code here
  fill(20);
  background(230);
  ball.draw();
  ball.move();
  // brick.draw();

  // brick.hit(ball.x, ball.y)
  // also pass size of ball

}


function Ball (x,y){
  this.x = x;
  this.y = y;
  this.stepx = 2;
  this.stepy = 2;
  this.angle = 135;
  this.size = 10;

  this.move = function(){
    if (this.y >= 400 -this.size){
      this.stepy *=-1;
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

  this.draw = function (){
    rect(this.x, this.y,this.size,this.size,this.size );
  }
}

function Brick (x,y, durability){
  this.x = x;
  this.y = y;
  this.colour = "rgb(0,255,0)";
  this.durability = 1;
  this.width = 50;
  this.height = 20;

  this.hit = function(attacker){
    if (attacker.x >= this.x && attacker.x <= this.x + this.width && attacker.y >= this.y && attacker.y <= thisy + this.width ){


      this.durability --;
      if (this.durability === 0){
        // remove 
        this.colour = "rgb(255,255,0)";
      }
    }
  }

  this.draw = function(){
    fill(this.colour);
    rect (this.x, this.y, this.width, this.height);
  }
}
