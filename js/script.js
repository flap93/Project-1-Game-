const canvas = document.getElementById("canvas"); //get the canvas element from the DOM
const context = canvas.getContext("2d"); 
// variable for the scores
let score1 = 0;
let score2 = 0;

// link for the audio
const SCORE_S = new Audio();
SCORE_S.src = "audio/sfx_point.wav";

// this is the variable of the background field , position and size
const field = {  
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

const fieldImg = new Image();
fieldImg.src = "./images/GROUND1.png";


// variale for the disc 
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
  
//variable of the background field , position and size
const pokemon1 = {  
  x: 220,
  y: 250,
  width: 100,
  height: 100,
  //score: 0
  
};

const pokemonImg = new Image();
pokemonImg.src = "./images/mewtwo.png";

// variable of the red pokemon on the right , position & size
const pokemon2 = { 
  x : 1050,
  y : 300,
  width: 100,
  height: 100,
  //score: 0
  
};

const pkmonImg = new Image();
pkmonImg.src = "./images/groundon.png";



// draw the  scores 

  const drawScores = () => { 
    context.fillStyle='black';
    context.font='bolder 30px Arial';
    context.fillText(`Score: ${score1}`, 170, 40); // position of the score and adding parameter of the variable

    context.fillStyle='black';
    context.font='bolder 30px Arial';
    context.fillText(`Score: ${score2}`, 1030, 40);

    }

    

// make the mouse move
canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt){
    let rect = canvas.getBoundingClientRect();
    
    pokemon1.y = evt.clientY - rect.top - pokemon1.height/2;
}

// reset the ball evert time that you score

function resetBall() {
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;

  }

 
 


// draws everything (field , grey pokemon , red pokemon, pokeball(ball))
function render() {

  context.clearRect(0, 0, canvas.width, canvas.height);
  
  context.drawImage(fieldImg, field.x, field.y, field.width, field.height); // this is for the background images(the court)
  
  context.drawImage(pokemonImg, pokemon1.x, pokemon1.y, pokemon1.width, pokemon1.height); // this is for the grey pokemon (left pokemon)
  
  context.drawImage(pkmonImg, pokemon2.x, pokemon2.y, pokemon2.width, pokemon2.height); // this is for the red pokemon (right pokemon)
  
  context.drawImage(ballImg, ball.x, ball.y, ball.width, ball.height); // this is for the disc (pokeball)
  
}
 
// setting up the collision detection with the ball
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

// does all the calculations , speed ,collision, scores

function update() {


  // ball velocity 
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // AI for the pokemon on the right 
  pokemon2.y += ((ball.y - (pokemon2.y + pokemon2.height/2)))*0.1;


// when the ball collides with bottom and top walls we inverse the y velocity.
  if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
    ball.velocityY = -ball.velocityY;
    //wall.play();
}

// we check if the paddle hit the user or the com paddle
let player = (ball.x + ball.radius < canvas.width/2) ? pokemon1 : pokemon2;


// if the ball hits a paddle

 if(collision(ball,player)){

   // check where the ball hits the paddle
  let collidePoint = (ball.y - (player.y + player.height/2));

   // normalize the value of collidePoint, we need to get numbers between -1 and 1.
   // -player.height/2 < collide Point < player.height/2

  collidePoint = collidePoint / (player.height/2);
  //when the ball hits the top of a paddle we want the ball, to take a -45degees angle
 // when the ball hits the center of the paddle we want the ball to take a 0degrees angle
 // when the ball hits the bottom of the paddle we want the ball to take a 45degrees
 // Math.PI/4 = 45degrees
  let angleRad = (Math.PI/4) * collidePoint;

  // change the X and Y velocity direction
  let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        // speed up the ball everytime a paddle hits it.
        ball.speed += 0.5;

   }

 // chnage the scores of the game 

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
  


 
// invokes or the functions 
function game() {
  update();
  render();
  drawScores();
  
}


// number of frames per second
let framePerSecond = 50;

//call the game function 50 times every 1 Sec
let loop = setInterval(game,1000/framePerSecond);

  



