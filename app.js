const gameContainer = document.getElementById("game");
const solvedTiles = document.getElementsByClassName("solved");
const tiles = [
  { "color" : "red", "idx" : 0},
  { "color" : "blue", "idx" : 0},
  { "color" : "green", "idx" : 0},
  { "color" : "orange", "idx" : 0},
  { "color" : "rebeccapurple", "idx" : 0},
  { "color" : "yellow", "idx" : 0},
  { "color" : "turquoise", "idx" : 0},
  { "color" : "maroon", "idx" : 0},
  { "color" : "gray", "idx" : 0},
  { "color" : "black", "idx" : 0},
  { "color" : "red", "idx" : 1},
  { "color" : "blue", "idx" : 1},
  { "color" : "green", "idx" : 1},
  { "color" : "orange", "idx" : 1},
  { "color" : "rebeccapurple", "idx" : 1},
  { "color" : "yellow", "idx" : 1},
  { "color" : "turquoise", "idx" : 1},
  { "color" : "maroon", "idx" : 1},
  { "color" : "gray", "idx" : 1},
  { "color" : "black", "idx" : 1},
];

//Fisher-Yates shuffle
function shuffle(arr) {
  let counter = arr.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  };
  return arr;
}

let shuffledTiles = shuffle(tiles);

//creates tiles
function createDivsForTiles(tilesArray) {
  for (let tile of tilesArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(tile["color"], tile["idx"]);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

let tileColor = "";
let tileId = "";
let firstClick = null;
let onlyTwoBuster = false;
let solved = 0;
let scoreTile = document.getElementById("current");
let pRTile = document.getElementById("record");
let score = 0;
let record = localStorage.getItem("record") || score;

pRTile.innerText = `best score: ${record}`;
scoreTile.innerText = `current score: ${score}`;

function handleCardClick(event) {
  if (onlyTwoBuster) {
    console.log('hey! only two clicks at a time, buster.')
    return};

  console.log("you just clicked", event.target);

  if (!firstClick) {
    console.log('this is the first click')
    firstClick = event.target;
    event.target.style.backgroundColor = event.target.classList[0];
    return;
  }

  if (firstClick) {
    console.log('this is the second click');
    onlyTwoBuster = true;
    
    if (firstClick.classList[0] === event.target.classList[0] && firstClick.classList[1] !== event.target.classList[1]) {
      console.log('this is the second click and it\'s a success');
      event.target.style.backgroundColor = event.target.classList[0];

      firstClick.classList.add("solved");
      event.target.classList.add("solved");

      solved += 2;
      if (solved === tiles.length) {
        if (score < localStorage.getItem("record") || record === 0) {
          console.log(`new record: ${score +1}`);
          localStorage.setItem("record", score + 1);
          pRTile.innerText = `best score: ${score + 1}`
        }
        setTimeout(function () {
          alert("you've won! congratulations!")
        }, 500);
      }
      onlyTwoBuster = false;
      firstClick = null;

      console.log("solved: ", solved);

    } else {
      console.log('this is the second click and it\'s a failure');
      event.target.style.backgroundColor = event.target.classList[0];
      setTimeout(function () {
        firstClick.style.backgroundColor = "white";
        event.target.style.backgroundColor = "white";
        firstClick = null}, 2000);

        setTimeout (function () {
          onlyTwoBuster = false;
        }, 2500)
    } 
    score++;
    scoreTile.innerText = `current score: ${score}`;
  }
  for (let tile of solvedTiles) {
    tile.removeEventListener("click", handleCardClick);
  }
}

// when the DOM loads
createDivsForTiles(shuffledTiles);

const restart = document.getElementById("restart");
restart.addEventListener("click", function () {
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  };
  solved = 0;
  score = 0;
  scoreTile.innerText = `current score: ${score}`;
  shuffledTiles = shuffle(tiles);
  createDivsForTiles(shuffledTiles);
})