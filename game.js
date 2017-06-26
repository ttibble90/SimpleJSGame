/**
 * Created by tomdt on 6/23/2017.
 */

const xWidth = 600;
const yHeight = 600;
const moveSpeedX = 2;
const moveSpeedY = 2;

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


const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");

//Start game loop
window.onload = function(){
     // const canvas = document.getElementById("canvas");
     // const canvasContext = canvas.getContext("2d");
    document.addEventListener("keydown",handleKeyPress,true);
    
    setInterval(gameLoop, 33); // roughly 30 FPS

};

function handleKeyPress(keyEvent){
    switch(keyEvent.keyCode){
        //left keys
        case 37:
        case 65:
            if(isGameRunning && !isPaused){
                xPosition=  xPosition - moveSpeedX; // up is negative
                if (xPosition - xSpriteOffset < 0){  // bounding left movement to canvas edge
                    xPosition = 0 + xSpriteOffset;
                }
            }

            break;
        // up keys
        case 38:
        case 87:
            if(isGameRunning && !isPaused){
                yPosition= yPosition - moveSpeedY; // up is negative
                if (yPosition - ySpriteOffset < yMoveLimit){
                    yPosition = yMoveLimit + ySpriteOffset;
                }
            }
            break;

        //right keys
        case 39:
        case 68:
            if(isGameRunning && !isPaused){
                xPosition=  xPosition + moveSpeedX; // up is negative
                if (xPosition + xSpriteOffset > xWidth){  // bounding left movement to canvas edge
                    xPosition = 0 - xSpriteOffset;
                }
            }
            break;

        //down keys
        case 40:
        case 83:
            if(isGameRunning && !isPaused){
                yPosition= yPosition + moveSpeedY; // up is negative
                if (yPosition + ySpriteOffset > yHeight){
                    yPosition = yMoveLimit - ySpriteOffset;
                }
            }
             break;

        //Start

        //Action
    }


}
function gameLoop(){



    //background
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0,0, xWidth, yHeight);
    //player sprite
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(xPosition,yPosition, spriteWidth, spriteHeight);
}