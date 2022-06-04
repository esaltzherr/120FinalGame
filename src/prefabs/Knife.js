class Knife extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, player) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;
        this.player = player;
        this.body.enable = false;
        this.visible = false;
        // physics settings

        
        this.setPushable(false);
        this.distance = 10;
        this.setScale(.9);
        this.setSize(100,100);
        this.depth = 5;
        this.damage = 1

        this.distanceFromPlayer = 30;

        this.anims.create({
            key: 'stab',
            frames: 'player_knife',
            hideOnComplete: true,
            frameRate: 20,
        });
    }



    
}