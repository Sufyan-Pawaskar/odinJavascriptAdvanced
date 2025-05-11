function createPlayer(playerName, playerNumber){
    let name = playerName;
    let number = playerNumber;
    let playerResult = false;
    let playerMarker = "";
    const getResult = function(){
        return playerResult;
    }
    const updatePlayerResult = function (result){
        playerResult = result;
    }
    const updatePlayerMarker = function (marker){
        playerMarker = marker;
    }
    const getPlayerMarker = function (){
        return playerMarker;
    }
    return {name,number,getResult,updatePlayerResult,getPlayerMarker,updatePlayerMarker}
}

let playerOne = createPlayer(prompt("Please enter your name here: "),1);
let playerTwo = createPlayer(prompt("Please enter your name here: "),2);
console.log(playerOne);
console.log(playerTwo);
let gameBoard = (function(){
    let boardArray = [
        {"A1":"","B1":"","C1":""},
        {"A2":"","B2":"","C2":""},
        {"A3":"","B3":"","C3":""}
    ];
    const updateBoard = function(rowNum,cellNum,value){
        let toUpdate = checkValid(rowNum,cellNum);
        if (toUpdate){
            boardArray[rowNum][cellNum] = value;
        }else{
            alert("The cell already has a value entered.");
        }
        
    }
    const checkValid = function (rowNum,cellNum){
        if(boardArray[rowNum][cellNum] !== ""){
            return false;
        }else{
            return true;
        }
    }
})();