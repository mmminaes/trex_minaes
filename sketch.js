var trex, trex_running;
var edges;
var piso, piso_imagen;
var pisoFalso;
var nube_imagen;
var cac1, cac2, cac3, cac4, cac5, cac6;
var sumarPuntos1, seMurio2, saltar3;
var teamNube, teamCactus;
var puntos;
var estado;
var gameOver,gameOver_imagen;
var restart, restart_imagen;
var trexChoca, trexAgacha;
var teros, teros_imagen;

//hacer que aparesca la animacion o imagen
function preload(){
  
  estado="inicio";
  
  //animacion del dino
  
  trex_running =  loadAnimation("trex1.png","trex3.png","trex4.png");
  
  //imagen del piso
  
 piso_imagen = loadImage("ground2.png");
  
  //imagen nube
  
nube_imagen = loadImage("cloud.png");
  
  //final del juego
  
  gameOver_imagen = loadImage("gameOver.png");
  
  restart_imagen = loadImage("restart.png");
  
  //cargo imagen de trex muerto
  
  trexChoca = loadAnimation("trex_collided.png");
  trexAgacha = loadAnimation("trex_down1.png","trex_down2.png");
  
  //cargo imagen de los teros
  
  teros = loadAnimation("tero1.png","tero2.png");
  
  //cactus diferentes
  
cac1 = loadImage("obstacle1.png");
cac2 = loadImage("obstacle2.png");
cac3 = loadImage("obstacle3.png");
cac4 = loadImage("obstacle4.png");
cac5 = loadImage("obstacle5.png");
cac6 = loadImage("obstacle6.png");
  
  //sonidos
  
sumarPuntos1 = loadSound("checkPoint.mp3");
seMurio2 = loadSound("die.mp3");
saltar3 = loadSound("jump.mp3");

}

function setup() {
  createCanvas(windowWidth, 200);
  
  puntos=0;
  
  //create a trex sprite
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("choca",trexChoca);
  trex.addAnimation("agacha",trexAgacha);
  
  //tamaño de la animacion 
  trex.scale = 0.5;
  trex.x = 50 
  trex.setCollider("circle",0,0,45)
  trex.debug=false;
//crear el piso
  
  piso=createSprite(200,180,400,20);
  
  //juntamos todo para que aparesca
  
  piso.addImage("piso",piso_imagen);
  
  gameOver=createSprite(width/2,80,20,20);
  
  gameOver.addImage(gameOver_imagen);
  gameOver.scale=0.8
  
  gameOver.visible=false;
  
  restart=createSprite(width/2,120,20,20);
  
  restart.addImage(restart_imagen);
  restart.scale=0.5
  
  restart.visible=false;
  
  //no rebota solo choca
  
  edges=createEdgeSprites();
  
  
  //hacemos que un sprite no aparezca pero ahi esta
  
  pisoFalso=createSprite(200,190,400,10);
  pisoFalso.visible=false;
  
  
  //aqui vamos a crear los grupos 
  
  teamNube= new Group();
  teamCactus= new Group();
  
}

function draw() {
  background("grey");
fill(255,255,255);  
text("Puntos " +puntos,width-60,60);
  
  if (estado==="inicio"&&(keyDown("space")||touches.length>0)){
    estado="jugando";
  touches=[];
  }
  
  if (estado==="jugando"){
   if (piso.x<0){
  piso.x=piso.width/2;
     } 
    piso.velocityX=-3;
    nubes();
  cactusitos();
    teros123();
    if((keyDown("space")||touches.length>0)&&trex.y>100) {
    trex.velocityY = -10;
      touches=[];
      }
    if(keyWentDown("down_arrow")){
      trex.changeAnimation("agacha",trexAgacha);
      trex.scale=0.35;
      
    }
    if(keyWentUp("down_arrow")){
      trex.changeAnimation("running",trex_running);
      trex.scale =0.5;
      
    }
    if (frameCount%100===0){
      puntos=puntos+10;
    }
     if(puntos%100===0&&puntos>0){
    sumarPuntos1.play();
  }
    trex.velocityY = trex.velocityY + 0.8;
  
    if(trex.isTouching(teamCactus)){
    seMurio2.play();
      
    estado="final";
  }
    
    }
  
  if (estado==="final"){
    gameOver.visible=true;
    restart.visible=true;
    piso.velocityX=0;
    teamCactus.setVelocityXEach(0);
    teamNube.setVelocityXEach(-1);
    teamCactus.setLifetimeEach(-1);
    trex.velocityY=0;
    trex.changeAnimation("choca",trexChoca);
    trex.scale=0.5;
    if (mousePressedOver(restart)||touches.length>0){
      reinicio();
      
    }
  }
  
  //imprimir velocidades 
  
 //console.log(frameCount)
  
  //dar efecto de ser infinito
  

 
  //jumping the trex on space key press
  
  
  
  if(puntos%100===0&&puntos>0){
    //sumarPuntos1.play();
  }
  
  
  
 //stop trex from falling down 
  
  trex.collide(pisoFalso);
  
  drawSprites();
  
} //llave funcion draw

// funcion que hace que aparezca con el frameCount y las nubes salen en diferentes posiciones

function nubes(){
  if (frameCount%100===0){
   // console.log("Holis"+frameCount)
    var b= random(1,50);
    var nube=createSprite(width,b,20,20);
    nube.velocityX = -3;
    nube.addImage(nube_imagen);
    nube.depth=trex.depth;
    trex.depth=trex.depth+1;
    nube.lifetime=width/3; 
    teamNube.add(nube);
  }
  
}

function cactusitos(){
  if(frameCount%130===0){
   var c= Math.round(random(1,6));
    console.log(c)
    var cactus=createSprite(width,160,20,20);
    cactus.velocityX = -3;
    cactus.shapeColor="green";
    switch(c){
      case 1:
        cactus.addImage(cac1);
        break;
        
       case 2:
        cactus.addImage(cac2);
        break;
        
       case 3:
        cactus.addImage(cac3);
        break;
        
       case 4:
        cactus.addImage(cac4);
        break;
        
       case 5:
        cactus.addImage(cac5);
        break;
        
       case 6:
        cactus.addImage(cac6);
        break;
        
        default:
        break;
    }
    
cactus.scale=0.7;
    cactus.lifetime=width/3;
    teamCactus.add(cactus);
    
  }
}


function reinicio(){
  estado="inicio";
  teamCactus.destroyEach();
  teamNube.destroyEach();
  restart.visible=false;
  gameOver.visible=false;
  trex.y=180;
  trex.changeAnimation("running",trex_running);
  puntos=0;
}

function teros123(){
  if (frameCount%210===0){
    var tero = createSprite(width,20,20,20);
    tero.lifetime=width/4;
    tero.addAnimation("tero",teros);
    tero.velocityX=-4;
    var r =random(0,0.9);
    tero.velocityY=r;
  }
}