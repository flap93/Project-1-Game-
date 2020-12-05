/*const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, 1000, 1000);
    
   // here were have to put the disc that when the game start , it should
   //start bouncing on every direction
   const disc = new image();
   disc.src = './images/disc.png';
   disc.addEventlistener('load', () => {
       context.drawImage(disc, 10, 30, 100, 120);
       
   });
   

   x += 5;  // this moves the object from 0 to 5 pixels on the x 
   y += 10;

 setTimeout(() => startGame(x, y), 50)  // the number 50 are the miliseconds*/

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let score = 0;

const field = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

const fieldImg = new Image();
fieldImg.src = "./images/GROUND1.png";
//fieldImg.addEventListener('load', () => {
//context.drawImage(fieldImg, field.x, field.y, field.width, field.height);
//});

const disc = {
  x: 700,
  y: 300,
  dx: -5,
  dy: -3,
  radius: 10,
  width: 90,
  height: 90,
};

const discImg = new Image();
discImg.src = "./images/disc.png";
//discImg.addEventListener('load', () => {
// context.drawImage(discImg, disc.x, disc.y, disc.width, disc.height);
//});

const pokemon1 = {
  x: 400,
  y: 250,
  width: 120,
  height: 120,
};

const pokemonImg = new Image();
pokemonImg.src = "./images/mewtwo.png";
//pokemonImg.addEventListener('load', () => {
//context.drawImage(pokemonImg, pokemon1.x, pokemon1.y, pokemon1.width, pokemon1.height);
//});

const pokemon2 = {
  x: 1100,
  y: 300,
  width: 120,
  height: 120,
};

const pkmonImg = new Image();
pkmonImg.src = "./images/groundon.png";
//pkmonImg.addEventListener('load', () => {
//context.drawImage(pkmonImg, pokemon2.x, pokemon2.y, pokemon2.width, pokemon2.height);
//});

// create some animation

const drawEverything = () => {
  context.drawImage(fieldImg, field.x, field.y, field.width, field.height);
  context.drawImage(
    pokemonImg,
    pokemon1.x,
    pokemon1.y,
    pokemon1.width,
    pokemon1.height
  );
  context.drawImage(
    pkmonImg,
    pokemon2.x,
    pokemon2.y,
    pokemon2.width,
    pokemon2.height
  );
  context.drawImage(discImg, disc.x, disc.y, disc.width, disc.height);
};

const drawingloop = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawEverything();

  disc.x += disc.dx;
  disc.y += disc.dy;
  if (disc.x < 0) {
    disc.dx = -disc.dx;
  }
  if (disc.x >= canvas.width - disc.width) {
    disc.dx = -disc.dx;
  }
  if (disc.x <= canvas.width + disc.width) {
    disc.dx = +disc.dx;
  }

  if (disc.y < 0) {
    disc.dy = -disc.dy;
  }
  if (disc.y >= canvas.height - disc.height) {
    disc.dy = -disc.dy;
  }

  const collision = collisionDetection(disc, pokemon1);
  console.log(collision);

  //collisionDetection(disc, pokemon1);

  // console.log('disc');
  // console.log('pokemon1');

  requestAnimationFrame(drawingloop);
};

function collisionDetection(disc, pokemon1) {
  let distX = Math.abs(disc.x - pokemon1.x - pokemon1.width / 2);

  let distY = Math.abs(disc.y - pokemon1.y - pokemon1.height / 2);
  if (distX > pokemon1.width / 2 + disc.radius) {
    return false;
  }
  // console.log(pokemon1.width/2, disc.radius);

  if (distY > pokemon1.height / 2 + disc.radius) {
    return false;
  }

  if (distX <= pokemon1.width / 2) {
    return true;
  }
  if (distY <= pokemon1.height / 2) {
    return true;
  }

  let dx = distX - pokemon1.width / 2;
  let dy = distY - pokemon1.height / 2;
  return dx * dx + dy * dy <= disc.radius * disc.radius;
}

// movement of one player

document.addEventListener("keydown", (event) => {
  console.log(event.code);
  switch (event.code) {
    case "KeyA":
      if (pokemon1.x >= 15) pokemon1.x -= 20;
      break;
    case "KeyD":
      if (pokemon1.x <= 1400 - 120) pokemon1.x += 20;
      break;
    case "KeyW":
      if (pokemon1.y > 20) pokemon1.y -= 20;
      break;
    case "KeyS":
      pokemon1.y += 20;
      if (pokemon1.y < 20) pokemon1.y += 20;
      break;
  }
});

document.addEventListener("keydown", (event) => {
  console.log(event.code);
  switch (event.code) {
    case "ArrowLeft":
      if (pokemon2.x >= 15) pokemon2.x -= 20;
      break;
    case "ArrowRight":
      if (pokemon2.x <= 1400 - 120) pokemon2.x += 20;
      break;
    case "ArrowUp":
      pokemon2.y -= 20;
      break;
    case "ArrowDown":
      pokemon2.y += 20;
      break;
  }
});

drawingloop();
