class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;

        // physics settings
        this.setPushable(false);

        //this.body.collideWorldBounds = true;

        this.setSize(this.width - 10, this.height - 10);
        this.setOffset(this.width / 5 + 10, this.height / 2 + 10);


        
        // Facing for animations and dashing
        this.facing = 'South';
        this.walkingDirection = 'South';
        this.moveDirection = '';
        this.moving = false;
        this.standingStill = true;


        this.knockedBack = false;
        this.knockBackMaxTime = 50;
        this.knockBackTime = this.knockBackMaxTime;
        this.knockBackSpeed = 300;
        //ability bools
        this.canWalk = true;
        this.defaultMoveSpeed = 100;
        this.moveSpeed = this.defaultMoveSpeed;
        // this can also be used as a "Currently Using Ability"
        this.tempDisableMove = false;

        this.canDash = true;
        this.dashing = false;
        this.defaultDashSpeed = 500;
        this.dashSpeed = this.defaultDashSpeed;
        this.defaultDashCooldown = 300;
        this.maxDashCooldown = this.defaultDashCooldown;
        this.dashCoolDown = 0;
        this.maxDashTimer = 50; // 50 is about 100 pixels
        this.dashTimer = this.maxDashTimer;

        this.canShoot = true;
        this.defaultShootCooldown = 50;
        this.shootCoolDown = this.defaultShootCooldown;
        this.defaultBulletDamage = 50;
        this.bulletDamage = this.defaultBulletDamage;

        this.canHeal = true;
        this.healing = false;
        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.defaultHealAmount = 1;
        this.healAmount = this.defaultHealAmount;

        this.canStab = true;
        this.stabbing = false;
        this.stabCooldown;
        this.stabRadius;

        this.gun = new Gun(this.scene, this.x, this.y + 50, 'player_gun', this).setOrigin(0.5, 0.25);
        this.knife = new Knife(this.scene, this.x, this.y, 'NOTHING', this);


        // animations
        this.anims.create({
            key: 'player_idle_down',
            frames: 'player_idle_right',
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'player_idle_up',
            frames: 'player_idle_up_right',
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'player_run_down',
            frames: 'player_run_right',
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'player_run_up',
            frames: 'player_run_up_right',
            frameRate: 20,
            repeat: -1
        });
    }

    update() {
        this.move();
        
        this.gun.update();
        this.facing = this.gun.facing;
        this.knife.update();
        
        this.abilities();
        this.timers();
        if (this.dashing || this.healing || this.stabbing || this.knockedBack) {
            this.tempDisableMove = true;
        }
        else {
            this.tempDisableMove = false;
        }

        //console.log(this.x);
        //console.log(this.x);
    }
    move() {
        if (!this.dashing && ! this.knockedBack) {
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
       
        if(moveDirection.length > 0){
            this.standingStill = false;
            //console.log("HJFOKDSHFJKHDSJKFHSKDJHKJ");
        }
        else{
            this.standingStill = true;
        }


        // Same Animations for each direction but flipped to match direction
        if (this.facing.includes('East')) {
            this.flipX = false;
        }
        else if (this.facing.includes('West')) {
            this.flipX = true
        }
        if (this.facing.includes('North')) {
            // set to Angled Up animation
            if(this.standingStill){
                this.anims.play('player_idle_up', true);
            }
            else{
                this.anims.play('player_run_up', true);
            }
            this.depth = 3;
        }
        else if (this.facing.includes('South')) {
            // set to Angled Down animationdw
            if(this.standingStill){
                this.anims.play('player_idle_down', true);
            }
            else{
                this.anims.play('player_run_down', true);
                
            }
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

        //// this gonna change when an animation is added. the else will be replaced with animation finishing.
        if (this.canStab) {
            if (this.scene.input.activePointer.rightButtonDown() && !this.dashing && !this.healing) {
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
        if(this.knockedBack){
            this.knockBackTime -= 1;
            if(this.knockBackTime%10 == 0){
                this.setTan
                this.flicker();
            }
        }
        if(this.knockBackTime < 0){
            this.alpha = 1;
            this.knockedBack = false;
            this.knockBackTime = this.knockBackMaxTime;
        }



    }
    moveEntity(horizontal, verticle, speed) {
        this.scene.physics.moveTo(this, horizontal * 100 + this.x, verticle * 100 + this.y, speed);
        this.scene.physics.moveTo(this.gun, horizontal * 100 + this.x, verticle * 100 + this.y, speed);
    }
    knockback(monster){
        this.knockedBack = true;
        let angle = Phaser.Math.Angle.Between(this.x, this.y, monster.x, monster.y);
        let horizontal =  Math.cos(angle);
        let verticle = Math.sin(angle);

        
        this.moveEntity(-horizontal,  -verticle, this.knockBackSpeed);
    }
    flicker(){
        if(this.alpha == 0.5){
            this.alpha = 1;
        }
        else if (this.alpha == 1){
            this.alpha = 0.5
        }
    }
}