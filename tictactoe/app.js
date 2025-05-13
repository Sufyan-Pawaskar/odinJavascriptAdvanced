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

let playerOne = createPlayer("sufyan",1);
let playerTwo = createPlayer("luffy",2);
console.log(playerOne);
console.log(playerTwo);
let gameBoard = (function(){
    let boardObj = {
        "first":{"A1":1,"B1":2,"C1":3},
        "second":{"A2":4,"B2":5,"C2":6},
        "third":{"A3":7,"B3":8,"C3":9}
    };
    const updateBoard = function(rowNum,cellNum,value){
        let toUpdate = checkValid(rowNum,cellNum);
        if (toUpdate){
            boardObj[rowNum][cellNum] = value;
        }else{
            alert("The cell already has a value entered.");
        }
        
    }
    const checkValid = function (rowNum,cellNum){
        if(boardObj[rowNum][cellNum] !== "X" || boardObj[rowNum][cellNum] !== "O" ){
            return false;
        }else{
            return true;
        }
    }
    const checkBoardWinner = function (playerone,playertwo){
        let firstObj = boardObj["first"];
        let secondObj = boardObj["second"];
        let thirdObj = boardObj["third"];
        let winner = false;
        let playeroneMarker = playerone.getPlayerMarker();
        let playertwoMarker = playertwo.getPlayerMarker();
        let marker = "";
        let gameWinner = "";
        if(firstObj["A1"] === firstObj["B1"] && firstObj["B1"] === firstObj["C1"]){
            winner = true;
            marker = firstObj["A1"];
        } else if(secondObj["A2"] === secondObj["B2"] && secondObj["B2"] === secondObj["C2"]){
            winner = true;
            marker = secondObj["A2"]             
        } else if(thirdObj["A3"] === thirdObj["B3"] && thirdObj["B3"] === thirdObj["C3"]){
            winner = true;
            marker = thirdObj["A3"]
        } else if(firstObj["A1"] == secondObj["A2"] && secondObj["A2"] == thirdObj["A3"]){
            winner = true;
            marker = firstObj["A1"]
        } else if(firstObj["B1"] == secondObj["B2"] && secondObj["B2"] == thirdObj["B3"]){
            winner = true;
            marker = firstObj["B1"];
        } else if(firstObj["C1"] == secondObj["C2"] && secondObj["C2"] == thirdObj["C3"]){
            winner = true;
            marker = firstObj["C1"]
        } else if(firstObj["A1"] == secondObj["B2"] && secondObj["B2"] == thirdObj["C3"]){
            winner = true;
            marker = firstObj["A1"]
        } else if(firstObj["C1"] == secondObj["B2"] && secondObj["B2"] == thirdObj["A3"]){
            winner = true;
            marker = firstObj["C1"]
        }
        if(winner){
            if (marker === playeroneMarker){
                gameWinner = playerOne.name;
            } else if(marker === playertwoMarker){
                gameWinner = playerTwo.name;
            }
        }
        return {winner,gameWinner}
    }
    const checkBoardTie = function(){
        let firstObj = Object.values(boardObj["first"]);
        let secondObj = Object.values(boardObj["second"]);
        let thirdObj = Object.values(boardObj["third"]);
        let tie = (firstObj.includes("X","O") && secondObj.includes("X","O") && thirdObj.includes("X","O"));
        return tie;
    }
    return {updateBoard,checkValid,checkBoardWinner,checkBoardTie}
})();
let tie = gameBoard.checkBoardTie();
let winner = gameBoard.checkBoardWinner(playerOne,playerTwo);
