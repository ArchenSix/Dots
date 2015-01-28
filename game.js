<<<<<<< HEAD
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
=======
{"filter":false,"title":"game.js","tooltip":"/game.js","undoManager":{"mark":100,"position":100,"stack":[[{"group":"doc","deltas":[{"start":{"row":128,"column":13},"end":{"row":130,"column":12},"action":"insert","lines":["","                ","            "]}]}],[{"group":"doc","deltas":[{"start":{"row":129,"column":12},"end":{"row":129,"column":16},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":129,"column":8},"end":{"row":129,"column":12},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":129,"column":4},"end":{"row":129,"column":8},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":129,"column":0},"end":{"row":129,"column":4},"action":"remove","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":128,"column":13},"end":{"row":129,"column":0},"action":"remove","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":41,"column":26},"end":{"row":42,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":0},"end":{"row":42,"column":1},"action":"insert","lines":["v"]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":1},"end":{"row":42,"column":2},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":2},"end":{"row":42,"column":3},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":3},"end":{"row":42,"column":4},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":4},"end":{"row":42,"column":5},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":5},"end":{"row":42,"column":6},"action":"insert","lines":["v"]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":6},"end":{"row":42,"column":7},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":7},"end":{"row":42,"column":8},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":8},"end":{"row":42,"column":9},"action":"insert","lines":["y"]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":9},"end":{"row":42,"column":10},"action":"insert","lines":["O"]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":10},"end":{"row":42,"column":11},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":11},"end":{"row":42,"column":12},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":12},"end":{"row":42,"column":13},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":13},"end":{"row":42,"column":14},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":14},"end":{"row":42,"column":15},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":15},"end":{"row":42,"column":16},"action":"insert","lines":["="]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":16},"end":{"row":42,"column":17},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":17},"end":{"row":42,"column":18},"action":"insert","lines":["f"]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":18},"end":{"row":42,"column":19},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":19},"end":{"row":42,"column":20},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":20},"end":{"row":42,"column":21},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":21},"end":{"row":42,"column":22},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":42,"column":22},"end":{"row":42,"column":23},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":113,"column":17},"end":{"row":114,"column":0},"action":"insert","lines":["",""]},{"start":{"row":114,"column":0},"end":{"row":114,"column":16},"action":"insert","lines":["                "]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":16},"end":{"row":114,"column":17},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":17},"end":{"row":114,"column":18},"action":"insert","lines":["v"]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":18},"end":{"row":114,"column":19},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":19},"end":{"row":114,"column":20},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":16},"end":{"row":114,"column":20},"action":"remove","lines":["ever"]},{"start":{"row":114,"column":16},"end":{"row":114,"column":26},"action":"insert","lines":["everyOther"]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":26},"end":{"row":114,"column":27},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":27},"end":{"row":114,"column":28},"action":"insert","lines":["="]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":28},"end":{"row":114,"column":29},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":29},"end":{"row":114,"column":30},"action":"insert","lines":["f"]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":30},"end":{"row":114,"column":31},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":31},"end":{"row":114,"column":32},"action":"insert","lines":["l"]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":32},"end":{"row":114,"column":33},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":33},"end":{"row":114,"column":34},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":114,"column":34},"end":{"row":114,"column":35},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":123,"column":32},"end":{"row":124,"column":0},"action":"insert","lines":["",""]},{"start":{"row":124,"column":0},"end":{"row":124,"column":16},"action":"insert","lines":["                "]}]}],[{"group":"doc","deltas":[{"start":{"row":124,"column":16},"end":{"row":124,"column":17},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":124,"column":17},"end":{"row":124,"column":18},"action":"insert","lines":["v"]}]}],[{"group":"doc","deltas":[{"start":{"row":124,"column":18},"end":{"row":124,"column":19},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":124,"column":19},"end":{"row":124,"column":20},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":124,"column":16},"end":{"row":124,"column":20},"action":"remove","lines":["ever"]},{"start":{"row":124,"column":16},"end":{"row":124,"column":26},"action":"insert","lines":["everyOther"]}]}],[{"group":"doc","deltas":[{"start":{"row":124,"column":26},"end":{"row":124,"column":27},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":124,"column":27},"end":{"row":124,"column":28},"action":"insert","lines":["="]}]}],[{"group":"doc","deltas":[{"start":{"row":124,"column":28},"end":{"row":124,"column":29},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":124,"column":29},"end":{"row":124,"column":30},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":124,"column":30},"end":{"row":124,"column":31},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":124,"column":31},"end":{"row":124,"column":32},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":124,"column":32},"end":{"row":124,"column":33},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":124,"column":33},"end":{"row":124,"column":34},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":12},"end":{"row":53,"column":13},"action":"insert","lines":["M"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":13},"end":{"row":53,"column":14},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":14},"end":{"row":53,"column":15},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":15},"end":{"row":53,"column":16},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":16},"end":{"row":53,"column":17},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":17},"end":{"row":53,"column":18},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":18},"end":{"row":53,"column":19},"action":"insert","lines":["b"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":19},"end":{"row":53,"column":20},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":20},"end":{"row":53,"column":21},"action":"insert","lines":["("]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":44},"end":{"row":53,"column":45},"action":"insert","lines":[")"]}]}],[{"group":"doc","deltas":[{"start":{"row":51,"column":70},"end":{"row":51,"column":71},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":51,"column":71},"end":{"row":51,"column":72},"action":"insert","lines":["+"]}]}],[{"group":"doc","deltas":[{"start":{"row":51,"column":72},"end":{"row":51,"column":73},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":51,"column":73},"end":{"row":51,"column":74},"action":"insert","lines":["b"]}]}],[{"group":"doc","deltas":[{"start":{"row":51,"column":74},"end":{"row":51,"column":75},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":51,"column":75},"end":{"row":51,"column":76},"action":"insert","lines":["x"]}]}],[{"group":"doc","deltas":[{"start":{"row":51,"column":73},"end":{"row":51,"column":76},"action":"remove","lines":["box"]},{"start":{"row":51,"column":73},"end":{"row":51,"column":76},"action":"insert","lines":["box"]}]}],[{"group":"doc","deltas":[{"start":{"row":51,"column":76},"end":{"row":51,"column":77},"action":"insert","lines":["S"]}]}],[{"group":"doc","deltas":[{"start":{"row":51,"column":73},"end":{"row":51,"column":77},"action":"remove","lines":["boxS"]},{"start":{"row":51,"column":73},"end":{"row":51,"column":80},"action":"insert","lines":["boxSide"]}]}],[{"group":"doc","deltas":[{"start":{"row":51,"column":80},"end":{"row":51,"column":81},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":51,"column":81},"end":{"row":51,"column":82},"action":"insert","lines":["2"]}]}],[{"group":"doc","deltas":[{"start":{"row":50,"column":70},"end":{"row":50,"column":71},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":50,"column":71},"end":{"row":50,"column":72},"action":"insert","lines":["+"]}]}],[{"group":"doc","deltas":[{"start":{"row":50,"column":72},"end":{"row":50,"column":73},"action":"insert","lines":[" "]}]}],[{"group":"doc","deltas":[{"start":{"row":50,"column":73},"end":{"row":50,"column":74},"action":"insert","lines":["b"]}]}],[{"group":"doc","deltas":[{"start":{"row":50,"column":74},"end":{"row":50,"column":75},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":50,"column":75},"end":{"row":50,"column":76},"action":"insert","lines":["x"]}]}],[{"group":"doc","deltas":[{"start":{"row":50,"column":73},"end":{"row":50,"column":76},"action":"remove","lines":["box"]},{"start":{"row":50,"column":73},"end":{"row":50,"column":82},"action":"insert","lines":["boxSide/2"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":55},"end":{"row":53,"column":56},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":56},"end":{"row":53,"column":57},"action":"insert","lines":["2"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":61},"end":{"row":53,"column":62},"action":"insert","lines":["M"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":62},"end":{"row":53,"column":63},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":63},"end":{"row":53,"column":64},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":64},"end":{"row":53,"column":65},"action":"insert","lines":["h"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":65},"end":{"row":53,"column":66},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":66},"end":{"row":53,"column":67},"action":"insert","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":67},"end":{"row":53,"column":68},"action":"insert","lines":["b"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":68},"end":{"row":53,"column":69},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":69},"end":{"row":53,"column":70},"action":"insert","lines":["("]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":93},"end":{"row":53,"column":94},"action":"insert","lines":[")"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":104},"end":{"row":53,"column":105},"action":"insert","lines":["/"]}]}],[{"group":"doc","deltas":[{"start":{"row":53,"column":105},"end":{"row":53,"column":106},"action":"insert","lines":["2"]}]}]]},"ace":{"folds":[],"scrolltop":300,"scrollleft":0,"selection":{"start":{"row":49,"column":26},"end":{"row":49,"column":26},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":20,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1422404059444,"hash":"35d6907e5bdfc3ed6c2b9a25bf0272d2e8b261d0"}
>>>>>>> origin/master
