// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 380 + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= 505) {
        this.x = 0;
    } else {
        this.x += this.speed * dt;
    }
    this.checkCollision(player);

};
//checks for player and enemy collision
Enemy.prototype.checkCollision = function(player) {
    if (player.x < this.x + 75 &&
        player.x + 65 > this.x &&
        player.y < this.y + 50 &&
        70 + player.y > this.y) {
        player.lives -= 1;
        // player.score -= 100;
        //document.getElementById("score").innerHTML = "Score :" + player.score;
        document.getElementById("lives").innerHTML = "Lives :" + player.lives;
        if (player.lives === 0) {

            alert("you lost !!");

            // player.score = 0;
            player.lives = 5;
            // document.getElementById("score").innerHTML = "Score :" + player.score;
            document.getElementById("lives").innerHTML = "lives :" + player.lives;
        }
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
    // this.score = 0;
    this.lives = 5;
};
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
    // Prevent player from moving beyond canvas wall boundaries
    this.boundaries();

};
// Canvas boundaries so player does not go out of canvas
Player.prototype.boundaries = function() {
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 600) {
        this.x = 200;
    } else if (this.y < 0) {
        this.y = 0;

        alert("You won");
        // this.score = 10;
        this.lives = 5;
        // document.getElementById("score").innerHTML = "Score :" + this.score;
        document.getElementById("lives").innerHTML = "Lives :" + this.lives;
        this.reset();
    } else if (this.y > 500) {
        this.y = 400;
    }
};
Player.prototype.reset = function() {
    this.y = 400;
    this.x = 200;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//sets the direction and distance for player movement
Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case "left":
            this.x -= 30;
            break;

        case "right":
            this.x += 30;
            break;

        case "up":
            this.y -= 30;
            break;

        case "down":
            this.y += 30;
            break;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(200, 60), new Enemy(90, 220), new Enemy(130, 140)];

var player = new Player();
//document.getElementById("score").innerHTML = "Score :" + player.score;
document.getElementById("lives").innerHTML = "Lives :" + player.lives;
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});