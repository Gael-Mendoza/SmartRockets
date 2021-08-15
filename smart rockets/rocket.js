function addSecond(rocketObject) {
  rocketObject.currentTime++;
}

function Rocket(dna) {

  if (dna) {
    this.dna = dna
  }
  else {
    this.dna = new DNA();
  }

  this.currentFrames = 0;

  this.position = createVector(width / 2, height - 10);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector();
  this.randomColor = [random(500), random(500), random(500)];

  this.fitness = 0;
  this.reachedTarget = false;
  this.hitObstacle = false;
  //this.rocketTimer = setInterval(function(){this.currentTime++}, 1);

  this.applyForce = function (force) {
    this.acceleration.add(force);

  }

  this.checkCollision = function () {
    // check if hit borders
    if (this.position.x > width || this.position.x < 0 || this.position.y > height || this.position.y < 0) {
      this.hitObstacle = true;
    }
    // check if rocket has hit any obstacles
    for (let index = 0; index < obstacles.length; index++) {
      if (this.position.y > obstacles[index].y && this.position.y < obstacles[index].y + obstacles[index].height) {
        if (this.position.x > obstacles[index].x && this.position.x < obstacles[index].x + obstacles[index].width) {
          this.hitObstacle = true;
        }
      }
    }
  }
  this.update = function () {
    if (dist(this.position.x, this.position.y, target.x, target.y) < 25) {
      this.reachedTarget = true;
      this.position = target.copy();
    }

    this.checkCollision();

    if (this.reachedTarget == false && this.hitObstacle == false) {
      this.currentFrames++;
      this.applyForce(this.dna.genes[count]);

      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  }


  this.show = function () {
    push();
    translate(this.position.x, this.position.y);

    rotate(this.velocity.heading());

    noFill();
    stroke(this.randomColor);
    rectMode(CENTER);
    rect(0, 0, 20, 5);
    pop();
  }
  this.calculateFitness = function () {
    var distance = dist(this.position.x, this.position.y, target.x, target.y);
    var mapValue = map(distance, 0, width, width, 0);
    this.fitness = pow(2, mapValue / 100);
    if (this.hitObstacle) {
      this.fitness /= 100;
    }
    if (this.reachedTarget) {
      this.fitness = (this.fitness / this.currentFrames) * 2000;
    }
  }
}
