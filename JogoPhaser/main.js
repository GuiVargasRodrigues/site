const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'gameContainer',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let cursors;
let bullets;
let enemies;
let lastFired = 0;
let score = 0;
let scoreText;
let gameOverText;

function preload() {
    this.load.image('background', 'https://labs.phaser.io/assets/skies/space3.png');
    this.load.image('ship', 'https://labs.phaser.io/assets/sprites/player.png');
    this.load.image('bullet', 'https://labs.phaser.io/assets/sprites/bullets/bullet6.png');
    this.load.image('enemy', 'https://labs.phaser.io/assets/sprites/space-baddie.png');  // URL corrigida
}

function create() {
    // Add background
    this.add.tileSprite(400, 300, 800, 600, 'background');

    // Add player
    player = this.physics.add.sprite(400, 500, 'ship').setScale(0.75);  // Aumenta o tamanho da nave
    player.setCollideWorldBounds(true);

    // Player controls
    cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown-SPACE', fireBullet, this);

    // Add bullets
    bullets = this.physics.add.group({
        classType: Bullet,
        runChildUpdate: true
    });

    // Add enemies
    enemies = this.physics.add.group({
        key: 'enemy',
        repeat: 5,
        setXY: { x: 12, y: 50, stepX: 140 }
    });

    enemies.children.iterate(function (enemy) {
        enemy.setBounce(1);
        enemy.setCollideWorldBounds(true);
        enemy.setVelocity(Phaser.Math.Between(-200, 200), 20);
    });

    // Add score
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

    // Add collisions
    this.physics.add.collider(bullets, enemies, hitEnemy, null, this);
    this.physics.add.collider(player, enemies, gameOver, null, this);
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-300);
    } else if (cursors.right.isDown) {
        player.setVelocityX(300);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-300);
    } else if (cursors.down.isDown) {
        player.setVelocityY(300);
    } else {
        player.setVelocityY(0);
    }
}

function fireBullet() {
    const time = this.time.now;
    if (time > lastFired) {
        const bullet = bullets.get();
        if (bullet) {
            bullet.fire(player.x, player.y);
            lastFired = time + 100;
        }
    }
}

function hitEnemy(bullet, enemy) {
    bullet.destroy();
    enemy.destroy();

    score += 10;
    scoreText.setText('Score: ' + score);

    if (enemies.countActive(true) === 0) {
        gameOverText = this.add.text(200, 250, 'Você Venceu!', { fontSize: '64px', fill: '#fff' });
        this.physics.pause();
    }
}

function gameOver(player, _enemy) {
    player.setTint(0xff0000);
    this.physics.pause();
    gameOverText = this.add.text(200, 250, 'Game Over', { fontSize: '64px', fill: '#fff' });
}

class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');
    }

    fire(x, y) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityY(-500);
    }

    update(_time, _delta) {
        if (this.y < 0) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
