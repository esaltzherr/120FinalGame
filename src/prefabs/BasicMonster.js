class BasicMonster extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;

        // physics settings
        this.setPushable(false);
        this.speed = 50;
    }

    update() {
        this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, this.speed);
    }
    
}