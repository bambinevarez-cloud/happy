const loaderText = document.getElementById("loaderText");

/* =========================
   LOADER
========================= */

setTimeout(() => {
    loaderText.innerHTML = "Buscando recuerdos...";
}, 1000);

setTimeout(() => {
    loaderText.innerHTML = "Analizando momentos especiales...";
}, 2000);

setTimeout(() => {
    loaderText.innerHTML = "Localizando a Pecosa ❤️";
}, 3000);

setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("app").classList.remove("hidden");
}, 4500);

/* =========================
   NAVIGATION (nextScreen)
========================= */

function nextScreen(screenNum) {
    const screens = document.querySelectorAll(".screen");
    screens.forEach(screen => screen.classList.remove("active")); // Hide all screens

    const currentScreen = document.getElementById(`screen${screenNum}`);
    if (currentScreen) {
        currentScreen.classList.add("active"); // Show the current screen
    }

    // Special logic for specific screens
    if (screenNum === 2 || screenNum === 3) {
        // Assuming the story is on screen2 and screen3
        // No direct typing for now, as story content is fixed in HTML
    } else if (screenNum === 5) {
        // Start counter on screen 5
        actualizarContador();
        setInterval(actualizarContador, 1000);
    } else if (screenNum === 6) {
        // Start heart game on screen 6
        startGame();
    }
}

/* =========================
   LETTER ANIMATION
========================= */

function openLetter(element) {
    element.classList.toggle("open");
}

/* =========================
   CONTADOR
========================= */

function actualizarContador() {
    const inicio = new Date("2026-04-01T00:00:00");
    const ahora = new Date();
    const diff = ahora - inicio;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    const contador = document.getElementById("contador");
    if (contador) {
        contador.innerHTML = `
        ${dias} días<br>
        ${horas} horas<br>
        ${minutos} minutos<br>
        ${segundos} segundos
        `;
    }
}

/* =========================
   HEART GAME
========================= */

let score = 0;
let gameInterval;

function startGame() {
    score = 0; // Reset score when game starts
    const scoreText = document.getElementById("score");
    if (scoreText) {
        scoreText.innerText = score + "/10";
    }
    // Clear any existing interval to prevent multiple games running
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    gameInterval = setInterval(crearCorazon, 900);
}


function crearCorazon() {
    const area = document.getElementById("gameArea");
    if (!area) return;

    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 90 + "%";
    heart.style.top = Math.random() * 85 + "%";

    heart.onclick = () => {
        score++;
        const scoreText = document.getElementById("score");
        if (scoreText) {
            scoreText.innerText = score + "/10";
        }
        heart.remove();

        if (score >= 10) {
            clearInterval(gameInterval);
            alert("Encontraste el corazón de tu Güerito ❤️");
            const continuar = document.getElementById("continueGame");
            if (continuar) {
                continuar.style.display = "inline-block";
            }
        }
    };

    area.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 3000);
}

/* =========================
   PLANETAS (showPlanet)
========================= */

function showPlanet(tipo) {
    const box = document.getElementById("planetMessage");
    if (!box) return;

    const mensajes = {
        smile: "Tu sonrisa tiene la capacidad de mejorar cualquier día.",
        personality: "Tu forma de ser es una de las cosas que más admiro de ti.",
        talk: "Siempre disfruto nuestras conversaciones.",
        special: "Te convertiste en alguien muy especial para mí ❤️"
    };

    box.innerHTML = mensajes[tipo];
}

/* =========================
   CARTA FINAL (openFinalLetter)
========================= */

function openFinalLetter() {
    const carta = document.getElementById("finalLetter");
    if (carta) {
        carta.classList.add("show"); // Use class for animation and display
    }
}
