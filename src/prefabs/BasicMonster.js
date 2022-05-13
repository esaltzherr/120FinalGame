class BasicMonster extends TemplateMonster {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture, {
            speed: 50,
            health: 100,
            meleeDamage: 20,
            sizeX: 75,
            sizeY: 67,
            offsetX: 10,
            offsetY: 27,
            scale: .75
        });

        this.anims.create({
            key: 'slime_move',
            frames: 'slime_enemy',
            frameRate: 4,
            repeat: -1
        });
        this.anims.play('slime_move');

        console.log('spawned basic');
    }
}

/*
// WE PROBABLY DON'T NEED THIS ANYMORE BUT I KEPT IT JUST IN CASE
// THIS IS WHAT WE CALL PROGRAMMER ANXIETY
class BasicMonster extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;

        // physics settings
        this.setPushable(false);
        this.speed = 50;
        this.health = 100;
        this.meleeDamage = 20;
        
        this.setSize(75, 67);
        this.setOffset(10, 27);
        this.scale = 0.75;

        this.anims.create({
            key: 'slime_move',
            frames: 'slime_enemy',
            frameRate: 4,
            repeat: -1
        });
        this.anims.play('slime_move');

        //console.log('spawned basic');
        //console.log(this.x + ', ' + this.y)
    }

    update() {
        this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, this.speed);
        if(this.scene.player.x < this.x) { this.flipX = true; }
        else { this.flipX = false; }
    }
}*/