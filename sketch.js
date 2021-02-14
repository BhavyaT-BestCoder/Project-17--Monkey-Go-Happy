var monkey,monkey_run,monkey_stop;
var banana ,banana_img;
var obstacle,obstacle_img;
var foodGroup,obsGroup;
var Hunger,score,chances;
var ground,ground_img;
var gameOver,gameOver_img;
var restart,restart_img;
var START=1;
var PLAY=2;
var END=0;
var gameState=START;
var longjump_sound;
var jumpSound;
var dieSound;
var checkPointSound;
var gameOverSound;

function preload()
{
  monkey_run =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  

  banana_img = loadImage("banana.png");
  obstacle_img = loadImage("obstacle.png");
  ground_img=loadImage("ground2.png");
  gameOver_img=loadImage("gameover.png");
  restart_img=loadImage("restart.png");

  longjump_sound=loadSound("longjump.mp3");
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  checkPointSound=loadSound("checkPoint.mp3");
  gameOverSound=loadSound("gameOver.mp3");
}



function setup() {
  createCanvas(800,500);
  
  monkey=createSprite(60,height-75,10,10);  
  monkey.addAnimation("run",monkey_run);
  monkey.scale=0.110;
  monkey.setCollider("rectangle",0,0,550,340);
  //monkey.debug = true;
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  

  ground=createSprite(width/2,height-42,1200,8);
  ground.addImage(ground_img);
  
  foodGroup=new Group();
  obsGroup=new Group();
  

  Hunger=10;
  score=0;
  chances=3;
  
  gameOver=createSprite(width/2,height-250,10,10)
  gameOver.addImage(gameOver_img);
  gameOver.scale=1.5;
  
  restart=createSprite(width-295,height-150,10,10);
  restart.addImage(restart_img);
  restart.scale=0.3;
}


function draw()
{
  background("white");
  
  
  if(gameState===START)
  {
   gameOver.visible=false;
   restart.visible=false;
    
   
   
   monkey.visible=false;
   ground.visible=false;

   if(keyDown("space"))
   {
     gameState=PLAY;
   }
   
  }
  else if(gameState===PLAY)
  {
    monkey.visible=false;
    ground.visible=false;
    ground.visible=true;
    monkey.visible=true;
    
    ground.velocityX=-(4+score/10);
    
    
    
    if(keyDown("space") && monkey.y >= 140)
    { 
      monkey.velocityY=-11;
      jumpSound.play();
    }
    
   
    
    monkey.velocityY=monkey.velocityY+0.5;
    
    if(monkey.isTouching(foodGroup))
    {
      foodGroup.destroyEach();
      score=score+10;
      Hunger=Hunger+5;
    }
    
  
    
    if(frameCount%100===0)
    {
      Hunger=Hunger-1;
    }
    
    if(monkey.isTouching(obsGroup))
    {
      chances=chances-1;
      obsGroup.destroyEach();
      dieSound.play();
    }
    
    if(score>0&&score%50===0)
    {
       
      checkPointSound.play();
    }
    
    obstacles();
    food();
  }
  else if(gameState===END)
  {
    gameOver.visible=true;
    restart.visible=true;
    
    ground.velocityX=0
    foodGroup.setVelocityEach(0);
    foodGroup.destroyEach();
   
    obsGroup.setVelocityEach(0);
    obsGroup.destroyEach();
  }
  
  if(ground.x<0)
  {
    ground.x=ground.width/2;
  }

  monkey.collide(ground);
  
  if(chances===0||Hunger===0)
  {
    gameState=END;
  }
  
  if(mousePressedOver(restart))
  {
    reset();
  }

  
  drawSprites();
  
  fill("black");
  textSize(18);
  text("Hunger: "+Hunger,450,35);
  text("Chances: "+chances,250,35);
  text("Score: "+score,50,35);
  
  
}


function obstacles()
{
  if(frameCount%170===0)
  {
  obstacle=createSprite(width,height-70,10,10);
  obstacle.addImage(obstacle_img);
  obstacle.scale=0.15;
  obstacle.velocityX=-(4+score/10);
  obstacle.lifetime=width/obstacle.velocity;
  //obstacle.debug = true;
  obstacle.setCollider("rectangle",0,0,obstacle.width, obstacle.height);
  obsGroup.add(obstacle);
  }
}

function food()
{
  if(frameCount%80===0)
  {
    banana=createSprite(600,Math.round(random(120,200)),10,10);
    banana.addImage(banana_img);
    banana.velocityX=-(3.5+score/10);
    banana.scale=0.1;
    banana.setCollider("rectangle",0,0,banana.width,banana.height);
    //banana.debug = true;
    banana.lifetime=width/banana.velocity;
    foodGroup.add(banana);
  }
  


}

function reset()
{
  gameState=PLAY;
  score=0;
  chances=3;
  survivalTime=10;
  gameOver.visible=false;
  restart.visible=false;
}

