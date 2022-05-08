class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;

        // physics settings
        this.setPushable(false);

        //this.body.collideWorldBounds = true;

        this.setSize(this.width / 2, this.height / 2);
        this.setOffset(this.width / 5, this.height / 2);

        this.fireMaxCooldown = 50;
        this.fireCooldown = this.fireMaxCooldown;

        this.gun = new Gun(this.scene, this.x, this.y, 'gun', this);
        this.knife = new Knife(this.scene, this.x, this.y, 'NOTHING', this);

        // Facing for animations and dashing
        this.facing = 'South';
        this.walkingDirection = 'South';
        this.moving = false;




        //ability bools
        this.canWalk = true;
        this.moveSpeed = 100;
        // this can also be used as a "Currently Using Ability"
        this.tempDisableMove = false;

        this.canDash = true;
        this.dashing = false;
        this.dashSpeed = 500;
        this.maxDashCooldown = 300;
        this.dashCoolDown = 0;
        this.maxDashTimer = 50; // 50 is about 100 pixels
        this.dashTimer = this.maxDashTimer;

        this.canShoot = true;
        this.shootCoolDown;

        this.canHeal = true;
        this.healing = false;
        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.healAmount = 1;

        this.canStab = true;
        this.stabbing = false;
        this.stabCooldown;
        this.stabRadius;

    }

    update() {

        this.move();
        this.gun.update();
        this.knife.update();
        this.facing = this.gun.facing;
        this.abilities();
        if (this.dashing || this.healing || this.stabbing) {
            this.tempDisableMove = true;
        }
        else {
            this.tempDisableMove = false;
        }

        //console.log(this.x);
        //console.log(this.x);
    }
    move() {
        if (!this.dashing) {
            this.setVelocity(0, 0);
            this.gun.setVelocity(0, 0);
        }


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
        this.movementAnimations(horizontal, verticle);
        if (!this.tempDisableMove && this.canWalk) {

            if (this.x + horizontal != this.x || this.y + verticle != this.y) {
                this.moveEntity(horizontal, verticle, this.moveSpeed);
                this.moving = true;
            }
            // else you are not moving so set to standing animations
            else {
                this.moving = false;
            }
        }
    }

    movementAnimations(horizontal, verticle) {
        var moveDirection = '';
        if (horizontal > 0) {
            moveDirection += 'East';
        }
        else if (horizontal < 0) {
            moveDirection += 'West';
        }
        if (verticle > 0) {
            moveDirection += 'South';
        }
        else if (verticle < 0) {
            moveDirection += 'North';
        }
        //update direction if you moved
        if (moveDirection != '' && moveDirection != this.moveDirection) {
            this.moveDirection = moveDirection;
        }

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
    abilities() {
        if (this.canHeal) {
            if (keySHIFT.isDown && !this.dashing && !this.stabbing) {
                console.log("Heal");
                this.healing = true;
            }
            else {
                this.healing = false;
            }
        }
        if (!this.tempDisableMove && this.canDash && this.dashCoolDown < 0) {
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.dashCoolDown = this.maxDashCooldown;
                var horizontal = 0;
                var verticle = 0;
                if (this.moveDirection.includes("North")) {
                    verticle -= 10;
                }
                if (this.moveDirection.includes("South")) {
                    verticle += 10;
                }
                if (this.moveDirection.includes("West")) {
                    horizontal -= 10;
                }
                if (this.moveDirection.includes("East")) {
                    horizontal += 10;
                }

                this.moveEntity(horizontal, verticle, this.dashSpeed);
                this.dashing = true;
            }
        }

        if (this.canStab) {
            if (this.scene.input.activePointer.rightButtonDown()) {
                this.stabbing = true;
                this.knife.body.enable = true;

                
                // play stab animation
                // on animation finish stabbing = false

            }
            else {
                this.stabbing = false;
                this.knife.body.enable = false;
            }
        }
        this.timers();
    }
    timers() {
        this.dashCoolDown -= 1;
        if (this.dashing) {
            this.dashTimer -= 1;
        }
        if (this.dashTimer < 0) {
            this.dashing = false;
            this.dashTimer = this.maxDashTimer;

        }



    }
    moveEntity(horizontal, verticle, speed) {
        this.scene.physics.moveTo(this, horizontal + this.x, verticle + this.y, speed);
        this.scene.physics.moveTo(this.gun, horizontal + this.x, verticle + this.y, speed);
    }
}