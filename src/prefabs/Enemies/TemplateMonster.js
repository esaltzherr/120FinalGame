class TemplateMonster extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, config = {
        speed: 50,
        health: 100,
        meleeDamage: 10,
        sizeX: 50,
        sizeY: 50,
        offsetX: 0,
        offsetY: 0,
        scale: 1
    }) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;

        // physics settings
        this.setPushable(false);
        this.speed = config.speed;
        this.maxHealth = config.health;
        this.health = this.maxHealth;
        this.meleeDamage = config.meleeDamage;

        // size settings
        this.setSize(config.sizeX, config.sizeY);
        this.setOffset(config.offsetX, config.offsetY);
        this.scale = config.scale;

        //console.log(this.x + ', ' + this.y)
    }

    update() {
        this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, this.speed);
        if(this.scene.player.x < this.x) { this.flipX = true; }
        else { this.flipX = false; }
    }

    heal() {
        if(this.health <= this.maxHealth - 50){
            this.health += 50;
            if(this.health > this.maxHealth) { this.health = this.maxHealth; }
            //console.log('healed');
            //console.log(this.health);
        }
    }
}