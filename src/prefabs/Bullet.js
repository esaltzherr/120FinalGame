class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;
        
        // physics settings
        this.setPushable(false);
        this.outOfBoundsKill = true;
        this.speed = 1000;
        this.damage = 50;
    }

    update() {
    }
    
    destroy() {
        let explosion = this.scene.add.sprite(this.x, this.y).setOrigin(0.5, 0.5);
        explosion.anims.create({
            key: 'bullet_destroy',
            frames: 'bullet_impact',
            frameRate: 24,
        });
        super.destroy();
        explosion.anims.play('bullet_destroy');
        explosion.on("animationcomplete", () => { explosion.destroy(); })
    }
}