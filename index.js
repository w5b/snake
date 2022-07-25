let blockSize = 20;
let width = 20;
let height = 20;
let x = 10;
let y = 10;
let snakeBody = [];
let score;
let scoreNum = 0;
let foodX;
let foodY;
let direction;
let board;
let context;

window.onload = function () {
  score = document.getElementById("score");
  board = document.getElementById("board");
  board.height = height * blockSize;
  board.width = width * blockSize;
  foodX = Math.floor(Math.random() * (board.height / blockSize));
  foodY = Math.floor(Math.random() * (board.height / blockSize));
  input();
  initialize();
};

function initialize() {
  setInterval(() => {
    context = board.getContext("2d");
    update();
    // grid();
    snake();
    logic();
  }, 100);
}

function update() {
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);
  score.innerHTML = "score: " + scoreNum;
}

function grid() {
  for (let i = 0; i < board.height; i = i + blockSize) {
    context.moveTo(i, 0);
    context.lineTo(i, board.height);
    context.moveTo(0, i);
    context.lineTo(board.width, i);
    context.strokeStyle = "white";
    context.stroke();
  }
}

function snake() {
  for (let i = 0; i < board.width; i++) {
    for (let c = 0; c < board.height; c++) {
      if (i == x && c == y) {
        context.fillStyle = "lime";
        context.fillRect(
          x * blockSize,
          y * blockSize,
          blockSize - 1,
          blockSize - 1
        );
      } else if (i == foodX && c == foodY) {
        context.fillStyle = "red";
        context.fillRect(
          foodX * blockSize,
          foodY * blockSize,
          blockSize - 1,
          blockSize - 1
        );
      } else if (x == foodX && y == foodY) {
        scoreNum++;
        snakeBody.push([foodX, foodY]);
        foodX = Math.floor(Math.random() * (board.height / blockSize));
        foodY = Math.floor(Math.random() * (board.height / blockSize));
      }
    }
  }
}

function input() {
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "w":
        if (direction != "DOWN") {
          direction = "UP";
        }
        break;
      case "s":
        if (direction != "UP") {
          direction = "DOWN";
        }
        break;
      case "a":
        if (direction != "RIGHT") {
          direction = "LEFT";
        }
        break;
      case "d":
        if (direction != "LEFT") {
          direction = "RIGHT";
        }
        break;
    }
  });
}

function logic() {
  if (direction == "UP") {
    y--;
  } else if (direction == "DOWN") {
    y++;
  } else if (direction == "LEFT") {
    x--;
  } else if (direction == "RIGHT") {
    x++;
  }
  if (x == board.width / blockSize) {
    x = 0;
  } else if (x < 0) {
    x = board.width / blockSize;
  } else if (y == board.height / blockSize + 1) {
    y = 0;
  } else if (y < 0) {
    y = board.height / blockSize;
  }
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillStyle = "lime";
    context.fillRect(
      snakeBody[i][0] * blockSize,
      snakeBody[i][1] * blockSize,
      blockSize - 1,
      blockSize - 1
    );
  }
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
    if (x == snakeBody[i][0] && y == snakeBody[i][1]) {
      gameOver();
    }
  }
  snakeBody[0] = [x, y];
}

function gameOver() {
  direction = "STAND";
  x = 10;
  y = 10;
  snakeBody = [[10, 10]];
  foodX = Math.floor(Math.random() * (board.height / blockSize));
  foodY = Math.floor(Math.random() * (board.height / blockSize));
  scoreNum = 0;
}
