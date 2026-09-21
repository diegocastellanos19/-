// ============ CONFIGURACIÓN ============

const NOMBRE = "Feliz dia de las flores amarrillas";

const MENSAJE =
  
  "Que este pequeño universo te recuerde cuánto significas " +
  "en mi vida, hoy y siempre.";


// ============ TEXTO ============

const nombreTitulo = document.getElementById("nombre-titulo");
const mensajeElemento = document.querySelector(".message");

if (nombreTitulo) nombreTitulo.textContent = NOMBRE;
if (mensajeElemento) mensajeElemento.textContent = MENSAJE;


// ============ FLOR REALISTA SVG ============

let flowerIdCounter = 0;

function makeFlower(size = 58, rotation = 0) {
  const id = flowerIdCounter++;

  const angles = [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320];

  let backPetals = "";
  let frontPetals = "";

  angles.forEach((angle, i) => {
    const long = i % 2 === 0;
    const tipY = long ? 6 : 12;

    backPetals += `
      <path
        d="M50 50
           C41 34 39 ${tipY + 6} 50 ${tipY}
           C61 ${tipY + 6} 59 34 50 50 Z"
        fill="url(#back${id})"
        opacity=".85"
        transform="rotate(${angle + 16} 50 50)"
      />`;

    frontPetals += `
      <path
        d="M50 50
           C43 33 41 ${tipY - 2} 50 ${tipY - 6}
           C59 ${tipY - 2} 57 33 50 50 Z"
        fill="url(#front${id})"
        transform="rotate(${angle} 50 50)"
      />`;
  });

  return `
    <svg viewBox="0 0 100 100"
         width="${size}" height="${size}"
         xmlns="http://www.w3.org/2000/svg"
         style="transform:rotate(${rotation}deg)">
      <defs>
        <radialGradient id="back${id}" cx="50%" cy="92%" r="85%">
          <stop offset="0%" stop-color="#e9b94f"/>
          <stop offset="100%" stop-color="#b9852f"/>
        </radialGradient>

        <radialGradient id="front${id}" cx="50%" cy="88%" r="80%">
          <stop offset="0%" stop-color="#fff6da"/>
          <stop offset="45%" stop-color="#f7d573"/>
          <stop offset="100%" stop-color="#e2af49"/>
        </radialGradient>

        <radialGradient id="center${id}" cx="35%" cy="28%" r="78%">
          <stop offset="0%" stop-color="#c9873b"/>
          <stop offset="55%" stop-color="#8a5a2e"/>
          <stop offset="100%" stop-color="#54341c"/>
        </radialGradient>
      </defs>

      ${backPetals}
      ${frontPetals}

      <circle cx="50" cy="50" r="13.5"
              fill="url(#center${id})"/>

      <g fill="#3f2712" opacity=".55">
        <circle cx="45" cy="45" r="1.1"/>
        <circle cx="54" cy="44" r="1"/>
        <circle cx="49" cy="51" r="1.2"/>
        <circle cx="57" cy="52" r=".9"/>
        <circle cx="44" cy="54" r="1"/>
        <circle cx="52" cy="58" r="1.1"/>
        <circle cx="59" cy="47" r=".8"/>
        <circle cx="47" cy="58" r=".9"/>
      </g>
    </svg>`;
}


// ============ RAMITO DE LA PANTALLA INICIAL ============

function makeBouquet() {
  return `
    <svg class="bouquet-svg"
         viewBox="0 0 180 180"
         xmlns="http://www.w3.org/2000/svg">

      <g stroke="#66883a" stroke-width="4"
         fill="none" stroke-linecap="round">
        <path d="M90 158 C88 125 87 91 90 65"/>
        <path d="M90 137 C70 115 54 95 42 73"/>
        <path d="M91 136 C108 112 123 91 139 69"/>
        <path d="M89 119 C73 111 60 109 49 111"/>
        <path d="M92 116 C108 107 121 105 132 108"/>
      </g>

      <g>
        <g transform="translate(50 53)">
          ${makeFlower(48, -10)}
        </g>

        <g transform="translate(91 35)">
          ${makeFlower(58, 8)}
        </g>

        <g transform="translate(130 55)">
          ${makeFlower(48, 12)}
        </g>

        <g transform="translate(69 81)">
          ${makeFlower(40, -5)}
        </g>

        <g transform="translate(108 82)">
          ${makeFlower(40, 8)}
        </g>
      </g>

      <path d="M88 137
               C78 145 71 151 64 159
               C76 157 87 156 90 158
               C97 155 107 157 118 159
               C111 150 103 143 92 137"
            fill="#79a243"
            opacity=".9"/>
    </svg>`;
}

const introBouquet = document.getElementById("intro-bouquet");
if (introBouquet) {
  introBouquet.innerHTML = makeBouquet();
}


// ============ FLORES REALISTAS ORBITANDO EL PLANETA ============

const orbitFlowers = document.querySelectorAll(".orbit-flower");

orbitFlowers.forEach((flower) => {
  flower.innerHTML = makeFlower(46, Math.random() * 360);
});


// ============ ESTRELLAS ============

function paintStars(container, count, sizeMin, sizeMax, speedMin, speedMax) {
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");

    star.className = "star";

    const size =
      sizeMin + Math.random() * (sizeMax - sizeMin);

    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.animationDuration =
      speedMin +
      Math.random() * (speedMax - speedMin) +
      "s";

    star.style.animationDelay =
      Math.random() * 4 +
      "s";

    container.appendChild(star);
  }
}

paintStars(
  document.getElementById("star-layer-1"),
  70, 0.6, 1.4, 2.5, 5
);

paintStars(
  document.getElementById("star-layer-2"),
  40, 1.4, 2.6, 1.8, 3.5
);


// ============ PÉTALOS ============

const petalsEl = document.getElementById("petals");

if (petalsEl) {
  const petalCount = 11;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("div");

    petal.className = "petal";

    const size = 16 + Math.random() * 14;

    petal.innerHTML =
      makeFlower(size, Math.random() * 360);

    petal.style.left =
      Math.random() * 100 + "%";

    petal.style.animationDuration =
      11 + Math.random() * 10 + "s";

    petal.style.animationDelay =
      Math.random() * 13 + "s";

    petalsEl.appendChild(petal);
  }
}


// ============ INICIO ============

const intro = document.getElementById("intro");
const scene = document.getElementById("scene");
const music = document.getElementById("bg-music");

if (intro) {
  intro.addEventListener(
    "click",
    () => {
      intro.classList.add("hidden");

      setTimeout(() => {
        if (scene) {
          scene.classList.add("visible");
        }
      }, 250);

      if (music) {
        music.play().catch(() => {});
      }
    },
    { once: true }
  );
}


// ============ MÚSICA ============

const soundBtn =
  document.getElementById("sound-toggle");

if (soundBtn) {
  soundBtn.addEventListener("click", (event) => {
    event.stopPropagation();

    if (!music) return;

    music.muted = !music.muted;

    soundBtn.textContent =
      music.muted ? "✕" : "♪";
  });
}
