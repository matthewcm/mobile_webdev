let y = 200;
let x = 5;
let stepx = 2;
let stepy = 2;
function setup() {
  // any live cell with fewer than two live neighbors dies. underpopulation
  // any live cell with two or three live neighbors stay alive to next gen
  // any dead cell with exactly three live neighbors becomes a live cell. Reproduce
  //
  // put setup code here
  createCanvas(400,400);
  background(230);
  text('I love you Katie', 10, 60);
  fill(0, 102, 153, 51);
  let x = 20;
  let y = 20;
  frameRate(60);

  board = new Board();
  board.setup();

}

function draw() {
  // put drawing code here
  fill(20);
  background(230);

  board.draw();

}

function Board (){
  this.cells = [];

  this.setup = function (){
    for (let j = 0; j < 40; j ++ ){
      for(let i = 0; i < 40; i ++ ){
        this.cells.push(new Cell(i,j));
      }
    }
  }

  this.draw= function(){
    this.cells.forEach(cell => cell.draw());
  }
}

function Cell (posX, posY){
  this.size = 10;
  this.x = posX * this.size;
  this.y = posY * this.size;
  this.colour = "rgb(50,50,50)";
  this.alive = false;
  
  this.draw = function(){
    fill(this.colour);
    rect(this.x, this.y, this.size, this.size);
  }

}
