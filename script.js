const GameBoard = document.getElementById("main-container");
const playAgainBtn = document.querySelector(".playAgain-btn");
const boxes = GameBoard.querySelectorAll("td");
const title = document.getElementById("title");
let playerIcon = (icon) => `<i class="fas fa-${icon}"></i>`;
let turn = 0;
let win = false;
const circlePlayer = [];
const timesPlayer = [];
const winningBoxes = [
  ["a1", "a2", "a3"],
  ["b1", "b2", "b3"],
  ["c1", "c2", "c3"],
  ["a1", "b1", "c1"],
  ["a2", "b2", "c2"],
  ["a3", "b3", "c3"],
  ["a1", "b2", "c3"],
  ["a3", "b2", "c1"],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerHTML || win) {
      return;
    }
    box.innerHTML = playerIcon(`${turn % 2 == 1 ? "times" : "circle"}`);
    (turn % 2 == 1 ? timesPlayer : circlePlayer).push(box.id);
    turn++;
    if (circlePlayer.length >= 3) {
      loopWinningBox(circlePlayer);
    }
    if (timesPlayer.length >= 3) {
      loopWinningBox(timesPlayer);
    }
    const tie = Array.from(boxes).every((box) => box.innerHTML !== "");
    if (tie && !win) {
      playAgainBtn.classList.add("show-btn");
      title.innerHTML = "tie";
    }
  });
});

function loopWinningBox(player) {
  winningBoxes.forEach((boxes) => {
    const result = boxes.every((box) => player.includes(box));
    if (result) {
      win = true;
      playAgainBtn.classList.add("show-btn");
      title.innerText = `${player == timesPlayer ? "x" : "o"} won`;
    }
  });
}

playAgainBtn.addEventListener("click", () => location.reload());
