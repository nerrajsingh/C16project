
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  // createCanvas(600, 600);
  


  var survivalTime=0;
  
  //creating monkey
  monkey=createSprite(50,340,11,30);
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.1; 
  score = 0;
  
  //creating ground
  ground=createSprite(100,350,900,21)
  ground.velocityX=-3; 
  FoodGroup=new Group();
  ObstaclesGroup=new Group();
  
}


function draw() {
  
  background(255);
  
if(ground.x<200){
 ground.x=ground.width/2; 
}

 if(keyDown("space")){
  monkey.velocityY=-10; 
 } 
 monkey.velocityY=monkey.velocityY+0.8
 monkey.collide(ground);
 spawnFood();
 spawnObstacles();
 if(ObstaclesGroup.isTouching(monkey)){
   ground.velocityX=0;
   ObstaclesGroup.setVelocityXEach(0);
   FoodGroup.setVelocityXEach(0);
   ObstaclesGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
   monkey.velocityY=(0);
 }
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}
