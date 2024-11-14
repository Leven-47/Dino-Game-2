const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;

const startButton = document.getElementById("startButton");
const menu = document.getElementById("menu");

let gameRunning = false;
let score = 0;
let speed = 5;

// Charakter-Objekt
const player = {
    x: 50,
    y: canvas.height - 50,
    width: 30,
    height: 30,
    dy: 0,
    jumpPower: -10,
    gravity: 0.5,
    onGround: true
};

// Hindernisse
const obstacles = [];
const obstacleTypes = ["spike", "riceCake"]; // spike = Stacheln, riceCake = Reiswaffel

// Hindernis hinzufügen
function addObstacle() {
    const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    const y = type === "spike" ? canvas.height - 20 : canvas.height - 100;
    obstacles.push({ x: canvas.width, y, width: 20, height: 20, type });
}

// Startbildschirm verbergen und Spiel starten
startButton.addEventListener("click", () => {
    menu.style.display = "none";
    canvas.style.display = "block";
    gameRunning = true;
    score = 0;
    speed = 5;
    obstacles.length = 0;
    player.y = canvas.height - player.height;
    player.dy = 0;
    requestAnimationFrame(gameLoop);
});

// Zeichnet den Charakter
function drawPlayer() {
    ctx.fillStyle = "#8b4513"; // braune Haare
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Zeichnet die Hindernisse
function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.fillStyle = obstacle.type === "spike" ? "#ff0000" : "#e0d4cc"; // rot für Stacheln, beige für Reiswaffeln
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

// Spieler springen lassen
canvas.addEventListener("click", () => {
    if (player.onGround) {
        player.dy = player.jumpPower;
        player.onGround = false;
    }
});

// Spiel-Loop
function gameLoop() {
    if (!gameRunning) return;

    // Hintergrund und Spielfläche aktualisieren
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Geschwindigkeit und Score erhöhen
    score++;
    if (score % 100 === 0) speed += 0.5;

    // Hindernisse bewegen und erstellen
    if (Math.random() < 0.
