/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var activePlayer = 0 /* 0 is the first player, 1 is the second player */
var gamePlaying; /* State variable */

/* 
    Setup
*/

setUp();
function setUp() {
gamePlaying = true;
document.querySelector('.dice').style.display = 'none';
document.querySelector('#score-0').textContent = 0;
document.querySelector('#score-1').textContent = 0;
document.querySelector('#current-0').textContent = 0;
document.querySelector('#current-1').textContent = 0;
document.querySelector('#name-0').textContent = 'Player 1';
document.querySelector('#name-1').textContent = 'Player 2';
}

/* 
    Reset if new game is selected 
*/
document.querySelector('.btn-new').addEventListener('click', setUp);

/* 
   Change display based on value of dice rolled. 
   Update current score by converting to number, then adding dice value to it.
   Then store new score in current score.

   Reset and switch control if a 1 is rolled.
*/
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;

    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = 'dice-' + dice + '.png';

    if (dice > 1 && activePlayer === 0) {
        var score = document.querySelector('#current-0');
        var num = Number(score.textContent);
        var newScore = num + dice;
        score.textContent = newScore;
    } else if (dice > 1 && activePlayer === 1) {
        var score = document.querySelector('#current-1');
        var num = Number(score.textContent);
        var newScore = num + dice;
        score.textContent = newScore;
    } else if (activePlayer === 0 && dice === 1) {
        activePlayer = 1;
        document.querySelector('#current-0').textContent = 0;
    } else {
        activePlayer = 0;
        document.querySelector('#current-1').textContent = 0;
    }
}
})

/* 
   Update total score by selecting current score and total score, converting
   them to a number and then recomputing total score. Use textContent to update visualization. 
   
   Note: Make sure to reset current score after clicking hold (line 63 and 72) 
*/
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (activePlayer === 0) {
    var currentScore = document.querySelector('#current-0');
    var currentScoreAsNum = Number(currentScore.textContent);
    var totalScore = document.querySelector('#score-0');
    var totalScoreAsNum = Number(totalScore.textContent);
    totalScoreAsNum += currentScoreAsNum;           // New total score
    totalScore.textContent = totalScoreAsNum;       // Set total score
    currentScore.textContent = 0;                   // Reset current score
    activePlayer = 1;
        if (totalScoreAsNum >= 10) {
            document.querySelector('#name-0').textContent = 'WINNER';
            gamePlaying = false;
        }
    } else {
    var currentScore = document.querySelector('#current-1');
    var currentScoreAsNum = Number(currentScore.textContent);
    var totalScore = document.querySelector('#score-1');
    var totalScoreAsNum = Number(totalScore.textContent);
    totalScoreAsNum += currentScoreAsNum;
    totalScore.textContent = totalScoreAsNum;
    currentScore.textContent = 0;
    activePlayer = 0;
        if (totalScoreAsNum >= 10) {
            document.querySelector('#name-1').textContent = 'WINNER';
            gamePlaying = false;
        }
    }
})














