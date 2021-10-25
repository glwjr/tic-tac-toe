const Player = (sign) => {

    const getSign = () => {
        return sign
    }

    return { getSign }
}

const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, sign) => {
        if(board[index] !== "") {
            return
        }

        board[index] = sign;
    }

    const getField = (index) => {
        return board[index]
    }

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = ""
        }
    }

    return { setField, getField, reset }

})();

const displayController = (() => {
    const gameStatus = document.getElementById("game-status");

    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", () => {
        reset();
    })

    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            gameController.playRound(cell.dataset.index);
            cell.innerHTML = gameBoard.getField(cell.dataset.index);
        })
    })

    const setGameMessage = (sign) => {
        gameStatus.innerHTML = `Player ${sign}'s turn`
    }

    const setWinningMessage = (sign) => {
        gameStatus.innerHTML = `Player ${sign} wins!`
    }

    const setTieMessage = () => {
        gameStatus.innerHTML = "It's a tie! Game over."
    }

    const reset = () => {
        cells.forEach((cell) => {
            cell.innerHTML = "";
        })

        gameStatus.innerHTML = "Click a spot to begin. Player X's turn."
        gameController.reset();
        gameBoard.reset();
    }

    return { setGameMessage, setWinningMessage, setTieMessage }

})();

const gameController = (() => {
    let playerX = Player("X");
    let playerO = Player("O");
    let playerWins = false;
    let round = 1;

    const playRound = (cellIndex) => {
        if(gameBoard.getField(cellIndex) !== "") {
            return
        }

        if(playerWins == false && round < 10) {
            gameBoard.setField(cellIndex, getCurrentPlayerSign());
        }

        checkWinner();

        if(playerWins == true) {
            displayController.setWinningMessage(getCurrentPlayerSign());
            return
        }

        if(playerWins == false && round == 9) {
            displayController.setTieMessage();
            return
        }

        round++

        displayController.setGameMessage(getCurrentPlayerSign());
    }

    const getCurrentPlayerSign = () => {
        return (round % 2 == 1 ? playerX.getSign() : playerO.getSign())
    }

    const checkWinner = () => {
        const winConditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        winConditions.forEach(function(row) {
            let a = row[0], b = row[1], c = row[2];
            if (gameBoard.getField(a) !== "" && 
                gameBoard.getField(a) == gameBoard.getField(b) && 
                gameBoard.getField(b) == gameBoard.getField(c)) {
                playerWins = true;
            }
        })
    }

    const reset = () => {
        playerWins = false;
        round = 1;
    }
    
    return { playRound, reset }
    
})();