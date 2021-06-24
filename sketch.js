var END =1;
var PLAY =0;
var gameState = 3;   

var bg, bgImg;
var base, baseI;
var bird,birdImg, birdImg1, bird_flying;
var play, playImg;
var getReady, getReadyI;
var surf;
var bee, beeGroup, beeImg;
var restart, restartImg;
var gameOver, gameOverI;
var arrow, arrowI, arrowG;
var score = 0
var help, helpI;
var text1, textI;
var back, backI;
var clickSound;
var flySound;
var dieSound;
var coin, coinI, coinG;
var pointSound;

function preload(){
  bgImg = loadImage("bg.png")
  baseI = loadImage("base.png")
  birdImg = loadAnimation("birds1.png")
  bird_flying = loadAnimation("birds2.png", "birds3.png", "birds4.png", "birds5.png")
  playImg = loadImage("play.png")
  getReadyI = loadImage("getReady.png")
  beeImg = loadImage("bee.gif")
  birdImg1 = loadAnimation("birds6.png")
  restartImg = loadImage("restart.png")
  gameOverI = loadImage("gameover.png")
  arrowI = loadImage("arrow.png")
  helpI = loadImage("help.png")
  textI = loadImage("helpText.png")
  backI = loadImage("back.png")
  clickSound = loadSound("checkPoint.mp3")
  flySound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  coinI = loadImage("coin.gif")
  pointSound = loadSound("point.mp3")
 
}

function setup(){
  createCanvas(600,400);
  bg = createSprite(300, 155, 10, 10)
  bg.addImage(bgImg)
  bg.scale = 1.4
  bg.velocityX = 0
  
  base = createSprite(300, 590, 600, 10)
  base.addImage(baseI)
  base.scale = 4
  base.velocityX = 0
  base.visible = false
  
  bird = createSprite(120, 200, 10, 10)
  bird.addAnimation("standing", birdImg)
  bird.scale = 0.6
  bird.velocityX = 0
  bird.visible = false
  
  play = createSprite(300, 250, 10, 10)
  play.addImage(playImg)
  play.scale = 0.3
  
  getReady = createSprite(300, 160, 10, 10)
  getReady.addImage(getReadyI)
  getReady.scale = 0.05
  
  restart = createSprite(300, 250, 10, 10)
  restart.addImage(restartImg)
  restart.scale = 0.7
  restart.visible = false
  
  text1 = createSprite(300, 180, 10, 10)
  text1.addImage(textI)
  text1.scale = 0.8
  text1.visible = false
  
  surf = createSprite(300, 390, 600, 10)
  surf.visible = false
  
  gameOver = createSprite(300, 160, 100, 10)
  gameOver.addImage(gameOverI)
  gameOver.scale = 1.5
  gameOver.visible = false
  
  help = createSprite(30, 20, 10, 10)
  help.addImage(helpI)
  help.scale = 0.07
  
  back = createSprite(390, 350, 10, 10)
  back.addImage(backI)
  back.scale = 0.3
  back.visible = false
  
 
  
  beeGroup = createGroup()
  arrowG = createGroup()
  coinG = createGroup()
}  



