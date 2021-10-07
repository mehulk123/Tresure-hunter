var s1img,s2img;
var gameState=1;
var play;
var hunterimg,hunter;
var bulletimg,bullet,BulletGroup;
var NpcGroup,lionimg,bearimg,tigerimg,tribeimg,lion;
var youwonimg,youwon;
var invisibleground;
var edges;
var heart = 5, h = [],ht,heartGroup,heartimg,lifecount=5;
var s3img;
var gunshot,jungle;

function preload(){
  s1img = loadImage("images/s1.jpg")
  s2img = loadImage("images/s2.png")
  hunterimg = loadAnimation("images/h4.png","images/h6.png","images/h3.png","images/h2.png")
  bulletimg = loadImage("images/bullet.png")
  youwonimg = loadImage("images/youwon.png")
  lionimg = loadImage("images/a2.png")
  tigerimg = loadImage("images/a1.png")
  bearimg = loadImage("images/a3.png")
  tribeimg = loadImage("images/t1.png")
  heartimg=loadImage("images/heart.png");
  gunshot=loadSound("images/gunshot.wav")
  s3img = loadImage("images/s3.jpg")
 // jungle=loadSound("images/jungle_back.wav")
}
function setup() {
  createCanvas(displayWidth-20,displayHeight-100);
  play=createButton("Next");
  hunter=createSprite(100,displayHeight-300,50,50) 
  hunter.addAnimation("a",hunterimg)
  hunter.visible=false 
  //hunter.debug=true;
  invisibleground=createSprite(displayWidth/2,displayHeight-310,displayWidth,30);
  invisibleground.visible = true ;
  edges=createEdgeSprites();
  BulletGroup= new Group ()
  NpcGroup= new Group()
  score=0;
  CorrectAns=0;
  heart = 5;
  heartGroup = new Group();
  spawnHearts();
  greeting = createElement('h2')
  greeting2 = createElement('h2')
  greeting3 = createElement('h2')
  greeting4 = createElement('h2')
  button    = createButton('Next')
}

function draw() {
  if(gameState===1){
    background(s1img);
    
    fill("yellow")
    textSize(20)  
    text("You are Shikari Shambu ,who is a tresure hunter,who as found the most of the tresure in the world.Now he has found some evidence, ",100,100);
    text("that tells that there is a tresure in an alein planet outside the world.",100,130)
    text("The controls for the game is :",100,170)
    text("1: Press 'W key' for forward move",200,200)
    text("2: Press 'Space key'for shooting bullets",200,240)
    play.position(displayWidth-200,displayHeight-300);
    play.mousePressed(()=>{
      play.hide();
      gameState=2
    
    })
  }
  if(gameState===2){
    play.hide();
    //background(s2img); 
    //imageMode(CENTER);
    image(s2img,0,0,displayWidth,displayHeight)
    //jungle.play();
    //camera.position.x=hunter.x;
    //camera.position.y=hunter.y;
    spawnHearts();
    invisibleground.visible = false ;
    //create player
    hunter.visible=true
    //call spawn obstacles function
    spawnNpc();
    if(keyDown("W")){
      hunter.x+=20
    }
    if(keyWentDown("Space")){
      gunshot.play();
      spawnBullets();
    }
    fill("white")
    textSize(40)
    text("Score="+score,50,50)
    if(score >=100){
      gameState=3;
    }
   if(BulletGroup.isTouching(NpcGroup)){
     NpcGroup.destroyEach();
     BulletGroup.destroyEach();
     score=score+20
    }
    if(hunter.isTouching(NpcGroup)){
      lifecount=lifecount-1;
      heart=heart-1;
      spawnHearts();
    }
    

    drawSprites();
    if(lifecount<=0){
      textSize(50);
      fill("black");
      text("GAME OVER!", displayWidth/2-200, displayHeight/2);
    }
  }
 if(gameState === 3){
 background(s3img)
 
}
}
function spawnHearts(){
  heartGroup.destroyEach();
   for(var i = 1;i<=heart;i++){
     ht = createSprite(displayWidth/3+50 * i, 30, 20, 20);
     ht.addImage(heartimg);
     ht.scale = 0.25;
     heartGroup.add(ht);
   }
 }
function spawnBullets(){
  bullet=createSprite(hunter.x+120,hunter.y,50,50);
      bullet.addImage(bulletimg)
      bullet.scale=0.1;
      bullet.velocityX=10;
      bullet.lifetime=displayWidth/10;
BulletGroup.add(bullet);
 
}

function spawnNpc(){
  if (frameCount % 100 === 0){
    var npc = createSprite(displayWidth,displayHeight-280,10,20)
     npc.velocityX=-6
     var rand = Math.round(random(1,4));
     switch(rand) {
       case 1: npc.addImage(lionimg);
           npc.scale=0.2
                break ;
       case 2: npc.addImage(bearimg);
          npc.scale=0.4
                break ;
       case 3: npc.addImage(tigerimg);
          npc.scale=0.4
                break ;
       case 4: npc.addImage(tribeimg);
          npc.scale=0.8
                break ;
       default: break; 
     }
   // npc.scale = 0.4;
    npc.lifetime = 800;

    NpcGroup.add(npc);
  }
 
}