export class GameBall extends Phaser.GameObjects.Arc {
    constructor(scene, x, y, radius, color, alpha, initialSpeed) {
        // la bola con su posición, tamaño y color
        super(scene, x, y, radius, 0, 360, false, color, alpha);

        // la bola a la escena
        scene.add.existing(this);

        // sistema de física a la bola
        scene.physics.add.existing(this);

        // las propiedades del cuerpo de la bola
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(1, 1);

        // la velocidad inicial
        this.body.setVelocity(initialSpeed, initialSpeed);
        this.body.onWorldBounds = true;
    }

    increaseSpeed(multiplier) {
        // la velocidad de la bola multiplicando la velocidad actual
        this.body.setVelocity(this.body.velocity.x * multiplier, this.body.velocity.y * multiplier);
    }
}
