//setting up webpage
"use strict";
var canvas = document.createElement("canvas"); //make canvas
var scoreText = document.createElement("h4"); //this header will display score
var levelText = document.createElement("h4"); //this header tells you what level you're on
var title = document.createElement("h3"); //this is game title
canvas.id = "gameScreen"; //canvas named gamescreen
canvas.height = 600;
canvas.width = 600;
levelText.id = "levelDisplay";
levelText.innerHTML = "Level: 1";
scoreText.id = "scoreDisplay";
scoreText.innerHTML = "Score: 0"; //starts out as 0, will update whenever a point is added
title.id = "titleText";
title.innerHTML = "Dots";
document.body.appendChild(title);
document.body.appendChild(levelText);
document.body.appendChild(scoreText);
document.body.appendChild(canvas); //add canvas to the webpage
$("#gameScreen").on("click", function(event) {
    handleClick(event);
    event.stopPropagation();
});
//game code below here
var ctx = canvas.getContext("2d");
var lineW = 2; //width of grid lines
var gridSize = 3;
var gameBoard = makeBoard(gridSize, gridSize); //starts as 9x9 grid
var boxSide;
var score = 0;
var gg = false;
var dotNumber = 5;
var matchingPattern = false;
var pattern = [
    [0],
    [0]
]; //2D array to hold dot coords
var patternLength = 0;
var level = 1;
var frameDelay = 500;
var matchDot = 0;
var finishPattern = false;
var everyOther = false;
var theBigLoop = setInterval(function() { //make page run gameloop
        gameLoop();
    },
    frameDelay);

function handleClick(event) {
    if (matchingPattern) {
        var targetX = pattern[0][matchDot] * (boxSide + lineW) + lineW + boxSide/2;
        var targetY = pattern[1][matchDot] * (boxSide + lineW) + lineW + boxSide/2;
        console.log(event.offsetX + " " + event.offsetY);
        if (Math.abs(event.offsetX - targetX) < boxSide/2 && Math.abs(event.offsetY - targetY) < boxSide/2) {
            console.log("You clicked dot #" + (matchDot + 1));
            matchDot++;
        }
        else {
            //Punishment to be added
        }
        if (matchDot == pattern[0].length) {
            matchDot = 0;
            matchingPattern = false;
            finishPattern = true;
        }
    }
}

function updateBoxes(boardThing) {
    boxSide = ((canvas.width - lineW) / boardThing.length) - 2; //finds box size by dividing up total width
}

function makeBoard(a, b) {
    //making arrays with dimensions AxB
    var newBoard = new Array(a);
    for (var i = 0; i < a; i++) {
        newBoard[i] = new Array(b);
    }
    updateBoxes(newBoard);
    return newBoard;
}

function gameLoop() {
    if (!gg) {
        if (finishPattern) {
            document.getElementById("levelDisplay").innerHTML = "Level: " + level;
            if (level % 3 == 0) {
                if (gridSize < 10) {
                    gridSize++;
                    gameBoard = makeBoard(gridSize, gridSize);
                }
            }
            if (level % 5 == 0) {
                if (frameDelay > 100) {
                    frameDelay -= 20;
                    window.clearInterval(theBigLoop);
                    theBigLoop = setInterval(function() { //make page run gameloop
                            gameLoop();
                        },
                        frameDelay);
                }
            }
            if (level % 20 == 0) {
                if (dotNumber < 10) {
                    dotNumber++;
                }
            }
            finishPattern = false;
        }
        if (!matchingPattern) {
            if(everyOther){
                if (patternLength > 0) {
                    gameBoard[pattern[0][patternLength - 1]][pattern[1][patternLength - 1]] = 0; //removes all but final dot?
                }
                everyOther = false;
            }
            else{
            if (patternLength < dotNumber) { //make a pattern to follow
                var dotX = Math.floor(Math.random() * gridSize); //x coord of dot
                var dotY = Math.floor(Math.random() * gridSize); //y coord of dot
                pattern[0][patternLength] = dotX;
                pattern[1][patternLength] = dotY;
                gameBoard[dotX][dotY] = -1;
                patternLength++;
                everyOther = true;
            }
            else { //lemme try something different
                gameBoard[pattern[0][patternLength - 1]][pattern[1][patternLength - 1]] = 0; //removes final dot
                patternLength = 0;
                level++;
                matchingPattern = true;
            }
            }
        }
    }
    drawGame();
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.height, canvas.width);
    ctx.lineWidth = lineW;
    ctx.strokeStyle = "#000000";
    for (var xLine = 0; xLine <= gridSize; xLine++) {
        //horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, lineW / 2 + (boxSide + lineW) * xLine);
        ctx.lineTo(canvas.width, lineW / 2 + (boxSide + lineW) * xLine);
        ctx.stroke();
    }
    for (var yLine = 0; yLine <= gridSize; yLine++) {
        //vertical lines
        ctx.beginPath();
        ctx.moveTo(lineW / 2 + (boxSide + lineW) * yLine, 0);
        ctx.lineTo(lineW / 2 + (boxSide + lineW) * yLine, canvas.height);
        ctx.stroke();
    }
    for (var boxY = 0; boxY < gridSize; boxY++) {
        for (var boxX = 0; boxX < gridSize; boxX++) {
            switch (gameBoard[boxX][boxY]) { //chooses color of each box
                case -1:
                    ctx.fillStyle = "black";
                    break;
                case 0:
                    ctx.fillStyle = "white";
                    break;
                case 1:
                    ctx.fillStyle = "red";
                    break;
                case 2:
                    ctx.fillStyle = "green";
                    break;
                case 3:
                    ctx.fillStyle = "blue";
                    break;
                default:
                    ctx.fillStyle = "white";
                    break;
            }
            ctx.fillRect(lineW + (boxSide + lineW) * boxX, lineW + (boxSide + lineW) * boxY, boxSide, boxSide);
        }
    }
}