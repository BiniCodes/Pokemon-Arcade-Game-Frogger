//Move variables
// Move to the right
let dx = 35;
// Move to the top
let dy = -35;

//Key press variables
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

//Variables of canvas size
//canvas.width
canvasWidth = 505;
//canvas.height
canvasHeight = 606;


// Enemies our player must avoid 
//class Enemy including:
// ...
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    //constructor function
    constructor(x, y, speed){
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/Pokeball.png'; 
    this.x = x;
    this.y = y;
    this.speed = speed;
    }
   
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.    
        
        if(this.x <= (canvasWidth-83)){
            this.x += this.speed;    
        } else {
            this.x = 0;
        }       
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    // constructor for Player object
    constructor(x,y){
        this.sprite = 'images/pikachu.png';
        this.x = x;
        this.y = y;
    }

    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.


       //MOVE PLAYER with keys and stop him from moving off the screen

       //move right and stop at the right screen
         if(rightPressed && this.x <= canvasWidth-83) {
            this.x += dx;
            rightPressed = false;     
        }
       //move up and stop at the upper screen
       if(upPressed && this.y >= 0) {
            this.y += dy; 
            upPressed = false;     
        }

       //move left and stop at the left screen
        if(leftPressed && this.x >= 35) {
             this.x -= dx;
             leftPressed = false;
        }

       //move down and stop at the bottom screen
        if(downPressed && this.y <= canvasHeight-83-100) {
           this.y -= dy;
            downPressed = false;
        }

//Collision Detecion for three enemies
        // First enemy / Last in the row
        if (enemy1.x < (this.x + 71) &&
             (enemy1.x + 71) > this.x &&
             enemy1.y < (this.y + 50.5) &&
            (50.5 + enemy1.y) > this.y) {

                // collision detected!
            console.log('collision detected!');
            this.reset();
            resetItems();
        
        // Second enemy / In the middle
        } else if (enemy2.x < (this.x + 71) &&
             (enemy2.x + 71) > this.x &&
             enemy2.y < (this.y + 50.5) &&
            (50.5 + enemy2.y) > this.y) {

                // collision detected!
            console.log('collision detected!');
            this.reset();
            resetItems();

        // Third enemy / First in the row
        } else if (enemy3.x < (this.x + 71) &&
             (enemy3.x + 71) > this.x &&
             enemy3.y < (this.y + 50.5) &&
            (50.5 + enemy3.y) > this.y) {

                // collision detected!
            console.log('collision detected!');
            this.reset();
            resetItems();

        } else {
            console.log('no collision detected!');
            }    

//Win the Game
        if(this.y <= 30){
            console.log('WON!');
            alert('You have won the game! \n You have collected ' + collisionStar +' '+ 'Stars \n Restart?');
            this.reset();
            resetItems();
        }

    }

    // Reset Player
    reset(){
        this.x = 220;
        this.y = 439;
    }

    // Draw the player on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //Handle the keyboard input
    handleInput(keyPressed) {
        if (keyPressed === 'right') {
            rightPressed = true;
        }

       if(keyPressed === 'up') {
            upPressed = true;
        }

       if(keyPressed === 'left') {
            leftPressed = true;
        }

        if(keyPressed === 'down') {
            downPressed = true;
        }
    }
}

//Variable to count collisions with items
let collisionStar = 0;  
//class of collectable items
class Items{

    // Constructor to create a star to collect
    constructor(x,y){
        this.sprite = 'images/Star.png';
        this.x = x;
        this.y = y;
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // Update the game
    update(dt) {
            // Collision Detection for stars  
        if (player.x < (this.x + 71) &&
                 (player.x + 61) > this.x &&
                 player.y < (this.y + 100) &&
                (50 + player.y) > this.y) {

                    // collision detected!
                console.log('Collected one star!');
                collisionStar += 1;

        // After a collision/ collection with/of a star, the star will be placed newly
        //This happens four times
        switch (collisionStar){

        case 1:
            this.x = 0;
            this.y = 400;
            console.log("A star has been collected and placed to antoher place");
            break;

        case 2:
            this.x = 200;
            this.y = 150;
            console.log("A star has been collected and placed to antoher place");
            break;
        
        case 3:
            this.x = 300;
            this.y = 400;           
            console.log("A star has been collected and placed to antoher place");
            break;
        
        case 4:
            this.x = 10;
            this.y = 75;
            console.log("A star has been collected and placed to antoher place");  
            break;

        default:
            this.collect();        
            console.log("A star has been collected and deleted");  

        }
    }
}

//If the stars were replaced newly for four times, every following collection/ collision
// will cause a deletion of the star until all stars are removed.
    collect(){
        delete this.x;
        delete this.y;
    }
}

// Instatiate the enemy object
const enemy1 = new Enemy(110,130,2);
const enemy2 = new Enemy(230,215,4);
const enemy3 = new Enemy(320,295,2);

// Place all enemy objects in an array called allEnemies
const allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

// Place the player object in a variable called player
const player = new Player(220,439);

//Put a Star on the game
const star1 = new Items(310,320);
const star2 = new Items(100,75);
const star3 = new Items(410,150);
const star4 = new Items(5,240);

function resetItems(){
        star1.x = 310;
        star1.y = 320;
        star2.x = 100;
        star2.y = 75;
        star3.x = 410;
        star3.y = 150;
        star4.x = 5;
        star4.y = 240;
        collisionStar = 0
    }

//Create an array for all Stars 
//and add the different star Objects into it
const allStars = [];
allStars.push(star1);
allStars.push(star2);
allStars.push(star3);
allStars.push(star4);

// This listens for key presses and sends the keys to your
// player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


