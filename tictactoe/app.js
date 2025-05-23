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
            "first":{"A1":"","B1":"","C1":""},
            "second":{"A2":"","B2":"","C2":""},
            "third":{"A3":"","B3":"","C3":""}
        };
    }
    const updateBoard = function(rowNum,cellNum,value){
        let toUpdate = checkValid(rowNum,cellNum);
        if (toUpdate){
            boardObj[rowNum][cellNum] = value;
        }else{
            alert("The cell already has a value entered.");
        }
        
    }
    const checkValid = function (rowNum,cellNum){
        if(boardObj[rowNum][cellNum] === ""){
            return true;
        }else{
            return false;
        }
    }
    const checkBoardWinner = function (playerone,playertwo){
        let firstObj = Object.values(boardObj["first"]);
        let secondObj = Object.values(boardObj["second"]);
        let thirdObj = Object.values(boardObj["third"]);
        let winner = false;
        let playeroneMarker = playerone.getPlayerMarker();
        let playertwoMarker = playertwo.getPlayerMarker();
        let marker = "";
        let gameWinner = "";
        if (!firstObj.includes("") && !secondObj.includes("") && !thirdObj.includes("")){
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
        let tie = (firstObj.includes("X","O") && secondObj.includes("X","O") && thirdObj.includes("X","O"));
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

function controller(board){
    console.log
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
    
    const getPlayerInput = function(){
        let validInput = false;
        let currPlayerName = board.getCurrentPlayer().name;
        let currPlayerMarker = board.getCurrentPlayer().getPlayerMarker();
        while (!validInput) {
            let msg = currPlayerName+" please play your turn again, your marker is "+currPlayerMarker+" (eg.input: row,cell,value .i.e. 1,2,"+currPlayerMarker+") please enter your input here: ";
            let playerInput = prompt(msg);
            let playerInputArr = playerInput.split(",")
            validInput = playerInputArr.length == 3 ? true : false;
            if (validInput){
                let row = boardRowTrans[playerInputArr[0]];
                let cell = undefined;
                if (row){
                    cell = boardCellTrans[row][playerInputArr[1]];
                }
                let value = playerInputArr[2].toUpperCase();
                
                let validVals = (row && cell && value == currPlayerMarker) ? true : false;
                if (!validVals){
                    validInput = false;
                } else if (validVals) {
                    let validBoardEntry = board.checkValid(row,cell);
                    if (validBoardEntry){
                        board.updateBoard(row,cell,value);
                    } else{
                        validInput = false;
                    }
                }
            }
        }
        console.log(currPlayerName,"'s turn has been completed!");
        board.printBoard();
    }
    return{getPlayerInput}
}

function playGame (){
    let players = false;
    var playerOne;
    var playerTwo;
    while (!players) {
        if (playerOne && playerTwo){
            players = true;
        }
        if (!playerOne){
            playerOne = createPlayer(prompt("Player 1 please enter your name here and press enter: "),1);
            playerOne.updatePlayerMarker("X");
            console.log(playerOne.name, " created with marker, ",playerOne.getPlayerMarker());
        }
        if (!playerTwo){
            playerTwo = createPlayer(prompt("Player 2 please enter your name here and press enter: "),2);
            playerTwo.updatePlayerMarker("O");
            console.log(playerTwo.name," created with marker, ",playerTwo.getPlayerMarker());
        }
    };
    console.log("playerOne.getPlayerMarker()",playerOne)
    gameBoard.initializeBoard();
    console.log("GameBoard has been intialized.");
    gameBoard.updateCurrentPlayer(playerOne);//by default first turn would be for player one.
    gameBoard.printBoard();
    let gameController = controller(gameBoard);
    
    while (!gameBoard.checkBoardWinner(playerOne,playerTwo).winner || !gameBoard.checkBoardTie()) {
        let playerInTurn = gameBoard.getCurrentPlayer()
        console.log("Currently player's ",playerInTurn.name," needs to play for ", playerInTurn.getPlayerMarker());
        gameController.getPlayerInput();
        if (gameBoard.getCurrentPlayer().number == 1){
            gameBoard.updateCurrentPlayer(playerTwo);
        } else{
            gameBoard.updateCurrentPlayer(playerOne);
        }
    }

    //once the code reaches this stage that means either the game is tied or else we have a winner.
    let checkTie = gameBoard.checkBoardTie();
    let winnerObj = gameBoard.checkBoardWinner(playerOne,playerTwo);
    if(checkTie){
        console.log("Hmm.. we have a tie try again.");
        gameBoard.printBoard();
    } else if(winnerObj.winner){
        console.log("Congrats ", winnerObj.gameWinner, " you have won the game.!")
        gameBoard.printBoard();
    }
}

