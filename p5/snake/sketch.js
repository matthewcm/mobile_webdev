let y = 200;
let x = 5;
let stepx = 2;
let stepy = 2;
function setup() {
    // put setup code here
    // splash screen
    // game over message ( in a function )
    // refactor draw function in snake
    // obsticles
    // extra food
    // food ahould have eaten function
    createCanvas(400,550);
    background(230);
    text('I love you Katie', 10, 60);
    fill(0, 102, 153, 51);
    frameRate(60);
    board = new Board();
    snake = new Snake();
    snake.addCell();

    buttons = new Controls();

    board.addSnake(10,10);
    board.addFood(30,30);
    board.addFood(50,30);
    board.addObstacle(60,30);
    board.addObstacle(70,30);
    board.addObstacle(80,30);
    board.addObstacle(90,30);
    board.addObstacle(90,20);
    board.addObstacle(90,40);
    board.addObstacle(80,40);
    board.addObstacle(80,50);
    board.addObstacle(80,60);

    buttons.addButton("LEFT");
    buttons.addButton("RIGHT");
    buttons.addButton("UP");
    buttons.addButton("DOWN");

    ticksCap = 30;
    ticks = 0;
}

function draw() {
    // put drawing code here
    // speed up game
    fill(20);
    background(230);
    // refactor checks
    board.draw();
    board.checkFoods();
    board.checkObstacle();
    buttons.draw();
    buttons.checkPressed();
    // place in controls function. refactor name
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
            });
        }

        if (keyIsPressed){
            console.log(keyCode); 
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
    this.gameEntities = [];
    this.obstacleEntities = [];
    this.foodEntities = [];
    this.draw = function () {
        fill(250);
        rect(this.x, this.y, this.size, this.size);

        this.gameEntities.forEach(entity => entity.draw());
    }

    this.addObstacle = function (x, y) {
        let newObstacle = new Obstacle(x,y);
        this.gameEntities.push(newObstacle);
        this.obstacleEntities.push(newObstacle);
    }

    this.addFood = function (x, y){
        let newFood = new Food(x,y);
        this.gameEntities.push(newFood);
        this.foodEntities.push(newFood);
    }

    this.addSnake = function(x,y){
        snake = new Snake(x,y);
        this.gameEntities.push(snake);
    }
// Should be using Object Methods
    this.checkFoods = function () {
        this.foodEntities.forEach(food => {
            if (!snake.fed  && (snake.head.x == food.x) && (snake.head.y == food.y)){
                snake.addCell();
                food.randomMove();
                snake.fed = true;
            }
        });
    }
        this.checkObstacle = function () {
            this.obstacleEntities.forEach(obstacle => {
                if ((snake.head.x == obstacle.x) && (snake.head.y == obstacle.y)){
                    snake.die();
                }
            });
        }
    
}

function Snake(x,y){
    this.x = x;
    this.y = y;
    this.dir = "RIGHT";
    this.desiredDir = "RIGHT";
    this.fed = false;
    this.tail = [];
    this.head = new SnakeHeadCell(this.x, this.y);

    this.draw = function(){
        fill(27);
        text(this.tail.length, 5,10);
        if (ticks >= ticksCap){
            this.dir = this.desiredDir;
            if ((this.head.x > 390 || this.head.x < 10) || (this.head.y > 390 || this.head.y < 10)) {
                this.die();
            }

            this.tail.forEach(cell=>cell.move() );

            this.head.move(this.dir);

            this.head.draw();
            this.tail.forEach(cell => {
                cell.draw();
            });

            this.tail.forEach(cell => {
                if (this.head.x === cell.x && this.head.y === cell.y) {
                    this.die();
                }
            });
            ticks = 0;
            this.fed = false;
            
        }ticks ++;

        this.head.draw();
        this.tail.forEach(cell => {
            cell.draw();
        });

    };

    this.die = function(){
        this.head.x = 10;
        this.head.y = 10;
        this.tail = [];
        this.desiredDir = "RIGHT";
        this.dir = "RIGHT";
    }


    this.addCell = function(){
        if (this.tail[0] == null){
            this.tail.unshift(new SnakeTailCell(this.head));
        }else{
            this.tail.unshift(new SnakeTailCell(this.tail[0]));
        }
    };

    this.changeDir = function(dir){
        if (dir === "UP" && this.dir !== "UP" && this.dir !== "DOWN" ){
            this.desiredDir = "UP";
        }else if (dir === "DOWN"&& this.dir !== "DOWN" && this.dir !== "UP" ){
            this.desiredDir = "DOWN";
        }else if (dir === "LEFT"&& this.dir !== "LEFT" && this.dir !=="RIGHT" ){
            this.desiredDir = "LEFT";
        }else if (dir === "RIGHT"&& this.dir !== "RIGHT"&& this.dir !== "LEFT" ){
            this.desiredDir = "RIGHT";
        }
    };

}

function Cell(x,y,leader, food){
    // moved
    this.x = x;
    this.y = y;
    this.size = 10;
    this.colour = "rgb(255,230,0)";

    this.draw = function() {
        fill(this.colour);
        rect(this.x, this.y, this.size, this.size);
    };

}
function FieldCell(x,y) {
    Cell.call(this, x , y);

    this.colour = "rgb(0,0,0)";
    this.isTouched = function (snakeHead) {
        if (snakeHead.x === this.x && snakeHead.y === this.y){
            return true;
        }
        return false;
    }
}
function Food(x,y){

    FieldCell.call(this, x,y);
    this.colour = "rgb(0,255,0)";
    this.randomMove = function() {
        console.log("move time");
        this.x = (Math.floor(Math.random() * 38) * 10) + 10;
        this.y = (Math.floor(Math.random() * 38) * 10) + 10;
    }

    this.isEaten = function(snakeHead){
        if (this.isTouched(snakeHead)){
            this.randomMove();
            return true;
        }
        return false;
    }
}

function Obstacle(x,y){
    FieldCell.call(this, x, y);
    // is touched game over
}

function SnakeTailCell(leader){
    Obstacle.call(this, leader.x, leader.y);
    this.colour = 'rgb(250,150,0)';
    this.leader = leader;
    this.move = function(){
        this.x = this.leader.x;
        this.y = this.leader.y;
    }
    // When moved change to leader pos
}
function SnakeHeadCell(x,y){
    Cell.call(this, x, y);
    this.move = function(dir){
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

