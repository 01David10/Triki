const gameBoard = document.querySelector('.game__board');
const messageTurn = document.querySelector('.game__turn');
const endGame = document.querySelector('.endgame');
const endGameResult = document.querySelector('.endgame__result');
const buttonReset = document.querySelector('.endgame__button');

let isturnX = true;
let turn = 0;
let maxTurn = 9;

let players = {
    x: 'cross',
    y: 'circle'
}

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

starGame();

function starGame() {
    messageTurn.textContent = isturnX ? 'X' : 'O';
    createBoard();
    isturnX = true;
    turn = 0;
    endGame.classList.remove('show');
}

function createBoard() {
    const cells = 9;

    while (gameBoard.firstElementChild) {
        gameBoard.firstElementChild.remove();
    }

    for (let i = 0; i < cells; i++) {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.addEventListener('click', handleGame, {once: true});

        gameBoard.append(div);
    }
}

function handleGame(e){
    const currentCell = e.currentTarget;
    const currentTurn = isturnX ? players.x : players.y;

    turn++;
    drawSahpe(currentCell, currentTurn);
    if(checkWinner(currentTurn)) {
        return;
    }    
    if (turn === maxTurn) {
        showEndGame(false);
    }
    changeTurn();
}

function drawSahpe(element, newClass) {
    element.classList.add(newClass);
}

function changeTurn() {
    isturnX = !isturnX;
    messageTurn.textContent = isturnX ? 'X' : 'O';
}

function checkWinner(currentPlayer) {
    const cells = document.querySelectorAll('.cell');
    
    const winner = winningPosition.some(array => {  // itera el array eterno para ver si al menos 1 de los arrays internos tiene en sus 3 posiciones la misma clase (x / o)
        return array.every(position => {    // itera para ver si todas las posiciones del array interno tiene la misma clase (x / o)
            return cells[position].classList.contains(currentPlayer);
        });
    });

    if (!winner) {
        return;
    }
    showEndGame(true);
    return true;
}

function showEndGame(winner) {
    endGame.classList.add('show');

    if (winner) {
        endGameResult.textContent = `¡${isturnX ? 'X' : 'O'} ha ganado el juego!`;
    }
    else {
        endGameResult.textContent = '¡Empate!';
    }
}

buttonReset.addEventListener('click', starGame);