function draw() {
  background("grey");
  if(gameState===PLAY){
  if (bg.x < 0){
    bg.x = bg.width/2;
  }
  
   if (base.x < 0){
    base.x = base.width/2;
  }
    
    
  
  
  if(keyDown("space")&& bird.y >= 100) {
        bird.velocityY = -12;
        
        bird.addAnimation("flying", bird_flying) 
        bird.changeAnimation("flying")
        flySound.play()
    }
  bird.velocityY = bird.velocityY + 0.8
    
    bird.bounceOff(surf)
    
    if(bird.isTouching(beeGroup)) {
      gameState = END;
      dieSound.play()
    }
    
    if(bird.isTouching(arrowG)) {
      gameState = END;
      dieSound.play()
    }
    
    if(bird.isTouching(coinG)) {
      score+=10
      coinG.destroyEach()
      pointSound.play()
    }
  }
  
  if(gameState===END){
    restart.visible = true
    gameOver.visible = true
  
    beeGroup.destroyEach()
    arrowG.destroyEach()
     coinG.destroyEach()
    bird.collide(surf)
    bg.velocityX = 0
    base.velocityX = 0
    
    
  if(keyDown("space")&& bird.y >= 100) {
        bird.velocityY = 0;
        
    }
  bird.velocityY = bird.velocityY + 0.8
    
    bird.addAnimation("pause", birdImg1) 
        bird.changeAnimation("pause")
    
     beeGroup.setLifetimeEach(-1);
     arrowG.setLifetimeEach(-1);
    
    beeGroup.setVelocityXEach(0);
    arrowG.setVelocityXEach(0);  
       
  }
  
if(mousePressedOver(play)) {
      Play();
    }
  
  if(mousePressedOver(restart)) {
      Restart();
    }
  
  
  if(mousePressedOver(help)) {
      Help();
    }
  
  if(mousePressedOver(back)) {
      Back();
    }
  
  
  spawnbee()
  spawnArrow()
  spawnCoin()
  drawSprites();
  fill("black")
  textSize(35)
  text("Score: "+ score, 420,40);
 
  
}

function Play() {
  gameState = PLAY
   bg.velocityX = -2
  base.visible = true
  bird.visible = true
  play.visible = false
  getReady.visible = false

  bg.velocityX = -(3 + 3* score/100)
  base.velocityX = -(3 + 3* score/100)
  
    beeGroup.setVelocityXEach(0);
    arrowG.setVelocityXEach(0);  
     
    clickSound.play()
}

function Restart() {
  play.visible = false
  getReady.visible = false
  bird.addAnimation("standing", birdImg)
   bird.changeAnimation("standing")
  restart.visible = false
  gameOver.visible = false
  
  if(keyDown("space")&& bird.y >= 500) {
        bird.velocityY = -12;
        bird.addAnimation("flying", bird_flying) 
        bird.changeAnimation("flying")
        
    }
  bird.velocityY = bird.velocityY + 0.8
  
  
  score = 0
  clickSound.play()
}

function Help() {
   text1.visible = true
   back.visible = true
  clickSound.play()
  
  bird.collide(surf)
    bg.velocityX = 0
    base.velocityX = 0
  
 
  
}

function Back() {
  text1.visible = false
  back.visible = false
  clickSound.play()
  
   bg.velocityX = -(3 + 3* score/100)
  base.velocityX = -(3 + 3* score/100)
  
 
  
}

function spawnCoin() {
  //write code here to spawn the clouds
  if (frameCount % 500 === 0 && gameState===PLAY) {
    var coin = createSprite(600,1,40,10);
    coin.y = Math.round(random(50,500));
    coin.addImage(coinI);
    coin.scale = 0.3;
    coin.velocityX = -3;
    
     //assign lifetime to the variable
    coin.lifetime = 200;
    
    //adjust the depth
   coin.depth = bird.depth;
    bird.depth = bird.depth + 1;
    
    //add each cloud to the group
    coinG.add(coin);
  }
}

function spawnbee() {
  //write code here to spawn the clouds
  if (frameCount % 600 === 0  && gameState===PLAY) {
    var bee = createSprite(600,120,40,10);
    bee.y = Math.round(random(80,120));
    bee.addImage(beeImg);
    bee.scale = 0.2;
     bee.velocityX = -3;
    
     //assign lifetime to the variable
    bee.lifetime = 200;
    
    //adjust the depth
   bee.depth = bird.depth;
    bird.depth = bird.depth + 1;
    
    //add each cloud to the group
    beeGroup.add(bee);
  }
}

function spawnArrow() {
  //write code here to spawn the clouds
  if (frameCount % 700 === 0 && gameState===PLAY) {
    var arrow = createSprite(600,1,40,10);
    arrow.y = Math.round(random(200,400));
    arrow.addImage(arrowI);
    arrow.scale = 0.09;
    arrow.velocityX = -3;
    
     //assign lifetime to the variable
    arrow.lifetime = 200;
    
    //adjust the depth
   arrow.depth = bird.depth;
    bird.depth = bird.depth + 1;
    
    //add each cloud to the group
    arrowG.add(arrow);
  }
}

