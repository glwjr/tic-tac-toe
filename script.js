const Player = (sign) => {
    this.sign = sign

    const getSign = (sign) => {
        return sign
    }

    return { getSign }
}

const gameBoard = (() => {
    let board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];

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

    //cells.forEach((cell) => {
    //    cell.addEventListener("click", () => {
    //        console.log(cell.dataset.index)
    //    })
    //})

    cells.forEach((cell) => {
        cell.innerHTML = gameBoard.getField(cell.dataset.index);
    })
})();

const gameController = (() => {
    let playerX = Player("X");
    let playerO = Player("O");
    let isOver = false;
    let round = 1;

    const playRound = () => {
        round++
    }

    const getCurrentPlayerSign = () => {
        return (round % 3 == 1 ? playerX.getSign() : playerO.getSign())
    }
    
    return { getCurrentPlayerSign }
})();