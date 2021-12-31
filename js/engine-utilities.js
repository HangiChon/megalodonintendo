// Assign spots to shark fin enemy array
const nextFinEnemySpot = (enemies) => {
  const finEnemySpots = GAME_WIDTH / FINENEMY_WIDTH;

  const spotsTaken = [false, false, false, false, false];
  enemies.forEach((enemy) => {
    spotsTaken[enemy.spot] = true;
    // console.log(spotsTaken[enemy.spot]);
  });

  let finCandidate = undefined;
  while (finCandidate === undefined || spotsTaken[finCandidate]) {
    finCandidate = Math.floor(Math.random() * finEnemySpots);
  }

  return finCandidate;
};

// Assign spots to baby megalodons that swim horizontally under the ocean
const nextBodyEnemySpot = (enemies) => {
  const bodyEnemySpots = 2;

  const spotsTaken = [false, false];
  enemies.forEach((enemy) => {
    spotsTaken[enemy.spot] = true;
  });

  let bodyCandidate = undefined;
  while (bodyCandidate === undefined || spotsTaken[bodyCandidate]) {
    bodyCandidate = Math.floor(Math.random() * bodyEnemySpots);
  }

  return bodyCandidate;
};

// The following dynamic contents and styling was for the purpose of practicing
// JavaScript, therefore please note that this could have as well been written in
// styles.css

// Add water flow background
const addBackground = (root) => {
  document.body.style.margin = "0";
  // We create a new img DOM node.
  const mainBG = document.createElement("img");
  mainBG.id = "mainbg";
  mainBG.src = "images/water/water.gif";
  mainBG.style.transform = "rotate(180deg)";
  mainBG.style.width = "100vw";
  mainBG.style.height = "100vh";
  mainBG.style.zIndex = "-1";
  mainBG.style.position = "absolute";

  root.append(mainBG);
};

// Add intro DIV
const addIntro = (root) => {
  const intro = document.createElement("div");
  intro.id = "intro";
  intro.style.width = "460px";
  intro.style.height = "300px";
  intro.style.border = "10px solid #35C488";
  intro.style.color = "white";
  intro.style.textAlign = "center";
  intro.style.display = "flex";
  intro.style.alignItems = "center";
  intro.style.justifyContent = "center";
  intro.style.fontSize = "2em";
  intro.style.lineHeight = "1.4em";
  intro.style.left = `calc(50% - 230px)`;
  intro.style.top = `calc(50% - 300px)`;
  intro.style.position = "absolute";
  intro.style.opacity = "0";
  intro.style.transition = "all 0.5s";
  intro.innerText =
    "Use the keyboard arrow keys.\nPress START to begin!\nYou can click PAUSE or press P\nto pause the game at any time.\nEnjoy running away from the sharks!";

  root.append(intro);
};

// Add Main board frame that contains game board
const addMainBoard = (root) => {
  const mainBoard = document.createElement("div");
  mainBoard.id = "main";
  mainBoard.style.border = "10px solid #35C48B";
  mainBoard.style.borderRadius = "3px";
  mainBoard.style.borderBottomRightRadius = "130px";
  mainBoard.style.width = `${GAME_WIDTH + 40}px`;
  mainBoard.style.height = `${GAME_HEIGHT + 100}px`;
  mainBoard.style.position = "absolute";
  mainBoard.style.top = `calc(50% - ${GAME_HEIGHT / 2 + 150}px)`;
  mainBoard.style.left = `calc(50% - ${GAME_WIDTH / 2 + 20}px)`;

  root.append(mainBoard);
};

// Gameboard where almost everything is rendered in
const addGameBoard = (root) => {
  const gameBoard = document.createElement("div");
  gameBoard.id = "game";
  gameBoard.style.border = "10px solid #E2BEA4";
  gameBoard.style.width = `${GAME_WIDTH}px`;
  gameBoard.style.height = `${GAME_HEIGHT - 210}px`;
  gameBoard.style.position = "absolute";
  gameBoard.style.top = `calc(50% - 440px)`;
  gameBoard.style.left = `calc(50% - ${GAME_WIDTH / 2}px)`;
  gameBoard.style.overflow = "hidden";
  gameBoard.style.zIndex = "9";

  root.append(gameBoard);
};

// Bottom part of the Nintendo
const addInfoBoard = (root) => {
  const infoBoard = document.createElement("div");
  infoBoard.id = "info";
  infoBoard.style.backgroundColor = "#35C48B";
  // infoBoard.style.border = "10px solid olive";
  infoBoard.style.borderBottomRightRadius = "110px";
  infoBoard.style.width = `${GAME_WIDTH + 20}px`;
  infoBoard.style.height = "170px";
  infoBoard.style.position = "absolute";
  infoBoard.style.top = "calc(50% + 180px)";
  infoBoard.style.left = "calc(50% - 250px)";

  root.append(infoBoard);
};

