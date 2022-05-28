class TemplateMonster extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, config = {
        speed: 50,
        health: 100,
        meleeDamage: 10,
        sizeX: 50,
        sizeY: 50,
        offsetX: 0,
        offsetY: 0,
        scale: 1,
        isTower: false
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
        this.isTower = config.isTower
        this.beingKnifed = false

        // size settings
        this.setSize(config.sizeX, config.sizeY);
        this.setOffset(config.offsetX, config.offsetY);
        this.scale = config.scale;

        //console.log(this.x + ', ' + this.y)
    }

    update() {
        if(!this.beingKnifed) { this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, this.speed); }
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

    knockback(player){
        // KNOCKBACK DOESN'T RESPECT ANGLE

        this.beingKnifed = true;
        let angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
        let horizontal =  Math.cos(angle);
        let verticle = Math.sin(angle);

        this.setVelocity(-this.velocityX + this.x, -this.velocityY + this.y)
        //this.beingKnifed = false
    }
}