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

// Lắng nghe sự kiện nhấn phím
document.addEventListener("keydown", changeDirection);

// Lắng nghe sự kiện nhấn nút trên thiết bị di động
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

    // Vẽ viền xung quanh toàn bộ khu vực chơi
    ctx.strokeStyle = "black"; // Màu của viền
    ctx.lineWidth = 5; // Độ dày của viền
    ctx.strokeRect(0, 0, canvas.width, canvas.height); // Vẽ viền xung quanh toàn bộ canvas

    // Vẽ con rắn
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "green" : "white"; // Đầu rắn màu xanh, thân rắn màu trắng
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "black"; // Màu viền đen cho từng ô của con rắn
        ctx.lineWidth = 2; // Độ dày của viền
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Vẽ thức ăn
    ctx.fillStyle = "red"; // Màu của thức ăn
    ctx.fillRect(food.x, food.y, box, box);

    ctx.strokeStyle = "black"; // Màu viền đen cho thức ăn
    ctx.lineWidth = 2; // Độ dày của viền
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
