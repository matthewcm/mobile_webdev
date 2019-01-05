let y = 200;
let x = 5;
let stepx = 2;
let stepy = 2;
function setup() {
  // put setup code here
  createCanvas(3000,1100);
  background(230);
  fill(0, 102, 153, 51);
  let x = 20;
  let y = 20;
  frameRate(30);
  arrayy  = new AlgArray();
  arrayy.createRandom();
  // left_point = 0
  // right_point = arrayy.length;
  // step = 1;
  index = 0;

}

function draw() {
  // put drawing code here
  fill(20);
  background(230);
  
  arrayy.draw();
  arrayy.bubbleSortStep();
  // arrayy.mergeSortStep(step);
  // step ++;

}

function AlgArray () {

  this.array = [];

  this.draw = function () {
    let lineX = 20;
    this.array.forEach(element => {
      rect(lineX, 20, 10, element*10);
      lineX += 20;
    })
  }

  this.createRandom = function() {

    for (let i = 0; i < 50; i++){
      this.array.push(Math.random() * 100);
    }
  }

  this.createSorted = function() {
    for (let i = 0; i < 50; i++){
      this.array.push(i * 2);
    }
  }

  this.createSortedReverse = function () {
    for (let i = 50; i > 0; i--){
      this.array.push(i * 2);
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
  

  this.insertionSort = function () {
    let updated = false;
    let pindex = index;
    console.log(this.array);
    while(!updated && pindex > 0){
      if(this.array[index] > this.array[pindex - 1]){
        let temp = this.array[index];
        this.array[index] = this.array[pindex - 1];
        this.array[index - 1] = temp;
      
        updated = true;
      }
      pindex ++;
    }

      index ++;

  }

  this.partition = function (arr, low, high) {

    let x = arr[high];
    var i = low -1;
    for (let j = low; j <= high - 1; j++){
      if (arr[j] <= x){
        i ++;
        var temp = arr[i];
        arr[i] =  arr[j];
        arr[j] = temp;
      }
    }
  }

  this.quickSort = function () {

  }

  // this.mergeSortStep = function (step) {
  //  if (step === 1){

  //   for (let i = 0 ; i < this.array.length; i++){
  //     this.array[i] = [this.array[i]];
  //   }
  //   console.log(this.array);
  //  }

  //   if (step === 2) {
  //     for (let i = left_point; i < right_point ; i++){
  //       if (this.array[left_point] <this.array[right_point]){

  //         left_point = 
  //       }
  //     }
  //   }


  // }
}
