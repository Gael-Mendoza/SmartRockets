var population;
var lifeSpan = 250;
var count = 0;
var target;
var generationNumber = 0;
var currentMaxFit = 0;

var obstacles = [];


var speedMultiplier = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  population = new Population();
  target = createVector(width / 2, 50);
 
  obstacles.push(new Obstacle(0, height / 2, 900, 20));
  obstacles.push(new Obstacle(width - 900, height / 2, 900, 20));
  //obstacles.push(new Obstacle(width / 2 - 375, height / 2, 750, 20));
}

function draw() {
  for (let index = 0; index < speedMultiplier; index++) {
    background(0);
    population.run();
    count++;
  
    renderText();
    renderObstacles();

    // reset generation once it reaches it's life span
    if (count == lifeSpan) {
      population.evaluate();
      currentMaxFit = population.maxfit;
      population.selection();
      generationNumber++;
      count = 0;
    }
    //render target
    ellipse(target.x, target.y, 20, 20)
  }
 
}
function renderText(){
  push();
  
  stroke(255);
  strokeWeight(0.25);
  textSize(50);

  textAlign(LEFT, TOP);
  noFill();


  text("gen: " + generationNumber, 10, 60, width);

  textAlign(RIGHT, CENTER);
  text("max fit: " + floor(currentMaxFit), 10, 60, width);

  pop();
}
function renderObstacles(){
  for (let index = 0; index < obstacles.length; index++) {
    obstacles[index].show();
  }
}
