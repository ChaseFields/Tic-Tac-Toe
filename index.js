//global variables

const boxes = document.querySelectorAll('.box');
const xAndO = document.querySelectorAll('span');
let userIsXOrO;
let computerIsXOrO;
let cantMoveHere = [];
let numOfMoves = 0;
let initialBoardState = '012345678'
let updatedBoardState = ''
let winnerMessage;
let easyOption = document.getElementById('easy-option');
let hardOption = document.getElementById('hard-option');


//function places user choices on the board and calls the computer choice
function userMove(e, index){
    if(userIsXOrO === undefined || boxes[index].innerHTML != '') return;
    boxes[index].classList.add('user-move-styling');
    e.target.innerHTML = userIsXOrO;
    numOfMoves++;
    cantMoveHere.push(index);
    trackGameState(e.target.innerHTML, index);
    gameOver();
    setTimeout(handleComputerMove, 1200);
}


//function controls the computer's move
function handleComputerMove(){
    if(winnerMessage != undefined) return;
    let move
    let randomNum = Math.floor(Math.random() * 9);
    while(cantMoveHere.includes(randomNum)){
         randomNum = Math.floor(Math.random() * 9);
    }   
        move = boxes[randomNum];
        move.classList.add('computer-move-styling');
        move.innerHTML = computerIsXOrO;
        cantMoveHere.push(randomNum);
        numOfMoves++;
        trackGameState(move.innerHTML, randomNum)
        gameOver();
}

function hardComputerMove(){
    if(winnerMessage != undefined) return;
    if(numOfMoves === 1){
    }
}

//function keeps track of the game state as a string 

function trackGameState(move, boxPosition){
    if(numOfMoves === 1){
         return updatedBoardState = initialBoardState.replace(initialBoardState.charAt(boxPosition), move)
    }else{
       return updatedBoardState = updatedBoardState.replace(updatedBoardState.charAt(boxPosition), move)
    }
    //let pattern1 = /(X|O)(?=X{2}|Y{2})/g possible regex solutions for winner testing?
}


//function determines the winning player by passing in the moves and checking them against the board state string
function winningPlayer(p1, p2, p3){
    let box1 = updatedBoardState.charAt(p1);
    let box2 = updatedBoardState.charAt(p2);
    if(box1 != box2) return false;
    let box3 = updatedBoardState.charAt(p3);
    if(box1 != box3) return false;
    winnerMessage = document.getElementById('first-move-message')
    winnerMessage.classList.add('winner-message');
    if(userIsXOrO === 'X' && box1 === 'X'){
        winnerMessage.innerHTML = 'Well, I guess you win this one :('
    }else if (userIsXOrO === 'O' && box1 === 'O'){
        winnerMessage.innerHTML = 'Well, I guess you win this one :('
    }else{
        winnerMessage.innerHTML = 'Oh yeah! I win! :)'
    }
    
    return true;
}

function noWinner(){
    for(let i = 0; i > 9; i++){
        console.log('hi')
        if(updatedBoardState[i] === /[0-8]/g){ 
           console.log('still going')
    }else{
        winnerMessage = document.getElementById('first-move-message')
        winnerMessage.innerHTML = 'We tied on this one!'
    }
}
}

//function calls the winning player function until a winning pattern is found
function gameOver(){
    return winningPlayer('0', '1', '2')
     || winningPlayer('3', '4', '5')
     || winningPlayer('6', '7', '8')
     || winningPlayer('0', '3', '6')
     || winningPlayer('1', '4', '7')
     || winningPlayer('2', '5', '8')
     || winningPlayer('0', '4', '8')
     || winningPlayer('6', '4', '2')
     || noWinner();
}   


//event listener calls function that places users choice on the board
boxes.forEach((box, index) => box.addEventListener('click', e => userMove(e, index)));


//event listener sets the X and O's for user and program. Also controls the first move message to the user.
xAndO.forEach(option => option.addEventListener('click', e => {
    if(userIsXOrO != undefined) return;
    let firstMoveMessage = document.getElementById('first-move-message')
    let id = e.target.id;
    let choice = document.getElementById(`${id}`)
    userIsXOrO = id;
    choice.style.color = 'white';
    if(userIsXOrO === 'X'){
        computerIsXOrO = 'O'
        firstMoveMessage.innerHTML = 'OK. You\'ve got the first move! I\'ll move shortly after you do.'
        firstMoveMessage.style.opacity = '1';
        setTimeout(() => firstMoveMessage.innerHTML = '', 4000)
    }else{
        computerIsXOrO = 'X';
        firstMoveMessage.innerHTML = 'Alright. I\'ll take the first move.'
        firstMoveMessage.style.opacity = '1';
        setTimeout(handleComputerMove, 1200);
        setTimeout(() => firstMoveMessage.innerHTML = '', 4000)
    }
}))

//event listener calls on click a function that resets everything to default state

document.getElementById('start-over-button').addEventListener('click', () => location.reload())