// Top part of the Nintendo
const addTitleBoard = (root) => {
  const titleBoard = document.createElement("div");
  titleBoard.id = "title";
  titleBoard.style.backgroundColor = "#35C48B";
  titleBoard.style.width = `${GAME_WIDTH + 20}px`;
  titleBoard.style.height = "80px";
  titleBoard.style.position = "absolute";
  titleBoard.style.top = "calc(50% - 530px)";
  titleBoard.style.left = "calc(50% - 250px)";

  root.append(titleBoard);

  // Show number of lives from global variable NUMBER_LIFE
  for (i = 1; i <= NUMBER_LIFE; i++) {
    const showLife = document.createElement("img");
    showLife.id = `life-${i}`;
    showLife.src = "./images/water/seadoo_top.png";
    // showLife.style.transform = "rotate(45deg)";
    showLife.style.position = "relative";
    showLife.style.display = "inline";
    showLife.style.padding = "3px";
    showLife.style.width = "29px";
    titleBoard.append(showLife);
  }
};

// Button styling for arrow keys and start, and pause
const addButtons = (gameBoard) => {
  for (let i = 0; i <= 5; i++) {
    const button = document.createElement("button");
    if (i === 0) {
      button.id = "start";
      button.innerText = "START";
      button.style.borderRadius = "10px";
      button.style.left = "270px";
      button.style.width = "90px";
      button.style.height = "25px";
      button.style.margin = "60px 0 10px 40px";
      button.style.transform = "rotate(-30deg)";
    } else if (i === 1) {
      button.id = "pause";
      button.innerText = "PAUSE";
      button.style.borderRadius = "10px";
      button.style.width = "90px";
      button.style.height = "25px";
      button.style.left = "320px";
      button.style.top = "100px";
      button.style.margin = "-20px 0 10px 40px";
      button.style.transform = "rotate(-30deg)";
    } else if (i === 2) {
      button.id = "left";
      button.innerText = "←";
      button.style.borderRadius = "50%";
      button.style.left = "80px";
      button.style.top = "60px";
      button.style.width = "50px";
      button.style.height = "50px";
    } else if (i === 3) {
      button.id = "right";
      button.innerText = "→";
      button.style.borderRadius = "50%";
      button.style.left = "180px";
      button.style.top = "60px";
      button.style.width = "50px";
      button.style.height = "50px";
    } else if (i === 4) {
      button.id = "up";
      button.innerText = "←";
      button.style.borderRadius = "30px";
      button.style.left = "130px";
      button.style.top = "15px";
      button.style.width = "50px";
      button.style.height = "50px";
      button.style.transform = "rotate(90deg)";
    } else {
      button.id = "down";
      button.innerText = "→";
      button.style.borderRadius = "30px";
      button.style.left = "130px";
      button.style.top = "105px";
      button.style.width = "50px";
      button.style.height = "50px";
      button.style.transform = "rotate(90deg)";
    }

    button.style.color = "grey";
    button.style.border = "none";
    button.style.backgroundColor = "#212121";
    button.style.position = "absolute";
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";

    gameBoard.append(button);
  }
};

// Function that illustrates sharkmouth after player is dead
let showRestart = false;
const aftermathImgs = (mainBoard, player) => {
  // document.removeEventListener("keydown", handleKeydown);
  const gameBoard = document.getElementById("game");
  const splash = document.createElement("img");

  const displayShark = document.createElement("img");
  displayShark.id = "megalodon";
  displayShark.src = "images/water/sharksmile.png";
  displayShark.style.position = "absolute";
  displayShark.style.width = "150px";
  displayShark.style.height = "150px";
  displayShark.style.top = `${gameEngine.player.y + 75}px`;
  displayShark.style.left = `${gameEngine.player.x - 20}px`;
  displayShark.style.opacity = "0";
  displayShark.style.zIndex = "8";

  setTimeout(() => {
    displayShark.style.transform = "scale(4)";
    displayShark.style.opacity = "0.5";
    displayShark.style.transition = "all 4s ease-in-out";

    setTimeout(() => {
      player.domElement.style.transform = "scale(0)";
      player.domElement.style.opacity = "0";

      setTimeout(() => {
        splash.src = "images/water/splash.gif";
        splash.style.width = "100px";
        splash.style.height = "100px";
        splash.style.position = "absolute";
        splash.style.top = `${player.y}px`;
        splash.style.left = `${player.x - 30}px`;

        gameBoard.append(splash);
      }, 1000);
    }, 300);
  }, 100);
  mainBoard.append(displayShark);
  showRestart = true;
  return showRestart;
};

