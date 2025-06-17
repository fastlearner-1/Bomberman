// création de la grille javascript
const bomberman = document.querySelector(".bomberman");
for (let i = 0; i < 169; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  bomberman.appendChild(cell);
}
