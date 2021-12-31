class Engine {
  constructor(theRoot) {
    this.root = theRoot;
    this.finEnemies = [];
    this.bodyEnemies = [];

    addBackground(this.root);
    addIntro(this.root);
    setTimeout(() => {
      document.getElementById("intro").style.opacity = "1";
    }, 2000);
    addMainBoard(this.root);
    addGameBoard(this.root);
    addInfoBoard(this.root);
    addTitleBoard(this.root);
    addButtons(document.getElementById("info"));
    addCountDown(document.getElementById("main"));
    addAskRestart(this.root);

    this.player = new Player(document.getElementById("game"));
    this.playerDead = false;
    this.flag = 1;
    this.stopTime = false;
  }

  gameLoop = () => {
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();

    // Update fin enemies
    this.finEnemies.forEach((enemy) => {
      if (this.flag % 2 === 0) {
        enemy.y = enemy.y - timeDiff * enemy.speed;
      }
      if (enemy.y + 210 > GAME_HEIGHT) {
        enemy.isOutsideBox = true;
        document.getElementById("game").removeChild(enemy.domElement);
      }
      enemy.update(timeDiff);
    });

    // Update baby megalodons (
    // Notice they only get injected into the gameboard 8 seconds after start
    // which is ideal time a user is starting to get used to the game
    this.bodyEnemies.forEach((enemy) => {
      if (this.flag % 2 === 0) {
        enemy.x = enemy.x - (timeDiff * enemy.speed) / 10;
      }
      if (enemy.x > 500) {
        enemy.isOutsideBox = true;
        document.getElementById("game").removeChild(enemy.domElement);
      }
      setInterval(() => {
        enemy.update(timeDiff);
      }, 8000);
    });

    // Filter enemies by checking if they're out of the gameboard
    // Originally it was done by checking if they're destroyed but
    // this modification allows more room for collision detection
    this.finEnemies = this.finEnemies.filter((enemy) => {
      return !enemy.isOutsideBox;
    });
    this.bodyEnemies = this.bodyEnemies.filter((enemy) => {
      return !enemy.isOutsideBox;
    });

    // To keep enough enemies in the board at a time
    while (this.finEnemies.length < MAX_FINENEMIES) {
      const spot = nextFinEnemySpot(this.finEnemies);
      this.finEnemies.push(
        new Enemy(document.getElementById("game"), spot, "fin")
      );
    }

    while (this.bodyEnemies.length < MAX_BODYENEMIES) {
      const spot = nextBodyEnemySpot(this.bodyEnemies);
      this.bodyEnemies.push(
        new Enemy(document.getElementById("game"), spot, "body")
      );
    }

    this.status = setTimeout(this.gameLoop, 20);

    if (this.isPlayerDead()) {
      // window.alert("Game Over");
      clearTimeout(this.status);
      aftermathImgs(document.getElementById("main"), this.player);
      document.removeEventListener("keydown", handleKeydown);

      // Ask restart
      setTimeout(() => {
        document.getElementById("restartpopup").style.display = "flex";
        document.getElementById("restartpopup").style.opacity = "1";
        document.getElementById("restartpopup").style.transition =
          "opacity 0.5s";
      }, 1000);

      console.log("Game Over");
    }
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    const playerPosX = parseInt(this.player.domElement.style.left);
    const playerPosY = parseInt(this.player.domElement.style.top);

    this.finEnemies.forEach((enemy) => {
      if (!enemy.destroyed && enemy.x === playerPosX - 10) {
        if (
          playerPosY - enemy.y <= FINENEMY_HEIGHT - 30 &&
          playerPosY - PLAYER_HEIGHT - enemy.y + FINENEMY_HEIGHT >= 335
        ) {
          this.playerDead = true;
          // this.player.domElement.style.border = "1px solid red";
        }
      }
    });

    this.bodyEnemies.forEach((enemy) => {
      if (!enemy.destroyed && enemy.y - 5 === playerPosY) {
        if (playerPosX - enemy.x === 145) {
          this.playerDead = true;
          // this.player.domElement.style.border = "1px solid red";
        } else if (playerPosX - enemy.x <= 145 && playerPosX - enemy.x >= 10) {
          this.playerDead = true;
          // this.player.domElement.style.border = "1px solid red";
        }
      }
    });

    return this.playerDead;
  };
}
