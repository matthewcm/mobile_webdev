let y = 200;
let x = 5;
let stepx = 2;
let stepy = 2;
function setup() {
  // put setup code here
  createCanvas(400,550);
  background(230);
  text('I love you Katie', 10, 60);
  fill(0, 102, 153, 51);
  frameRate(60);
  board = new Board();
 snake = new Snake();
  food = new Cell(50,50,null, true);
  buttons = new Controls();
  buttons.addButton("LEFT");
  buttons.addButton("RIGHT");
  buttons.addButton("UP");
  buttons.addButton("DOWN");

  ticksCap = 30;
  ticks = 0;
}

function draw() {
  // put drawing code here
  // Snake can get killed by a quicj turn
  // make food get placed on board
  // speed up game
  // Add keyboard controls
  fill(20);
  background(230);

  board.draw();
  snake.draw();
  food.draw();
  buttons.draw();
  buttons.checkPressed();

  if (keyIsPressed){
    if (keyCode === LEFT_ARROW){
        snake.changeDir("LEFT");
    }else if (keyCode === RIGHT_ARROW){
        snake.changeDir("RIGHT");
    }else if (keyCode === UP_ARROW){
        snake.changeDir("UP");
    }else if (keyCode === DOWN_ARROW){
        snake.changeDir("DOWN");
    }
  }

//  text(keyboardDown, 10,10);
}
function Controls(){

this.buttons = [];

this.addButton = function(dir){
    this.buttons.push(new Button(dir));
};
this.draw = function(){
    this.buttons.forEach(button => button.draw());
};
this.checkPressed = function(){
     if (mouseIsPressed){
       this.buttons.forEach(button => {
       if (mouseX > button.x && mouseX < button.x + button.size && mouseY > button.y && mouseY < button.y + button.size){
            snake.changeDir(button.dir);
       }
         }
     );
     }
 }
}
 function Button (dir){
 this.dir = dir;
 this.size = 50;
 if (dir === "LEFT"){
    this.x = 250;
    this.y = 450;
    this.colour = "rgb(255,0,0)";
 }else  if (dir === "RIGHT"){
    this.x = 350;
    this.y = 450;
    this.colour = "rgb(255,0,0)";
 }else if (dir === "UP"){
    this.x = 300;
    this.y = 400;
    this.colour = "rgb(0,255,0)";
 } else if (dir === "DOWN"){
    this.x = 300;
    this.y = 500;
    this.colour = "rgb(0,255,0)";
 }
 this.draw = function() {
    fill(this.colour);
    rect(this.x, this.y, this.size, this.size);
 }


 }

function Board(){
    this.x = 10;
    this.y = 10;
    this.size = 380;
    this.draw = function () {
        fill(250);
        rect(this.x, this.y, this.size, this.size);
    }
}

function Snake(){
    this.x = 10;
    this.y = 10;
    this.dir = "RIGHT";
    this.fed = false;
    this.tail = [];
    this.head = new Cell(this.x, this.y);

    this.draw = function(){
        fill(27);
        text(this.tail.length, 5,10);
         if (ticks >= ticksCap){
            if ((this.head.x > 390 || this.head.x < 10) || (this.head.y > 390 || this.head.y < 10)) {
                this.head.x = 10;
                this.head.y = 10;
                this.tail = [];
            }

            this.tail.forEach(cell => {
                if (this.head.x === cell.x && this.head.y === cell.y) {
                    this.head.x = 10;
                    this.head.y = 10;
                    this.tail = [];
            }
                cell.move(this.dir);
            });

            this.head.move(this.dir);
            ticks = 0;
            this.fed = false;
            if (!this.fed  && (this.head.x == food.x) && (this.head.y == food.y)){
              if (this.tail[0] == null){
                this.tail.unshift(new Cell(1, 1, this.head));
              }else{
                  this.addCell();

              }
              food.randomMove();
              this.fed = true;
              if (ticksCap > 5){
                ticksCap --;
              }
            }
        }ticks ++;

        this.head.draw();
        this.tail.forEach(cell => {
            cell.draw();
        });

    };


     this.addCell = function(){
      this.tail.unshift(new Cell(this.x, this.y, this.tail[0]));
     };

    this.changeDir = function(dir){
        if (dir === "UP" && this.dir !== "UP" && this.dir !== "DOWN" ){
            this.dir = "UP";
        }else if (dir === "DOWN"&& this.dir !== "DOWN" && this.dir !== "UP" ){
            this.dir = "DOWN";
        }else if (dir === "LEFT"&& this.dir !== "LEFT" && this.dir !=="RIGHT" ){
            this.dir = "LEFT";
        }else if (dir === "RIGHT"&& this.dir !== "RIGHT"&& this.dir !== "LEFT" ){
            this.dir = "RIGHT";
        }
    };

}

function Cell(x,y,leader, food){
    this.x = x;
    this.y = y;
    this.size = 10;
    this.food = food;
    this.leader = leader;

    if (leader){
      this.x = leader.x;
      this.y = leader.y;
    }

    if (food) {
      this.colour = "rbg(0,255,0)";
    }else {
      this.colour = "rgb(255,230,0)";
    }

    this.draw = function() {
        fill(this.colour);
        rect(this.x, this.y, this.size, this.size);
    };

    this.randomMove = function() {
      this.x = (Math.floor(Math.random() * 38) * 10) + 10;
      this.y = (Math.floor(Math.random() * 38) * 10) + 10;
    }

    this.move = function(dir){
        if (this.leader){
           this.x = this.leader.x;
           this.y = this.leader.y;
        }
        else {
            if (dir === "UP"){
                this.y -= this.size;
            }else if (dir === "DOWN"){
                this.y += this.size;
            }else if (dir === "LEFT"){
                this.x -= this.size;
            }else if (dir === "RIGHT"){
                this.x += this.size;
            }
        }

}
}
