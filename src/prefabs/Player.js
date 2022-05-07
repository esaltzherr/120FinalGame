class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;

        // physics settings
        this.setPushable(false);
        this.speed = 100;
        this.dashSpeed= 300;
        this.dashAvaliable = true;
        //this.body.collideWorldBounds = true;

        this.setSize(this.width / 2, this.height / 2);
        this.setOffset(this.width / 5, this.height / 2);

        this.fireMaxCooldown = 50;
        this.fireCooldown = this.fireMaxCooldown;

        this.gun = new Gun(this.scene, this.x, this.y, 'gun', this);

        // Facing for animations and dashing
        this.facing = 'South';
        this.walkingDirection = 'South';
        this.moving = false;


        this.health = 100;

        //ability bools
        this.canWalk = true;
        this.moveSpeed = 100;

        this.tempDisableMove = false;

        this.canDash = true;
        this.dashSpeed = 500;
        this.maxDashCooldown = 300;
        this.dashCoolDown = 0;
        this.maxDashTimer = 50; // 50 is about 100 pixels
        this.dashTimer = this.maxDashTimer;

        this.canShoot = true;
        this.shootCoolDown;
        
        this.canHeal = true;
        this.healAmount;
        this.healCoolDown;
        
        this.canStab = true;
        this.stabCooldown;
        this.stabRadius;

    }

    update() {
        
        this.move();
        this.gun.update();
        this.facing = this.gun.facing;
        this.abilities();

        //console.log(this.x);
        //console.log(this.x);
    }
    move() {
        if(!this.tempDisableMove && this.canWalk){
            this.setVelocity(0, 0);
            this.gun.setVelocity(0, 0);
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
                this.moveEntity(horizontal, verticle, this.speed);
                this.moving = true;
                this.movementAnimations('Running', horizontal, verticle);
            }
            // else you are not moving so set to standing animations
            else {
                this.movementAnimations('Standing');
                this.moving = false;
            }
        }
    }

    movementAnimations(type, horizontal = 0, verticle = 0) {
        var moveDirection = '';
        if(horizontal > 0){
            moveDirection += 'East';
        }
        else if(horizontal < 0){
            moveDirection += 'West';
        }
        if(verticle > 0){
            moveDirection += 'South';
        }
        else if(verticle < 0){
            moveDirection += 'North';
        }
        //update direction if you moved
        if(moveDirection != '' && moveDirection != this.moveDirection){
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
    abilities(){
        if(this.canHeal){
            if(Phaser.Input.Keyboard.JustDown(keySHIFT)){
                console.log("Heal");
            }
        }
        if(this.canDash && !this.dashing && this.dashCoolDown < 0){
            if(Phaser.Input.Keyboard.JustDown(keySPACE)){
                console.log("Dash");
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
                this.tempDisableMove = true;;
            }
        }

        if(this.canStab){
            if(false){//left click


            }
        }
        this.timers();
    }
    timers(){
        this.dashCoolDown -= 1;
        if(this.dashing){
            this.dashTimer -= 1;
        }
        if(this.dashTimer < 0){
            this.dashing = false;
            this.tempDisableMove = false;
            this.dashTimer = this.maxDashTimer;
            console.log("reset");
        }
    }
    moveEntity(horizontal, verticle, speed){
        this.scene.physics.moveTo(this, horizontal + this.x, verticle + this.y, speed);
        this.scene.physics.moveTo(this.gun, horizontal + this.x, verticle + this.y, speed);
    }
}