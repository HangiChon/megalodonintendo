document.body.style.fontFamily = "'Londrina Solid', cursive ";

const gameEngine = new Engine(document.getElementById("app"));

const handleKeydown = (event) => {
  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
  }
  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
  }
  if (event.code === "ArrowUp") {
    gameEngine.player.moveUp();
  }
  if (event.code === "ArrowDown") {
    gameEngine.player.moveDown();
  }
};

const handleKeydownPause = (event) => {
  if (event.code === "KeyP") {
    if (gameEngine.flag % 2 != 0) {
      document.removeEventListener("keydown", handleKeydown);
      clearTimeout(gameEngine.status);
      gameEngine.flag++;
    } else if (gameEngine.flag % 2 === 0) {
      document.addEventListener("keydown", handleKeydown);
      gameEngine.gameLoop();
      gameEngine.flag++;
    }
  }
};

const handleClickStart = () => {
  if (!gameEngine.playerDead) {
    document.getElementById("intro").style.opacity = "0";

    myIntervalFn();
    resetPlayer();
    countDown();
  }
};

const handleClickPause = () => {
  if (gameEngine.flag % 2 != 0) {
    clearTimeout(gameEngine.status);
    document.removeEventListener("keydown", handleKeydown);
    gameEngine.flag++;
  } else if (gameEngine.flag % 2 === 0) {
    document.addEventListener("keydown", handleKeydown);
    gameEngine.gameLoop();
    gameEngine.flag++;
  }
};

const handleClickRestart = (event) => {
  const id = event.target;
  const lifeImg = document.querySelectorAll("#title img");
  let i = 0;
  if (lifeImg.lenth === 0) {
    window.alert("Last Life!");
  }

  // erase shark image
  if (document.getElementById("megalodon")) {
    document.getElementById("megalodon").remove();
  }

  pressYesNo(id);
  resetPlayer();
  document.addEventListener("keydown", handleKeydown);
  countDown();

  if (lifeImg.length >= 1) {
    lifeImg[i].remove();
  } else if (lifeImg[0] === undefined) {
    window.alert("No more Life! Please refresh to reset.");
    clearTimeout(gameEngine.status);
  }
};

const handleClickQuit = (event) => {
  const id = event.target.id;
  pressYesNo(id);
};

// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener("keydown", handleKeydown);
document.addEventListener("keydown", handleKeydownPause);

document.getElementById("start").addEventListener("click", handleClickStart);
document.getElementById("pause").addEventListener("click", handleClickPause);
document
  .getElementById("restart")
  .addEventListener("click", handleClickRestart);
document.getElementById("quit").addEventListener("click", handleClickQuit);
