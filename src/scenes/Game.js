import { Scene } from "phaser";
import { Paddle } from "../entities/Paddle";
import { Brick } from "../entities/Brick";
import { WallBrick } from "../entities/WallBrick";
import { GameBall } from "../entities/GameBall"; // Importamos GameBall desde un archivo separado

export class Game extends Scene {
    constructor() {
        super("Game"); // Nombre de la escena
    }

    init(data) {
        // Inicializamos la puntuación y la velocidad inicial de la bola
        this.score = data.score || 0; 
        this.initialBallSpeed = data.initialBallSpeed || 300;
    }

    create() {
        // Creamos un grupo de bolas vacío y añadimos una nueva instancia de GameBall
        this.balls = this.add.group();
        const gameBall = new GameBall(this, 400, 300, 10, 0x3498, 1, this.initialBallSpeed);
        this.balls.add(gameBall); 

        // Creamos el paddle y el muro
        this.paddle = new Paddle(this, 200, 650, 200, 20, 0x3498, 1);
        this.wall = new WallBrick(this);

        // Creamos el grupo de bombas
        this.bombs = this.add.group();

        // Configuramos las colisiones
        this.setColliders();

        // Creamos el texto de puntuación
        this.createScoreText();

        // Gestionamos las colisiones con los límites del mundo
        this.handleWorldBounds();
    }

    setColliders() {
        // Colisiones entre el paddle y la bola
        this.physics.add.collider(this.paddle, this.balls);

        // Colisiones entre la bola y los ladrillos del muro
        this.physics.add.collider(this.balls, this.wall, this.onBallHitBrick, null, this);

        // Colisiones entre el paddle y las bombas
        this.physics.add.collider(this.paddle, this.bombs, this.onPaddleHitBoom, null, this);
    }

    createScoreText() {
        // Creación de texto para mostrar la puntuación
        this.scoreText = this.add.text(100, 630, `${this.score}`);
    }

    onBallHitBrick(ball, brick) {
        // Lógica cuando la bola golpea un ladrillo
        brick.hit();
        this.incrementScore();

        if (brick.isBallCreator && this.balls.getChildren().length <= 4) {
            // Si el ladrillo es un creador de bolas, creamos otra bola
            const newBall = new GameBall(this, ball.x, ball.y, 10, 0x3498, 1, this.initialBallSpeed);
            this.balls.add(newBall);
            brick.isBallCreator = false;
        }

        if (brick.isBoomCreator) {
            // Si el ladrillo es un creador de bombas, creamos una bomba
            this.createBoom(ball.x, ball.y);
        }

        // Si todos los ladrillos han sido destruidos, reiniciamos la escena
        if (this.wall.getChildren().every(b => b.destroyed)) {
            this.restartScene();
        }
    }

    onPaddleHitBoom(paddle, boom) {
        // Lógica cuando el paddle golpea una bomba
        this.scene.start("GameOver");
        boom.destroy();
    }

    createBoom(x, y) {
        // Crear una bomba y añadirla al grupo de bombas
        const boom = this.add.circle(x, y, 15, 0xff5733);
        this.physics.add.existing(boom);
        boom.body.setVelocity(0, 300);
        this.bombs.add(boom);
    }

    restartScene() {
        // Aumentamos la velocidad inicial de la bola y reiniciamos la escena
        this.initialBallSpeed *= 1.1; 
        this.scene.restart({ score: this.score, initialBallSpeed: this.initialBallSpeed });
    }

    handleWorldBounds() {
        // Gestión de colisiones con los límites del mundo
        this.physics.world.on("worldbounds", (body, _, down) => {
            if (down) {
                body.gameObject.destroy();
                if (this.balls.getChildren().length === 0) this.scene.start("GameOver");
            }
        });
    }

    incrementScore() {
        // Incrementamos la puntuación y actualizamos el texto
        this.score++;
        this.scoreText.setText(`${this.score}`);
    }

    update() {
        // Actualizamos el estado del paddle
        this.paddle.update();
    }
}
