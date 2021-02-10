var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var end, endImg;

//gameStates
PLAY = 1;
END = 0;
var gs = PLAY;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,500);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);



//creating boy running
boy = createSprite(70,450,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
//gameOver
end = createSprite(200,200,10,10);
end.addAnimation("end", endImg);
end.scale = 0.7;
end.visible = false; //default visible property is false
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
  if(gs === PLAY) {
    boy.x = World.mouseX; //boy moves with mouseX position
    
    //code to reset the background
    if(path.y > 400 ){
      path.y = height/2;
    }
    //changes
    path.velocityY = 4+ (2*treasureCollection/10);
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection +50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection +100;
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection +150;
    }
  }
  
  else if(gs === END) {
    boy.x = 200;
    boy.y = 330;
    boy.pause();
    
    path.velocityY = 0;
    
    cashG.destroyEach();
    
    diamondsG.destroyEach();
    
    jwelleryG.destroyEach();
    
    swordGroup.destroyEach();
    
    end.visible = true;
  }
  
   if(boy.isTouching(swordGroup)) {
    gs = END;
  }
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
 
  
    

    

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 4+ (2*treasureCollection/10);
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 4+ (2*treasureCollection/10);
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 4+ (2*treasureCollection/10);
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350)),40, 10, 10);
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 4+ (2*treasureCollection/10);
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}
