

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

 const canvas = document.getElementById('canvas');
 const context = canvas.getContext('2d');

 

 const field = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

const fieldImg = new Image();
fieldImg.src = './images/GROUND1.png';
//fieldImg.addEventListener('load', () => {
    //context.drawImage(fieldImg, field.x, field.y, field.width, field.height);
//});
 



 const disc = {
   x: canvas.width/2,
   y: canvas.height/2,
   radius: 10
}

    
     


 const discImg = new Image();
 discImg.src = './images/disc.png';
 //discImg.addEventListener('load', () => {
    // context.drawImage(discImg, disc.x, disc.y, disc.width, disc.height);
//});

const pokemon1 = {
    x: 400,
    y: 250,
    width: 120,
    height: 120,
    score: 0
}

const pokemonImg = new Image();
pokemonImg.src = './images/mewtwo.png';
//pokemonImg.addEventListener('load', () => {
    //context.drawImage(pokemonImg, pokemon1.x, pokemon1.y, pokemon1.width, pokemon1.height);
//});

const pokemon2 = {
    x: 1100,
    y: 300,
    width: 120,
    height: 120,
    score:0
}

const pkmonImg = new Image();
pkmonImg.src = './images/groundon.png';
//pkmonImg.addEventListener('load', () => {
    //context.drawImage(pkmonImg, pokemon2.x, pokemon2.y, pokemon2.width, pokemon2.height);
//});

// create some animation

const drawEverything = () => {
    context.drawImage(fieldImg, field.x, field.y, field.width, field.height);
    context.drawImage(pokemonImg, pokemon1.x, pokemon1.y, pokemon1.width, pokemon1.height);
    context.drawImage(pkmonImg, pokemon2.x, pokemon2.y, pokemon2.width, pokemon2.height);
    context.drawImage(discImg, disc.x, disc.y, disc.radius);
}



   
const drawingloop = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    
    drawEverything();
     
    /*disc.x -=4
    if (disc.x < disc.width) {
        disc.x = canvas.width;
        disc.y = math.floor()
    }*/
    
    
    
    
    requestAnimationFrame(drawingloop);
    
};


// movement of one player 

document.addEventListener('keydown', event => {
  console.log(event.code);
    switch(event.code){
        case 'ArrowLeft':
            case 'ArrowLeft':
            if (pokemon1.x >= 15) pokemon1.x -=20;
            break;
            case 'ArrowRight':
                case 'ArrowRight':
                if (pokemon1.x <= 1400 - 120) pokemon1.x +=20;
                break;
                case 'ArrowUp':
                    case 'ArrowUp':
                    pokemon1.y -=20;
                    break;
                    case 'ArrowDown':
                        case 'ArrowDown':
                            pokemon1.y +=20;
                            break;
    }
});





drawingloop();
 
 
 