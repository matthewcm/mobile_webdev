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
  frameRate(5);

  timer =  35;

  ticks = 0;

  board = new Board();
  board.setup();

}

function draw() {
  // put drawing code here
  fill(20);
  background(230);

  board.draw();

    if (ticks > timer){
      board.calculateNeighbors();
      board.game();
      ticks = 0;
      timer = 3;
    }
  ticks ++;

  fill(255);
  text(ticks, 20, 150);

}

function Board (){
  this.cells = [];

  this.setup = function (){
    for (let j = 0; j < 40; j ++ ){
      this.cells.push([]);
      for(let i = 0; i < 40; i ++ ){
        this.cells[j].push(new Cell(i,j));
      }
    }
  }

  this.draw= function(){
    this.cells.forEach(cellRow => {
      cellRow.forEach(cell => cell.draw());
    });
  };

  this.calculateNeighbors = function (){

    for (let j = 1; j < 39; j ++ ){
      for(let i = 1; i < 39; i ++ ){
        let neighbors = 0;
        fill(255);
        if (this.cells[j][i].alive){

        
        text(this.cells[j][i].alive, 20, 300);
        }
        if ( j > 0 &&this.cells[j-1][i].alive ){
          neighbors ++;
        }
        if ( j < 40 &&this.cells[j+1][i].alive ){
          neighbors ++;
        }
        if ( i < 40 &&this.cells[j][i + 1].alive ){
          neighbors ++;
        }
        if ( i > 0 &&this.cells[j][i - 1].alive ){
          neighbors ++;
        }
        if ( j > 0 && i > 0&& this.cells[j-1][i - 1].alive ){
          neighbors ++;
        }
        if ( j > 0 && i < 40 &&this.cells[j-1][i + 1].alive ){
          neighbors ++;
        }
        if ( j < 40 && i > 0 &&this.cells[j+1][i-1].alive ){
          neighbors ++;
        }
        if ( j < 40 && i < 40 &&this.cells[j+1][i+1].alive ){
          neighbors ++;
        }
        textSize(30);
        text(neighbors, 20, 100);
        textSize(10);
        this.cells[j][i].neighbors = neighbors;
        
        // can do this at setup. saving who are neighbors in Cell for faster
      }
    }
  }

  this.game = function (){

    this.cells.forEach(cellRow => {
      cellRow.forEach(cell =>{
        if (cell.neighbors < 2){
          cell.alive = false;
        }else if (cell.neighbors < 4){
          cell.alive = true;
        }else{
          cell.alive = false;
        }
      });
    });
  }

  this.pressed = function(){
    this.cells.forEach(cellRow => {
      cellRow.forEach(cell => cell.checkPressed());
    });
  };
}

function Cell (posX, posY){
  this.size = 10;
  this.x = posX * this.size;
  this.y = posY * this.size;
  this.colour = "rgb(50,50,50)";
  this.alive = false;
  this.neighbors = 0;

  this.draw = function(){
    if (!this.alive){

      this.colour = "rgb(50,50,50)";
    }
    else{

      this.colour = "rgb(250,220,50)";
    }

    fill("rgb(0,255,255)");
    text(this.neighbors, this.x, this.y);
    fill(this.colour);
    rect(this.x, this.y, this.size, this.size);
  }

  this.checkPressed = function(){
    if (mouseX > this.x && mouseX < this.x + this.size && mouseY > this.y && mouseY < this.y + this.size){
      this.alive = true;
    }
  }
}

  function mouseReleased(){
    board.pressed();

  }
