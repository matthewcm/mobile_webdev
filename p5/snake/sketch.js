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
  frameRate(60);
 snake = new Snake();
  snake.addCell();
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
  fill(20);
  background(230);

  snake.draw();
  food.draw();
  buttons.draw();
  buttons.checkPressed();

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
    this.y = 300;
    this.colour = "rgb(255,0,0)";
 }else  if (dir === "RIGHT"){
    this.x = 350;
    this.y = 300;
    this.colour = "rgb(255,0,0)";
 }else if (dir === "UP"){
    this.x = 300;
    this.y = 250;
    this.colour = "rgb(0,255,0)";
 } else if (dir === "DOWN"){
    this.x = 300;
    this.y = 350;
    this.colour = "rgb(0,255,0)";
 }
 this.draw = function() {
    fill(this.colour);
    rect(this.x, this.y, this.size, this.size);
 }


 }

function Snake(){
    this.x = 10;
    this.y = 10;
    this.dir = "RIGHT";
    this.fed = false;
    this.cells = [];



    this.draw = function(){
    fill(27);
    text(this.cells.length, 5,10);
     if (ticks >= ticksCap){
    this.cells.forEach(cell => {
            cell.move(this.dir);
        });
        ticks = 0;
        this.fed = false;
    }ticks ++;

    this.cells.forEach(cell => {
            cell.draw();
        });

        if (!this.fed  && (this.cells[this.cells.length -1].x == food.x) && (this.cells[this.cells.length - 1].y == food.y)){
          this.addCell(this.cells[0]);
          this.fed = true;
        }
    };
     this.addCell = function(leader){
      let cell = new Cell(this.x, this.y,leader);
      this.cells.unshift(cell);
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
    this.draw = function() {
        fill(59);
        rect(this.x, this.y, this.size, this.size);
    };

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
