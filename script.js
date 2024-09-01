const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = "";
let food = {
x: Math.floor(Math.random() * 19) * box,
y: Math.floor(Math.random() * 19) * box
};
let score = 0;


document.addEventListener("keydown", changeDirection);

document.getElementById("left").onclick = function() { changeDirection({ keyCode: 37 }); };
document.getElementById("up").onclick = function() { changeDirection({ keyCode: 38 }); };
document.getElementById("right").onclick = function() { changeDirection({ keyCode: 39 }); };
document.getElementById("down").onclick = function() { changeDirection({ keyCode: 40 }); };

function changeDirection(event) {
if (event.keyCode === 37 && direction !== "RIGHT") {
direction = "LEFT";
} else if (event.keyCode === 38 && direction !== "DOWN") {
direction = "UP";
} else if (event.keyCode === 39 && direction !== "LEFT") {
direction = "RIGHT";
} else if (event.keyCode === 40 && direction !== "UP") {
direction = "DOWN";
}
}

function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);


ctx.strokeStyle = "black"; 
ctx.lineWidth = 5; 
ctx.strokeRect(0, 0, canvas.width, canvas.height); 

for (let i = 0; i < snake.length; i++) {
ctx.fillStyle = (i === 0) ? "green" : "white"; 
ctx.fillRect(snake[i].x, snake[i].y, box, box);

ctx.strokeStyle = "black"; 
ctx.lineWidth = 2; 
ctx.strokeRect(snake[i].x, snake[i].y, box, box);
}

ctx.fillStyle = "red"; 
ctx.fillRect(food.x, food.y, box, box);

ctx.strokeStyle = "black";
ctx.lineWidth = 2;
ctx.strokeRect(food.x, food.y, box, box);

let snakeX = snake[0].x;
let snakeY = snake[0].y;

if (direction === "LEFT") snakeX -= box;
if (direction === "UP") snakeY -= box;
if (direction === "RIGHT") snakeX += box;
if (direction === "DOWN") snakeY += box;

if (snakeX === food.x && snakeY === food.y) {
score++;
food = {
x: Math.floor(Math.random() * 19) * box,
y: Math.floor(Math.random() * 19) * box
};
} else {
snake.pop();
}

let newHead = { x: snakeX, y: snakeY };

if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
clearInterval(game);
}
snake.unshift(newHead);

ctx.fillStyle = "black";
ctx.font = "45px Changa one";
ctx.fillText(score, 2 * box, 1.6 * box);
}

function collision(head, array) {
for (let i = 0; i < array.length; i++) {
if (head.x === array[i].x && head.y === array[i].y) {
return true;
}
}
return false;
}

let game = setInterval(draw, 100);
