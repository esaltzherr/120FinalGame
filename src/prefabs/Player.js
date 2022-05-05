class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;

        // physics settings
        this.setPushable(false);
        this.speed = 100;
        this.body.collideWorldBounds = true;

        this.setSize(this.width / 2, this.height / 2);
        this.setOffset(this.width / 5, this.height / 2);

        this.fireMaxCooldown = 50;
        this.fireCooldown = this.fireMaxCooldown;

        this.gun = new Gun(this.scene, this.x, this.y, 'gun', this);

        // Facing for animations and dashing
        this.facing = 'South';
    }

    update() {
        this.gun.update();
        this.facing = this.gun.facing;
        this.move();
        this.gun.move();

        //console.log(this.x);
        //console.log(this.x);
    }
    move() {
        this.setVelocity(0, 0);
        var verticle = 0;
        var horizontal = 0;
        if (keyW.isDown) {
            verticle -= 10;
        }
        if (keyS.isDown) {
            verticle += 10;
        }
        if (keyA.isDown) {
            horizontal -= 10;
        }
        if (keyD.isDown) {
            horizontal += 10;
        }


        if (this.x + horizontal != this.x || this.y + verticle != this.y) {
            this.scene.physics.moveTo(this, horizontal + this.x, verticle + this.y, this.speed);
            this.movementAnimations('Running');
        }
        // else you are not moving so set to standing animations
        else {
            this.movementAnimations('Standing');
        }
    }


    movementAnimations(type) {
        // These are all walking animations because this is called only while moving
        // Same Animations for each direction but flipped to match direction
        if (this.facing.includes('East')) {
            this.flipX = true;
        }
        else if (this.facing.includes('West')) {
            this.flipX = false
        }
        if (this.facing.includes('North')) {
            // set to Angled Up animation
            this.setTexture('dudeUp');
            this.depth = 3;
        }
        else if (this.facing.includes('South')) {
            // set to Angled Down animationdw
            this.setTexture('dudeDown');
            this.depth = 1;
        }

    }
}