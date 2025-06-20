console.log("Script chargé");
// CREATION DU TERRAIN
const bomberman = document.querySelector(".bomberman");
const cols = 13;
const rows = 13;
const cellSize = 50; // taille des cellules

// Création de la grille
for (let i = 0; i < cols * rows; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  bomberman.appendChild(cell);
}

// Sélection des joueurs
const joueur1 = document.getElementById("bomberman-svg");
const joueur2 = document.getElementById("secondBomberman");
// placement des joueurs
const joueur1Pos = { x: 0, y: 0 };
const joueur2Pos = { x: 1, y: 0 };

// Affichage des joueurs
joueur1.style.display = "block";
joueur2.style.display = "block";

// Positionnement des joueurs
const cellSizeX = 50;
const cellSizeY = 40;
const gap = 10;

function updatePosition(joueur, pos) {
  const x = pos.x * (cellSizeX + gap) + cellSizeX / 2;
  const y = pos.y * (cellSizeY + gap) + cellSizeY / 2;
  joueur.style.left = x + "px";
  joueur.style.top = y + "px";
}

updatePosition(joueur1, joueur1Pos);
updatePosition(joueur2, joueur2Pos);

// Mouvements des joueurs
const deplacements = {
  z: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  q: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

const deplacementsArrow = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

function positionDiff(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

// Gestion des diamants
const diamant = document.getElementById("diamant");
const cellNode = document.querySelectorAll(".cell");

function placerDiamants(colonne, startY, endY) {
  const step = startY < endY ? 1 : -1;
  for (let y = startY; step > 0 ? y <= endY : y >= endY; y += step) {
    const index = y * cols + colonne;
    if (index >= 0 && index < cellNode.length) {
      const diamantClone = diamant.cloneNode(true);
      diamantClone.style.display = "block";
      cellNode[index].appendChild(diamantClone);
      cellNode[index].classList.add("has-diamant"); // Marquage
    }
  }
}

// Vérifie si une case contient un diamant
function caseAvecDiamant(x, y) {
  const index = y * cols + x;
  return cellNode[index].classList.contains("has-diamant");
}

// Placement des diamants
placerDiamants(2, 0, 10);
placerDiamants(3, 0, 10);
placerDiamants(6, 12, 3);
placerDiamants(7, 12, 3);

// Mouvements avec collision contre diamants
document.addEventListener("keydown", (e) => {
  if (deplacements[e.key]) {
    const nouvellePos = {
      x: Math.min(cols - 1, Math.max(0, joueur1Pos.x + deplacements[e.key].x)),
      y: Math.min(rows - 1, Math.max(0, joueur1Pos.y + deplacements[e.key].y)),
    };
    if (
      !positionDiff(nouvellePos, joueur2Pos) &&
      !caseAvecDiamant(nouvellePos.x, nouvellePos.y)
    ) {
      joueur1Pos.x = nouvellePos.x;
      joueur1Pos.y = nouvellePos.y;
      updatePosition(joueur1, joueur1Pos);
    }
  }

  if (deplacementsArrow[e.key]) {
    const nouvellePos2 = {
      x: Math.min(
        cols - 1,
        Math.max(0, joueur2Pos.x + deplacementsArrow[e.key].x)
      ),
      y: Math.min(
        rows - 1,
        Math.max(0, joueur2Pos.y + deplacementsArrow[e.key].y)
      ),
    };
    if (
      !positionDiff(nouvellePos2, joueur1Pos) &&
      !caseAvecDiamant(nouvellePos2.x, nouvellePos2.y)
    ) {
      joueur2Pos.x = nouvellePos2.x;
      joueur2Pos.y = nouvellePos2.y;
      updatePosition(joueur2, joueur2Pos);
    }
  }
});
