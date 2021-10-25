const Player = (sign) => {
    this.sign = sign

    const getSign = () => {
        return sign
    }

    return { getSign }
}

const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, sign) => {
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

    return { setGameMessage }
})();

const gameController = (() => {
    let playerX = Player("X");
    let playerO = Player("O");
    let isOver = false;
    let round = 1;

    const playRound = (cellIndex) => {
        gameBoard.setField(cellIndex, getCurrentPlayerSign());
        round++
        displayController.setGameMessage(getCurrentPlayerSign());
    }

    const getCurrentPlayerSign = () => {
        return (round % 2 == 1 ? playerX.getSign() : playerO.getSign())
    }

    //const checkIfWinner = () => {
    //    const winConditions = [
    //        [0,1,2],
    //        [3,4,5],
    //        [6,7,8],
    //        [0,3,6],
    //        [1,4,7],
    //        [2,5,8],
    //        [0,1,2],
    //        [3,4,5],
    //        [6,7,8]
    //    ]
    //}
    
    return { playRound }
})();