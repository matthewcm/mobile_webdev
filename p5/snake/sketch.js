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
  ticksCap = 30;
  ticks = 0;
}

function draw() {
  // put drawing code here
  fill(20);
  background(230);
text("hi",10,10);

  snake.draw();
  food.draw();
  console.log(snake);

  if (mouseIsPressed){
  text("down",4,20);
  if (mouseX < 200&& mouseY <200 ){
  snake.changeDir("LEFT");
  }else if (mouseX > 200&& mouseY <200 ){
  snake.changeDir("RIGHT");
  }if (mouseX < 200&& mouseY >200 ){
  snake.changeDir("DOWN");
  }if (mouseX > 200&& mouseY >200 ){
  snake.changeDir("UP");
  }
  }

//  text(keyboardDown, 10,10);
}

function Snake(){
    this.x = 10;
    this.y = 10;
    this.xDir  = 1;
    this.yDir = 0;
    this.fed = false;
    this.cells = [];



    this.draw = function(){
    fill(27);
    text(this.cells.length, 5,10);
     if (ticks >= ticksCap){
    this.cells.forEach(cell => {
            cell.move(this.xDir, this.yDir);
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
        if (dir === "UP"){
            this.xDir = 0;
            this.yDir = -1;
        }else if (dir === "DOWN"){
            this.xDir = 0;
            this.yDir = +1;
        }else if (dir === "LEFT"){
            this.xDir = -1;
            this.yDir = 0;
        }else if (dir === "RIGHT"){
            this.xDir = 1;
            this.yDir = 0;
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

    this.move = function(xDir, yDir){
        if (this.leader){
           this.x = this.leader.x;
           this.y = this.leader.y;
        }
        else {
        this.x += xDir * 10;
        this.y += yDir *10;
        }

}
}
