export class Brick extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, w, h, color, alpha, isBallCreator, isBoomCreator) {
        super(scene, x, y, w, h, color, alpha);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        Object.assign(this, {
            isBallCreator,
            isBoomCreator,
            body: Object.assign(this.body, { immovable: true, collideWorldBounds: true }),
            toches: 0,
            maxToches: Phaser.Math.Between(1, 4)
        });
    }

    hit() {
        this.toches++;

        const colors = [0xe74c3c, 0x2ecc71, 0x9b59b6];
        if (this.toches <= 3) this.setFillStyle(colors[this.toches - 1]);

        if (this.toches >= this.maxToches) this.destroy();
    }
}
