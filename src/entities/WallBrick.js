import { Brick } from "./Brick";

export class WallBrick extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);
        this.createWall();
    }

    createWall() {
        const bricksPerRow = 10;
        const rows = 4;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < bricksPerRow; col++) {
                const brick = new Brick(
                    this.scene,
                    60 + col * 90, 
                    50 + row * 55,
                    60, 
                    20,
                    0x3498,
                    1,
                    Phaser.Math.Between(0, 10) > 7,
                    Phaser.Math.Between(0, 10) > 5
                );
                this.add(brick);
            }
        }
    }
}
