function createPlayer(playerName, playerNumber){
    const name = playerName;
    const number = playerNumber;
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
let gameBoard = (function(){
    let boardObj 
    let currentPlayer = null;
    const updateCurrentPlayer = function (playerObj){
        currentPlayer = playerObj;
    }
    const getCurrentPlayer = function (){
        return currentPlayer;
    }
    const initializeBoard = function(){
        boardObj = {
            "first":{"A1":"1","B1":"2","C1":"3"},
            "second":{"A2":"4","B2":"5","C2":"6"},
            "third":{"A3":"7","B3":"8","C3":"9"}
        };
    }
    const updateBoard = function(rowNum,cellNum,value,ele){
        let toUpdate = checkValid(rowNum,cellNum);
        if (toUpdate){
            boardObj[rowNum][cellNum] = value;
            ele.textContent = value;
            ele.style.pointerEvents = "none";
        }else{
            alert("The cell already has a value entered.");
        }
        
    }
    const checkValid = function (rowNum,cellNum){
        if(boardObj[rowNum][cellNum] !== "X" || boardObj[rowNum][cellNum] !=="O"){
            return true;
        }else{
            return false;
        }
    }
    const checkBoardWinner = function (playerone,playertwo){
        let firstObjArr = Object.values(boardObj["first"]);
        let secondObjArr = Object.values(boardObj["second"]);
        let thirdObjArr = Object.values(boardObj["third"]);
        let winner = false;
        let playeroneMarker = playerone.getPlayerMarker();
        let playertwoMarker = playertwo.getPlayerMarker();
        let marker = "";
        let gameWinner = "";
        console.log("checking for the winner!")
        console.log(firstObjArr,secondObjArr,thirdObjArr)
        if ((firstObjArr.includes("X") || firstObjArr.includes("O")) || (secondObjArr.includes("X") || secondObjArr.includes("O")) || (thirdObjArr.includes("X") || thirdObjArr.includes("O"))){
            let firstObj = boardObj["first"];
            let secondObj = boardObj["second"];
            let thirdObj = boardObj["third"];
            console.log(">>>>>>>>board not empty checking the conditions now!")
            console.log(">>>>>>>>checking first horizontal condition")
            if((firstObj["A1"] === firstObj["B1"] && firstObj["B1"] === firstObj["C1"])&&(!firstObjArr.includes(""))){
               console.log(firstObj)
               marker = firstObj["A1"];
               if (marker){
                    winner = true;
                    console.log('>>>>>>>>the following condition is true: firstObj["A1"] === firstObj["B1"] && firstObj["B1"] === firstObj["C1"]')
               }
            } else if((secondObj["A2"] === secondObj["B2"] && secondObj["B2"] === secondObj["C2"]) &&(!secondObjArr.includes(""))){
                marker = secondObj["A2"];
                if (marker){
                    winner = true;
               }
            } else if((thirdObj["A3"] === thirdObj["B3"] && thirdObj["B3"] === thirdObj["C3"]) &&(!thirdObjArr.includes(""))){
                marker = thirdObj["A3"];
                console.log("3rd horizontal line check marker: ",marker," thirdObj: ",thirdObj);
                if (marker){
                    winner = true;
               }
            } else if(firstObj["A1"] == secondObj["A2"] && secondObj["A2"] == thirdObj["A3"]){
                marker = firstObj["A1"]
                if (marker){
                    winner = true;
               }
            } else if(firstObj["B1"] == secondObj["B2"] && secondObj["B2"] == thirdObj["B3"]){
                marker = firstObj["B1"];
                if (marker){
                    winner = true;
               }
            } else if(firstObj["C1"] == secondObj["C2"] && secondObj["C2"] == thirdObj["C3"]){
                marker = firstObj["C1"]
                if (marker){
                    winner = true;
               }
            } else if(firstObj["A1"] == secondObj["B2"] && secondObj["B2"] == thirdObj["C3"]){
                marker = firstObj["A1"]
                if (marker){
                    winner = true;
               }
            } else if(firstObj["C1"] == secondObj["B2"] && secondObj["B2"] == thirdObj["A3"]){
                marker = firstObj["C1"]
                if (marker){
                    winner = true;
               }
            }
        };
        if(winner){
            if (marker === playeroneMarker){
                gameWinner = playerone.name;
            } else if(marker === playertwoMarker){
                gameWinner = playertwo.name;
            }
        }
        return {winner,gameWinner}
    }
    const checkBoardTie = function(){
        let firstObj = Object.values(boardObj["first"]);
        let secondObj = Object.values(boardObj["second"]);
        let thirdObj = Object.values(boardObj["third"]);
        let tie = (!checkArr(firstObj,['1',"2","3"]) && !checkArr(secondObj,['4',"5","6"]) && !checkArr(thirdObj,['7',"8","9"]));
        console.log("Is Tie: ",tie)
        return tie;
    }

    function printBoard(){
        console.log(boardObj.first.A1,"|",boardObj.first.B1,"|",boardObj.first.C1);
        console.log("_","_","_");
        console.log(boardObj.second.A2,"|",boardObj.second.B2,"|",boardObj.second.C2);
        console.log("_","_","_");
        console.log(boardObj.third.A3,"|",boardObj.third.B3,"|",boardObj.third.C3);
    }
    return {updateBoard,checkValid,checkBoardWinner,checkBoardTie,initializeBoard,updateCurrentPlayer,getCurrentPlayer,printBoard}
})();

function checkArr(arr,ele){
    var isElement = false;
    ele.forEach((el) => {
        arr.forEach((arrEl)=>{
            // console.log("arrEl: ",arrEl," el: ",el )
            if (el === arrEl){
                console.log("arrEl: ",arrEl," el: ",el );
                isElement = true;
            }
        })
    })
    return isElement
}



function controller(board,pl1,pl2){

    let players = {
        "player1":pl1,
        "player2":pl2,
    };

    let boardRowTrans = {
        "1":"first",
        "2":"second",
        "3":"third"
    }
    const boardCellTrans = {
        "first" : {"1":"A1","2":"B1","3":"C1"},
        "second" : {"1":"A2","2":"B2","3":"C2"},
        "third" : {"1":"A3","2":"B3","3":"C3"}
    }
    const switchTurn= function(currPlayer){
        if (board.getCurrentPlayer().number == 1){
            board.updateCurrentPlayer(players["player2"]);
        } else{
            board.updateCurrentPlayer(players["player1"]);
        }
        let msg = board.getCurrentPlayer().name+" please play your turn, your marker is "+board.getCurrentPlayer().getPlayerMarker()+" proceed by clicking empty cell on game board."
        updateMessage(msg)
    };

    const getPlayerInput = function(event){
        console.log(event.target, " clicked!")
        let clickedCell = event.target;
        let validInput = false;
        let currPlayerName = board.getCurrentPlayer().name;
        let currPlayerMarker = board.getCurrentPlayer().getPlayerMarker();
        let row = clickedCell.dataset.row;
        let cell = clickedCell.dataset.cell;
        let validBoardEntry = board.checkValid(row,cell);
        if (validBoardEntry){
            board.updateBoard(row,cell,currPlayerMarker,clickedCell);
            let checkTie = board.checkBoardTie();
            let winnerObj = board.checkBoardWinner(players["player1"],players["player2"]);
            if(winnerObj.winner){
                let winMsg = "Congrats "+ winnerObj.gameWinner+ " you have won the game.!";
                updateMessage(winMsg);
                console.log("Congrats ", winnerObj.gameWinner, " you have won the game.!")
                board.printBoard();
                restartButton.classList.remove('hidden');
                exitButton.classList.remove('hidden');
            } else if(checkTie){
                let tieMsg = "Hmm.. we have a tie try again."
                updateMessage(tieMsg);
                console.log("Hmm.. we have a tie try again.");
                board.printBoard();
                restartButton.classList.remove('hidden');
                exitButton.classList.remove('hidden')
            } else{
                switchTurn(board.getCurrentPlayer());
            }
        }else{
            msg = currPlayerName+" you clicked on an occupied cell, please play your turn again your marker is "+currPlayerMarker+" proceed by clicking empty cell on game board."
            updateMessage(msg)
        }
    }
    return{getPlayerInput}
}

function playGame(pl1,pl2,startButton,restartButton,exitButton){
    startButton.classList.add('hidden')

    let players = false;
    var playerOne;
    var playerTwo;
    if (playerOne && playerTwo){
        players = true;
    }
    if (!playerOne){
        playerOne = createPlayer(pl1,1);
        playerOne.updatePlayerMarker("X");
        console.log(playerOne.name, " created with marker, ",playerOne.getPlayerMarker());
    }
    if (!playerTwo){
        playerTwo = createPlayer(pl2,2);
        playerTwo.updatePlayerMarker("O");
        console.log(playerTwo.name," created with marker, ",playerTwo.getPlayerMarker());
    }
    console.log("playerOne.getPlayerMarker()",playerOne)
    gameBoard.initializeBoard();
    console.log("GameBoard has been intialized.");
    gameBoard.updateCurrentPlayer(playerOne);//by default first turn would be for player one.
    gameBoard.printBoard();
    let msg = gameBoard.getCurrentPlayer().name+" please play your turn, your marker is "+gameBoard.getCurrentPlayer().getPlayerMarker()+" proceed by clicking empty cell on game board."
    updateMessage(msg)
    let gameController = controller(gameBoard,playerOne,playerTwo);
    const grid = document.querySelectorAll(".item");
    grid.forEach(cell => {
        cell.textContent="";
        cell.addEventListener("click",(event)=>{
            gameController.getPlayerInput(event);
        })
    });
}

const getInput = function(ele){
    let value = ele.value;
    return value;
};

const updateMessage = function(msgContent){
    const messageArea = document.getElementById("messageAreaDiv");
    messageArea.textContent = msgContent;
    console.log("updated the following message: ",msgContent)
}


var startButton = document.getElementById("startGame");
var restartButton = document.getElementById("restartGame");
var exitButton = document.getElementById("exitGame");
document.addEventListener("DOMContentLoaded",(event)=>{
    console.log("DomContents are loaded.!");
    
    let playerOneInp = document.getElementById("playerOne");
    let playerTwoInp = document.getElementById("playerTwo");
    
    restartButton.classList.add('hidden');
    exitButton.classList.add('hidden');
    startButton.classList.remove('hidden');

    const startGame = function(){
        restartButton.classList.add('hidden');
        exitButton.classList.add('hidden');
        startButton.classList.remove('hidden');
        let playerInput1 = getInput(playerOneInp);
        let playerInput2 = getInput(playerTwoInp);
        if (playerInput1 && playerInput2){
            playGame(playerInput1,playerInput2,startButton,restartButton,exitButton);
            // updateMessage("");
        }else{
            updateMessage("Please enter Player names before proceeding with the game.")
        }
        
    }
    startButton.addEventListener("click",(event) => {
        startGame();
    });
    restartButton.addEventListener("click",(event)=>{
        // updateMessage("");
        window.location.reload();
    })
    exitButton.addEventListener("click",(event)=>{
        window.location.reload();
    })
    
})