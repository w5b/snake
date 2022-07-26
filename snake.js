let blockSize = 30;
let width = 20;
let height = 20;
let x = width / 2;
let y = height / 2;
let over;
let foodX = Math.floor(Math.random() * width);
let foodY = Math.floor(Math.random() * height);
let snakeTail = [];
let direction = "STAND";

window.onload = function () {
  let canvas = document.getElementById("canvas");
  window.ctx = canvas.getContext("2d");
  canvas.height = width * blockSize;
  canvas.width = height * blockSize;
  ctx.fillStyle = "black";
  input();
  setInterval(() => {
    draw();
    // grid();
    logic();
  }, 1000 / 12);
};

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.height, canvas.width);
  for (let i = 0; i < canvas.height; i++) {
    for (let c = 0; c < canvas.width; c++) {
      if (i == y && c == x) {
        ctx.fillStyle = "lime";
        ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
      } else if (i == foodY && c == foodX) {
        ctx.fillStyle = "Red";
        ctx.fillRect(
          foodX * blockSize,
          foodY * blockSize,
          blockSize,
          blockSize
        );
      }
    }
  }
  for (let i = 0; i < snakeTail.length; i++) {
    ctx.fillStyle = "lime";
    ctx.fillRect(
      snakeTail[i][0] * blockSize,
      snakeTail[i][1] * blockSize,
      blockSize,
      blockSize
    );
  }
}

function grid() {
  for (let i = 0; i < canvas.height; i += blockSize) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.strokeStyle = "white";
    ctx.stroke();
  }
}

function input() {
  document.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
      case 87:
        if (direction != "DOWN") {
          direction = "UP";
        }
        break;
      case 83:
        if (direction != "UP") {
          direction = "DOWN";
        }
        break;
      case 65:
        if (direction != "RIGHT") {
          direction = "LEFT";
        }
        break;
      case 68:
        if (direction != "LEFT") {
          direction = "RIGHT";
        }
        break;
    }
  });
}

function logic() {
  switch (direction) {
    case "UP":
      y--;
      break;
    case "DOWN":
      y++;
      break;
    case "LEFT":
      x--;
      break;
    case "RIGHT":
      x++;
      break;
  }
  if (x < 0) {
    x = width;
  } else if (x > width - 1) {
    x = 0;
  } else if (y < 0) {
    y = width;
  } else if (y > width - 1) {
    y = 0;
  }
  if (x == foodX && y == foodY) {
    snakeTail.push([foodX, foodY]);
    foodX = Math.floor(Math.random() * width);
    foodY = Math.floor(Math.random() * height);
  }
  for (let i = snakeTail.length - 1; i > 0; i--) {
    snakeTail[i] = snakeTail[i - 1];
    if (x == snakeTail[i][0] && y == snakeTail[i][1]) {
      gameOver();
      break;
    }
  }
  snakeTail[0] = [x, y];
}

function gameOver() {
  direction = "STAND";
  x = 10;
  y = 10;
  snakeTail = [[width / 2, height / 2]];
  foodX = Math.floor(Math.random() * width);
  foodY = Math.floor(Math.random() * height);
}
