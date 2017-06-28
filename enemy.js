/**
 * Created by tomdt on 6/27/2017.
 */

const SWAYMODIFIER =  1;
const ENEMYWIDTH = 25;
let swayAmount = 0;
let isSwayIncreasing = true;

function generateWave(levelNumber){
    for(let i =0; i < 32; i++){
        let enemy = {};
        enemy.currentPos = {x:0,y:0};
         enemy.type = Math.floor(Math.random() * levelNumber);
         enemy.swayPattern = .5 - Math.random() * SWAYMODIFIER;
         if (i == 1 || i == 4){ enemy.type = 9;}
         enemyList.push(enemy);
    }

}

function populateGridNow(){
    // 0 1 2 3 4 5 6 7
    // 8 9 0 1 2 3 4 5
    // 6 7 8 9 0 1 2 3
    // 4 5 6 7 8 9 0 1

    for (i = 0; i < 32; i++){

        let y = (Math.floor( i / 8 ) * 50) + 50; // rows
        let x = ((i % 8) * 60 ) + 65;  // columns
        if(Math.floor(i /8) % 2 == 1 ){ x += 25};

        enemyList[i].currentPos.x = x;
        enemyList[i].currentPos.y = y;

        console.log("x: "+x+" - y: "+y);
    }
}

function processEnemyMovement(){

    //Sway
    if(isSwayIncreasing){
        swayAmount +=1;
        for(let i = 0 ; i< enemyList.length; i++){
            enemyList[i].currentPos.x += enemyList[i].swayPattern;
        }
    }
    else {
        swayAmount -= 1;
        for(let i = 0 ; i< enemyList.length; i++){
            enemyList[i].currentPos.x -= enemyList[i].swayPattern;
        }
    };

    if (swayAmount > 25){
        isSwayIncreasing = false;
    }
    if (swayAmount < 1){
        isSwayIncreasing = true;
        for(let i = 0 ; i< enemyList.length; i++){
            enemyList[i].swayPattern = .5 - Math.random() *SWAYMODIFIER;
        }
    }

}

function drawEnemies(ctx){
   for(let i = 0 ; i< enemyList.length; i++){

       ctx.fillStyle = "#5588ff";
       ctx.fillRect(enemyList[i].currentPos.x, enemyList[i].currentPos.y, ENEMYWIDTH, ENEMYWIDTH);

   }
}
function deleteEnemy(index) {
    enemyList.splice(index,1);

}
