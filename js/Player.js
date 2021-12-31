// There will only be one instance of this class. This instance will contain the
// data and methods related to the burger that moves at the bottom of your screen
class Player {
  // The constructor takes one parameter. This parameter refers to the parent DOM node.
  // We will be adding a DOM element to this parent DOM node.
  constructor(root) {
    // The x position starts off in the middle of the screen. Since this data is needed every time we move the player, we
    // store the data in a property of the instance. It represents the distance from the left margin of the browsing area to
    // the leftmost x position of the image.
    this.x = 2.25 * PLAYER_WIDTH;

    // The y position never changes, so we don't need to store it in a property. It represents the y position of the top of the
    // hamburger. The y position is the distance from the top margin of the browsing area.
    this.y =
      GAME_HEIGHT -
      parseInt(document.getElementById("info").style.height) -
      165;

    // We create a DOM node. We will be updating the DOM node every time we move the player, so we store a reference to the
    // DOM node in a property.
    this.domElement = document.createElement("img");
    this.domElement.id = "player";
    this.domElement.src = "images/water/seadoo.gif";
    this.domElement.style.position = "absolute";
    // this.domElement.style.left = `calc(50% - ${this.x / 4}px`;
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    // this.domElement.style.border = "1px solid red";
    this.domElement.style.width = "50px";
    this.domElement.style.height = `${PLAYER_HEIGHT}px`;
    this.domElement.style.zIndex = "10";
    this.domElement.style.transition = "all 0.7s";

    root.appendChild(this.domElement);
  }

  // This method will be called when the user presses the left key. See in main.js
  // how we relate the key presses to this method
  moveLeft() {
    this.domElement.style.transform = "rotate(-30deg)";
    if (this.x > 25) {
      this.x -= PLAYER_WIDTH;
    }
    setTimeout(() => {
      this.domElement.style.transform = "rotate(0deg)";
    }, 150);
    this.domElement.style.left = `${this.x}`;
  }

  // We do the same thing for the right key. See main.js to see when this happens.
  moveRight() {
    this.domElement.style.transform = "rotate(30deg)";
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.x += PLAYER_WIDTH;
    }
    setTimeout(() => {
      this.domElement.style.transform = "rotate(0deg)";
    }, 150);
    this.domElement.style.left = `${this.x}px`;
  }

  moveUp() {
    if (this.y > 345) {
      this.y -= PLAYER_HEIGHT;
    }
    this.domElement.style.top = `${this.y}px`;
  }

  moveDown() {
    if (this.y < 465) {
      this.y += PLAYER_HEIGHT;
    }
    this.domElement.style.top = `${this.y}px`;
  }
}
