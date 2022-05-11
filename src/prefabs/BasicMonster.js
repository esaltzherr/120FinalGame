class BasicMonster extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;

        this.damage = 20;
        // physics settings
        this.setPushable(false);
        this.speed = 50;
        this.health = 100;
        
        this.setSize(75, 67);
        this.setOffset(10, 27);
        this.scale = 0.75;

        console.log('spawned');
        console.log(this.x + ', ' + this.y)
    }

    update() {
        this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, this.speed);
        if(this.scene.player.x < this.x) { this.flipX = true; }
        else { this.flixX = false; }
    }
}