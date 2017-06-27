/**
 * Created by tomdt on 6/26/2017.
 */

const _STARS = [];
const _STAR_COUNT = 80;
const _HEX = "0123456789ABCDEF";

function initBackground(){
    for (let i =0; i< _STAR_COUNT; i++){
        let star = {};
        star.x = Math.random() * WIDTH;
        star.y  = Math.random() * HEIGHT;
        star.size = Math.random() * 2;
        star.color = getColor();

    _STARS.push(star);
    }
}
 function drawBackground(ctx){

    //background
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, WIDTH, HEIGHT);
    //render stars
    for (let i =0; i < _STAR_COUNT; i++){
       let star = _STARS[i];
        ctx.fillStyle = star.color;
        ctx.fillRect(star.x,star.y, star.size, star.size);
    }
}
function getColor(){
    let colorString = "#";
    for(let i = 0; i<6; i++){
       colorString += _HEX[10 + Math.floor(Math.random() *6)];

    }
    return colorString;
}