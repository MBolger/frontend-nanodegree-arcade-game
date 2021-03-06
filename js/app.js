// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    "use strict";
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    "use strict";
    if(this.x < ctx.canvas.width) {
        this.x += this.speed * dt;
    }
    //This will reset if the enemy is off the screen
    else {
        this.x = -75;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    "use strict";
    ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
};

//Player Class
var Player = function (x, y, playerPosition) {
    "use strict";
    this.sprite = "images/char-cat-girl.png";
    this.x = x;
    this.y = y;
    this.playerPosition = playerPosition;
};



Player.prototype.update = function(dt) {
   //Reset player back to start once they reach the top
    "use strict";
    if(this.y < 50) {
        this.reset();
    }
    //Players area
    var playerPosition = {
        'left': this.x,
        'bottom': this.y,
        'right': this.x+50,
        'top': this.y+70,
    }
    //Iterate through allEemies and define enemy area
    for(var e = 0, len = allEnemies.length; e < len; e++) {
        var bugPosition = {
            'left': allEnemies[e].x,
            'bottom': allEnemies[e].y,
            'right': allEnemies[e].x+70,
            'top': allEnemies[e].y+70,
        };
        //Collision Detect
    if(playerPosition.left<bugPosition.right &&
        playerPosition.bottom<bugPosition.top &&
        playerPosition.right>bugPosition.left &&
        playerPosition.top>bugPosition.bottom){
        this.reset(); }
    }
};

//Player reset function.
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
    if(key === 'left' && this.x > 25) {
        this.x = this.x - 100;
    }
    if(key === 'up' && this.y > 0) {
        this.y = this.y - 82.5;
    }
    if(key === 'right' && this.x < 400) {
        this.x = this.x + 100;
    }
    if(key === 'down' && this.y < 400) {
        this.y = this.y + 82.5;
    }
};

var allEnemies = [new Enemy(0, 60, 100),
                  new Enemy(0, 145, 200),
                  new Enemy(0, 230, 300)];

var player = new Player(200, 400);

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
