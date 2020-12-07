const canvas = document.getElementById("canvas"); //get the canvas element from the DOM
const context = canvas.getContext("2d"); 

let score1 = 0;
let score2 = 0;

const SCORE_S = new Audio();
SCORE_S.src = "audio/sfx_point.wav";


const field = {  // this is the variable of the background field , position and size
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

const fieldImg = new Image();
fieldImg.src = "./images/GROUND1.png";

const ball = {
  x : canvas.width/2,
  y : canvas.height/2,
  radius : 10,
  velocityX : 5,
  velocityY : 5,
  speed : 7,
  width:90,
  height:90
}

  const ballImg = new Image();
  ballImg.src = "./images/disc.png";
  

const pokemon1 = {  // this is the variable of the grey pokemon on the left , position & size
  x: 220,
  y: 250,
  width: 100,
  height: 100,
  //score: 0
  
};

const pokemonImg = new Image();
pokemonImg.src = "./images/mewtwo.png";


const pokemon2 = { // this is the variable of the red pokemon on the right , position & size
  x : 1050,
  y : 300,
  width: 100,
  height: 100,
  //score: 0
  
};

const pkmonImg = new Image();
pkmonImg.src = "./images/groundon.png";




  const drawScores = () => { // setting up the variable scores 
    context.fillStyle='black';
    context.font='bolder 30px Arial';
    context.fillText(`Score: ${score1}`, 170, 40); // position of the score and adding parameter of the variable

    context.fillStyle='black';
    context.font='bolder 30px Arial';
    context.fillText(`Score: ${score2}`, 1030, 40);

    }

    


canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt){
    let rect = canvas.getBoundingClientRect();
    
    pokemon1.y = evt.clientY - rect.top - pokemon1.height/2;
}

function resetBall() {
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;

  }

 
 



function render() {

  context.clearRect(0, 0, canvas.width, canvas.height);
  
  
 

  context.drawImage(fieldImg, field.x, field.y, field.width, field.height); // this is for the background images(the court)
  
  context.drawImage(pokemonImg, pokemon1.x, pokemon1.y, pokemon1.width, pokemon1.height); // this is for the grey pokemon (left pokemon)
  
  context.drawImage(pkmonImg, pokemon2.x, pokemon2.y, pokemon2.width, pokemon2.height); // this is for the red pokemon (right pokemon)
  
  context.drawImage(ballImg, ball.x, ball.y, ball.width, ball.height); // this is for the disc (pokeball)

  

}

function collision(b,p){
  p.top = p.y;
  p.bottom = p.y + p.height;
  p.left = p.x;
  p.right = p.x + p.width;
  
  b.top = b.y - b.radius;
  b.bottom = b.y + b.radius;
  b.left = b.x - b.radius;
  b.right = b.x + b.radius;
  
  return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}



function update() {

 ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  pokemon2.y += ((ball.y - (pokemon2.y + pokemon2.height/2)))*0.1;

  if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
    ball.velocityY = -ball.velocityY;
    //wall.play();
}

let player = (ball.x + ball.radius < canvas.width/2) ? pokemon1 : pokemon2;

 if(collision(ball,player)){

  let collidePoint = (ball.y - (player.y + player.height/2));
  collidePoint = collidePoint / (player.height/2);
  let angleRad = (Math.PI/4) * collidePoint;
  let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        ball.speed += 0.5;

   }

 
 if( ball.x - ball.radius < 0 ){
    score2++;
    SCORE_S.play();
    resetBall();
}else if( ball.x + ball.radius > canvas.width){
    score1++;
    SCORE_S.play();
    resetBall();
}

  


}
 

function game() {
  update();
  render();
  drawScores();
  
}


// number of frames per second
let framePerSecond = 50;

//call the game function 50 times every 1 Sec
let loop = setInterval(game,1000/framePerSecond);