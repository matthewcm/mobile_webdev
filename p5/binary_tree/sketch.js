function setup() {
  // put setup code here
  createCanvas(400,400);
  background(230);
  text('I love you Katie', 10, 60);
  frameRate(60);

}

function draw() {
  // put drawing code here
  fill(20);
  background(230);

}

function Node(head, left, right){
  this.head = head;
  this.left = left || null;
  this.right = right || null;
  
  this.addItem = function (num){
    if (num <= head){
      this.left.addItem(num);
    }else{
      this.right.addItem(num);
    }
  }

  this.draw = function (){

    text(head, 200,0);
  }


}
