/**
 * Created by tomdt on 6/26/2017.
 */




function handleKeyPress(keyEvent){
    switch(keyEvent.keyCode){
        //left keys
        case 37:
        case 65:
            keyState.left =true;
            break;
        // up keys
        case 38:
        case 87:
            keyState.up =true;
            break;

        //right keys
        case 39:
        case 68:
            keyState.right = true;
            break;

        //down keys
        case 40:
        case 83:
            keyState.down  = true;
            break;
        //Start

        //Action
        case 32:
            keyState.action = true;
            break;
    }
}
function handleKeyUp(keyEvent) {
    switch (keyEvent.keyCode) {
        //left keys
        case 37:
        case 65:
            keyState.left = false;
            break;
        // up keys
        case 38:
        case 87:
            keyState.up = false;
            break;

        //right keys
        case 39:
        case 68:
            keyState.right = false;
            break;

        //down keys
        case 40:
        case 83:
            keyState.down = false;
            break;
        //Start

        //Action
        case 32:
            keyState.action = false;
            break;
}
}
