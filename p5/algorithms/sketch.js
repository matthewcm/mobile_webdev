let y = 200;
let x = 5;
let stepx = 2;
let stepy = 2;
function setup() {
  // put setup code here
  createCanvas(3000,1000);
  background(230);
  fill(0, 102, 153, 51);
  let x = 20;
  let y = 20;
  frameRate(30);
  arrayy  = new AlgArray([10,41,1,9,3,4,39,18,10,25,35,5,80,60,81,30,4,1,6,45]);
  arrayy.createRandom();

}

function draw() {
  // put drawing code here
  fill(20);
  background(230);
  
  arrayy.draw();
  arrayy.bubbleSortStep();

}

function AlgArray (array) {

  this.array = [...array];

  this.draw = function () {
    let lineX = 20;
    this.array.forEach(element => {
      rect(lineX, 20, 10, element*10);
      lineX += 20;
    })
  }

  this.createRandom = function() {

    for (let i = 0; i < 150; i++){
      this.array.push(Math.random() * 100);
    }
  }

  this.bubbleSortStep = function () {
    let index = 0;
    let updated = false;


    while(!updated && index !== this.array.length){

    console.log(this.array);
      if(this.array[index] > this.array[index + 1]){
        let temp = this.array[index];
        this.array[index] = this.array[index + 1];
        this.array[index + 1] = temp;
      
        updated = true;
      }

      index ++;

    }
  }
}
