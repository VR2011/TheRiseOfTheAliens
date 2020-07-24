const {Engine, World, Bodies} = Matter;

var gameState = "start";
var img;
var titleSong;
var gameSong;
var titleX;
var health = [];
var health0, health1, health2, health3, health4, health5, health6;
var healthState;
var rocket;
var num;

function preload() {
  img = loadImage('Images/Title.png');
  rocket = loadImage('Images/rocket.png');
  health0 = loadImage('Images/Health-0.png');
  health1 = loadImage('Images/Health-0.5.png');
  health2 = loadImage('Images/Health-1.png');
  health3 = loadImage('Images/Health-1.5.png');
  health4 = loadImage('Images/Health-2.png');
  health5 = loadImage('Images/Health-2.5.png');
  health6 = loadImage('Images/Health-3.png');

  titleSong = loadSound('sounds/New Hope.wav');
  playSong = loadSound('sounds/Chiptronical.wav');

  health = [health0, health1, health2, health3, health4, health5, health6];

}

function setup() {
  engine = Engine.create();
  world = engine.world;
  createCanvas(1200,800);
  ground = new Ground(600, 790, 1250, 20);
  ground2 = new Ground(600, 750, 1250, 30);
  player = new Player(20, 600, 50, 131.25);
  wallLeft = new Ground(0, 400, 10, 800);
  wallRight = new Ground(1200, 400, 10, 800);
  alien1a = new Alien1(680, 650, 22, 120);
  alien1b = new Alien1(700, 650, 22, 120);
  alien1c = new Alien1(720, 650, 22, 120);
  imageMode(CENTER);
  titleX = -600;
}

function draw() {
  Engine.update(engine);
  background('#87ceeb');
  if (gameState === 'start') {
    textSize(50);
    fill('black');
    noStroke();
    text('Press Enter to Start', 400, 400);
  }
  if (gameState === 'title') {
    titleX += 10;
    if (titleX >= 1800) {
      titleX = -600;
    }
    image(img, titleX, 250, 1200, 800);
    textSize(50);
    fill('black');
    noStroke();
    text('Press Enter to Start', 400, 650);

    textSize(20);
    fill('grey');
    noStroke();
    text('All music from "https://patrickdearteaga.com"', 20, 780);
  }
  if (gameState === 'level1') {
    titleSong.stop(); 
    ground.display();
    player.display();
    alien1a.display();
    alien1b.display();
    alien1c.display();
    image(health6, 100, 100, 100, 100);
    if (isTouching(player, alien1a) || isTouching(player, alien1b) || isTouching(player, alien1c)) {
      image(health5, 100, 100, 100, 100);
    }
    drawSprites();

    if (frameCount % 25 === 0) {
      if (alien1a.body.position.x > player.body.position.x) {
        Matter.Body.applyForce(alien1a.body, alien1a.body.position, {x:-40, y:-0});
      }
      if (alien1a.body.position.x < player.body.position.x) {
        Matter.Body.applyForce(alien1a.body, alien1a.body.position, {x:40, y:-0});
      }
      if (alien1b.body.position.x > player.body.position.x) {
        Matter.Body.applyForce(alien1b.body, alien1b.body.position, {x:-40, y:-0});
      }
      if (alien1b.body.position.x < player.body.position.x) {
        Matter.Body.applyForce(alien1b.body, alien1b.body.position, {x:40, y:-0});
      }
      if (alien1c.body.position.x > player.body.position.x) {
        Matter.Body.applyForce(alien1c.body, alien1c.body.position, {x:-40, y:-0});
      }
      if (alien1c.body.position.x < player.body.position.x) {
        Matter.Body.applyForce(alien1c.body, alien1c.body.position, {x:40, y:-0});
      }
    }
  }
  if (player.body.position.y > 750) {
    Matter.Body.applyForce(player.body, player.body.position, {x:0, y:-40});
  }
  num = 0;
  if (alien1a.body.position.x === player.body.position.x - 10) {
      num += 1;
      text(num, 100, 100);
  }
}

function keyPressed() {
  if (keyCode === 13) {
    if (gameState === 'start') {
      gameState = 'title';
      titleSong.loop();
    }
    else if (gameState === 'title') {
      gameState = 'level1';
      titleSong.stop();
      playSong.loop();
    }
  }
  if (player.body.position.y >=665) {
    if (keyCode === 32) {
      Matter.Body.applyForce(player.body,player.body.position,{x:0,y:-85}); 
    }
  }
  if (keyCode === RIGHT_ARROW) {
    Matter.Body.applyForce(player.body,player.body.position,{x:85,y:0}); 
  }
  if (keyCode === LEFT_ARROW) {
    Matter.Body.applyForce(player.body,player.body.position,{x:-85,y:0}); 
  }
  if (keyCode === DOWN_ARROW) {
    Matter.Body.applyForce(player.body,player.body.position,{x:0,y:85}); 
  }
}

function isTouching(object1, object2){
  if (object1.x - object2.x < object2.width/2 + object1.width/2
      && object2.x - object1.x < object2.width/2 + object1.width/2
      && object1.y - object2.y < object2.height/2 + object1.height/2
      && object2.y - object1.y < object2.height/2 + object1.height/2) {

      return true;  
  }
  else {
      return false;
  }
}