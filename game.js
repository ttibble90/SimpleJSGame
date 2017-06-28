/**
 * Created by tomdt on 6/23/2017.
 */
const WIDTH = 600;
const HEIGHT = 600;
const moveSpeedX = 6;
const moveSpeedY = 5;
const missileSpeed = 25;

const xSpriteOffset = 0;
const ySpriteOffset = 0;

const spriteWidth = 20;
const spriteHeight = 20;

const yMoveLimit = 400;

// state tracking
const isGameRunning = true;
const isPaused = false;

let xPosition = 300;
let yPosition = 500;

let keyState = {};
let playerMissiles = [];
let enemyList = [];
let cannonsReady = true;


const CANVAS = document.getElementById("canvas");
const CTX = CANVAS.getContext("2d");

//Start game loop
window.onload = ( ) => {
     // const CANVAS = document.getElementById("CANVAS");
     // const CTX = CANVAS.getContext("2d");
       initBackground();


        //todo move this
        generateWave(1);
        populateGridNow();
        document.addEventListener("keydown",handleKeyPress,true);
        document.addEventListener("keyup", handleKeyUp, true);
    
        setInterval(gameLoop, 33); // roughly 30 FPS

};


function handleKeyState(){
    if(keyState.left){
        if(isGameRunning && !isPaused){
            xPosition=  xPosition - moveSpeedX; // up is negative
            if (xPosition  < 0){  // bounding left movement to CANVAS edge
                xPosition = 0 ;
            }
        }
    }
    if(keyState.up){

        if(isGameRunning && !isPaused){
            yPosition= yPosition - moveSpeedY; // up is negative
            if (yPosition - ySpriteOffset < yMoveLimit){
                yPosition = yMoveLimit + ySpriteOffset;
            }
        }
    }
    if(keyState.right){
        if(isGameRunning && !isPaused){
            xPosition=  xPosition + moveSpeedX; // up is negative
            if (xPosition + spriteWidth > WIDTH){  // bounding right movement to CANVAS edge
                xPosition =  WIDTH - spriteWidth;
            }
        }
    }

    if(keyState.down){
        if(isGameRunning && !isPaused){
            yPosition= yPosition + moveSpeedY; // up is negative
            if (yPosition + spriteHeight > HEIGHT){
                yPosition = HEIGHT - spriteHeight;
            }
        }
    }

    if(keyState.action){
        playerAttack();
    }
    if(keyState.action == false){
        cannonsReady = true;

    }
}
function gameLoop(){
    handleKeyState();
    processEnemyMovement();
    drawBackground(CTX);

    //player sprite
    //CTX.fillStyle = "red";
    //CTX.fillRect(xPosition,yPosition, spriteWidth, spriteHeight);

    drawPlayer(CTX);
    drawEnemies(CTX);

    //player missles
    for (let i =0; i< playerMissiles.length; i++){
        CTX.fillStyle = "#FFFFFF";
        CTX.fillRect(playerMissiles[i].x, playerMissiles[i].y, 2, 10);
    }
    updateMissiles()

}

function drawPlayer(ctx){
    let xStart = xPosition;
    let yStart = yPosition + spriteHeight;
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(xStart,yStart); // bottom left corner
    ctx.lineTo(xStart + (spriteWidth/2), yPosition);
    ctx.lineTo(xStart + spriteWidth, yStart);
    ctx.lineTo(xStart +(spriteWidth/2), yPosition +(spriteHeight/2));
    ctx.lineTo(xStart,yStart);
    ctx.fill();

}

function updateMissiles(){
    var deleteList = [];
    //move missles up screen
    for (let i =0; i< playerMissiles.length; i++){
        playerMissiles[i].y -= missileSpeed;
        if(playerMissiles[i].y < 0){
            deleteList.push(i);
        }

        // does missle hit target
        for (let j = 0; j < enemyList.length; j++){
            if(playerMissiles[i].x +2 > enemyList[j].currentPos.x && // right edge of missile  intercepts left edge of enemy
                playerMissiles[i].x < enemyList[j].currentPos.x + ENEMYWIDTH){ // left edge of missle intecepts right edge of enemy

                if(playerMissiles[i].y <= enemyList[j].currentPos.y  + ENEMYWIDTH &&                     // does missle line hit leading edge of enemy?
                   playerMissiles[i].y + missileSpeed >= enemyList[j].currentPos.y + ENEMYWIDTH){     // previous spot
                    console.log(" HIT!!!")
                    deleteList.push(i);
                    deleteEnemy(j);
                }
                 else if (playerMissiles[i].y <= enemyList[j].currentPos.y &&                     // does missle line hit leading edge of enemy?
                    playerMissiles[i].y + missileSpeed >= enemyList[j].currentPos.y){                           // does missle hit trailing edge of the enemy somehow?
                    console.log(" HIT!!!")
                    deleteList.push(i);
                    deleteEnemy(j);
                 }

            }

        }

    }
    // TODO - detect hit


    // delete expired missiles
    for(let i =0; i < deleteList.length; i ++){
        playerMissiles.splice(deleteList[i],1);
    }

}
function playerAttack(){
    console.log("PEW PEW!");
if(playerMissiles.length < 3 && cannonsReady){
    playerMissiles.push({x: xPosition +(spriteWidth/ 2) -1 , y: yPosition -10}); // start missle halfway across the sprite  - half of sprite witdh
    cannonsReady = false;

}

}