// Add popup for restart
const addAskRestart = (root) => {
  const restartPopUp = document.createElement("div");
  const restartText = document.createElement("span");

  // console.log(showRestart);
  restartPopUp.id = "restartpopup";
  restartPopUp.style.fontSize = "2em";
  restartPopUp.style.position = "absolute";
  restartPopUp.style.width = "460px";
  restartPopUp.style.height = "300px";
  // restartPopUp.style.backgroundColor = "#35C48B";
  restartPopUp.style.border = "10px solid #35C48B";
  restartPopUp.style.color = "white";
  restartPopUp.style.left = `calc(50% - 230px)`;
  restartPopUp.style.top = `calc(50% - 300px)`;
  restartPopUp.style.display = "flex";
  restartPopUp.style.flexDirection = "column";
  restartPopUp.style.alignItems = "center";
  restartPopUp.style.justifyContent = "center";
  restartPopUp.style.textAlign = "center";
  restartPopUp.style.zIndex = "10";
  restartPopUp.style.display = "none";
  restartText.innerText =
    "Megalodon caught you!\n\n Would you like to play again?\n";

  restartPopUp.append(restartText);

  for (let i = 0; i < 2; i++) {
    const restartBtn = document.createElement("button");
    restartBtn.id = i === 0 ? "restart" : "quit";
    restartBtn.innerText = i === 0 ? "YES" : "NO";
    restartBtn.style.fontSize = "1.5em";
    restartBtn.style.fontFamily = "'Londrina Solid', cursive";
    restartBtn.style.display = "inline";
    restartBtn.style.flexDirection = "row";
    restartBtn.style.position = "relative";
    restartBtn.style.width = "150px";
    restartBtn.style.height = "80px";
    restartBtn.style.margin = "35px 40px 10px";
    restartBtn.style.backgroundColor = i === 0 ? "#35C48B" : "#E2BEA4";
    restartBtn.style.border = "none";
    restartBtn.style.borderRadius = "10px";
    restartBtn.style.color = "white";
    restartBtn.style.padding = "0";

    restartText.append(restartBtn);
  }

  root.append(restartPopUp);
};

// Since acess to CSS pseudo selector was almost impossible in JS, inefficiency
// from unnecessary method to animate clicks can be noticed
const pressYesNo = (id) => {
  if (id === "restart") {
    document.getElementById("restart").style.backgroundColor = "#3CDF9E";
    setTimeout(() => {
      document.getElementById("restart").style.backgroundColor = "#36C38A";
    }, 50);
  } else {
    document.getElementById("quit").style.backgroundColor = "#F9D1B6";
    setTimeout(() => {
      document.getElementById("quit").style.backgroundColor = "#E3BEA4";
    }, 50);
  }
  document.getElementById("restartpopup").style.opacity = "0";
  document.getElementById("restartpopup").style.transition = "opacity 0.5s";

  return id;
};

// Countdown function
const countDown = () => {
  let counter = 3;
  const countDown = document.getElementById("countdown");
  const startIn3 = setInterval(() => {
    if (counter <= 3 && counter > 0) {
      countDown.innerText = counter;
    } else if (counter === 0) {
      countDown.innerText = "";
    } else {
      clearInterval(startIn3);
      clearTimeout(gameEngine.status);
      gameEngine.gameLoop();
    }
    counter--;
  }, 1000);
};

// Countdown text
const addCountDown = (mainBoard) => {
  const countDown = document.createElement("h1");
  countDown.id = "countdown";
  countDown.style.color = "#212121";
  countDown.style.position = "absolute";
  countDown.style.fontSize = "15em";
  countDown.style.left = "calc(50% - 40px)";
  // countDown.innerText = "3";

  mainBoard.append(countDown);
};

// Check the gameLoop at the same frequency to dynamically see if player is dead
let checkPlayer;
const myIntervalFn = () => {
  checkPlayer = setInterval(() => {
    if (gameEngine.isPlayerDead()) {
      document.removeEventListener("keydown", handleKeydown);
      myStopIntervalFn();
      clearTimeout(gameEngine.status);
      console.log(gameEngine.isPlayerDead());

      setTimeout(() => {
        document.getElementById("restartpopup").style.display = "flex";
      }, 1000);
    }
  });
};

const myStopIntervalFn = () => {
  clearInterval(checkPlayer);
};

// Resetting player upon (re)start
const resetPlayer = () => {
  gameEngine.playerDead = false;
  const player = gameEngine.player.domElement;
  player.style.left = `${2.25 * PLAYER_WIDTH}px`;
  player.style.top = `${
    GAME_HEIGHT - parseInt(document.getElementById("info").style.height) - 165
  }px`;

  player.style.border = "none";
  player.style.transform = "scale(1)";
  player.style.opacity = "1";
};
