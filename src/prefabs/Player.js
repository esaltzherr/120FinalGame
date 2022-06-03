class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;

        // physics settings
        this.setPushable(false);
      
        this.setSize(54, 54);
        this.setOffset(64 / 5 + 10, 64 / 2 + 10);

        // Facing for animations and dashing
        this.facing = 'South';
        this.walkingDirection = 'South';
        this.moveDirection = '';
        this.moving = false;
        this.standingStill = true;

        this.canTakeDamage = true;
        this.knockedBack = false;
        this.knockBackMaxTime = 50;
        this.knockBackTime = this.knockBackMaxTime;
        this.knockBackSpeed = 300;
        //ability bools
        this.canWalk = true;
        this.defaultMoveSpeed = 200;
        this.moveSpeed = this.defaultMoveSpeed;
        // this can also be used as a "Currently Using Ability"
        this.tempDisableMove = false;

        this.canDash = true;
        this.dashing = false;
        this.defaultDashSpeed = 700;
        this.dashSpeed = this.defaultDashSpeed;
        this.defaultDashCooldown = 200;
        this.maxDashCooldown = this.defaultDashCooldown;
        this.dashCoolDown = 0;
        this.maxDashTimer = 30; // 50 is about 100 pixels
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
        this.defaultHealAmount = .1;
        this.healAmount = this.defaultHealAmount;

        this.canStab = true;
        this.stabbing = false;
        this.stabCooldown;
        this.stabRadius;

        this.gun = new Gun(this.scene, this.x, this.y + 50, 'player_gun', this).setOrigin(0.5, 0.25);
        this.knife = new Knife(this.scene, this.x, this.y, 'NOTHING', this);
        this.knifeHitbox;


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
        
        this.abilities();
        this.timers();
        if (this.dashing || this.healing || this.stabbing || this.knockedBack) {
            this.tempDisableMove = true;
        }
        else {
            this.tempDisableMove = false;
        }
    }
  
    move() {
        if (!this.dashing && !this.knockedBack) {
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

        if (moveDirection.length > 0) {
            this.standingStill = false;
        }
        else {
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
            if (this.standingStill || this.tempDisableMove || !this.canWalk) {
                this.anims.play('player_idle_up', true);
            }
            else {
                this.anims.play('player_run_up', true);
            }
            this.depth = 3;
        }
        else if (this.facing.includes('South')) {
            // set to Angled Down animationdw
            if (this.standingStill || this.tempDisableMove || !this.canWalk) {
                this.anims.play('player_idle_down', true);
            }
            else {
                this.anims.play('player_run_down', true);
            }
            this.depth = 1;
        }


    }
  
    abilities() {
        if (this.canHeal) {
            if (keySHIFT.isDown && !this.dashing && !this.stabbing) {
                if (this.health < this.maxHealth) {
                    if (this.health + this.healAmount < this.maxHealth) {
                        this.health += this.healAmount;
                    }
                    else {
                        this.health = this.maxHealth;
                    }
                }
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
            if (this.scene.input.activePointer.rightButtonDown() && !this.dashing && !this.healing && !this.stabbing) {
                this.stabbing = true;
                this.knife.body.enable = true;
                this.knife.visible = true;
                this.knife.angle = this.gun.angle;
                this.knife.flipY = this.gun.flipY;
                var angle = this.knife.angle;
                var dir = '';
                if (angle >= 0) {
                    dir += 'South'
                }
                else {
                    dir += 'North'
                }
                if (Math.abs(angle) >= 90) {
                    dir += 'West'
                }
                else {
                    dir += 'East'
                }
                switch (dir) {
                    case 'SouthWest':
                        this.knifeHitbox = this.scene.add.rectangle(this.x, this.y + this.height/4, 75, 75, 0xff66ff).setOrigin(1, 0);
                        break;
                    case 'SouthEast':
                        this.knifeHitbox = this.scene.add.rectangle(this.x, this.y + this.height/4, 75, 75, 0xff66ff).setOrigin(0, 0);
                        break;
                    case 'NorthWest':
                        this.knifeHitbox = this.scene.add.rectangle(this.x, this.y + this.height/4, 80, 80, 0xff66ff).setOrigin(1, 1);
                        break;
                    case 'NorthEast':
                        this.knifeHitbox = this.scene.add.rectangle(this.x, this.y + this.height/4, 80, 80, 0xff66ff).setOrigin(0, 1);
                        break;
                }
                this.knifeHitbox.setVisible(false);
                this.scene.physics.add.existing(this.knifeHitbox);
                this.scene.physics.add.overlap(this.knifeHitbox, this.scene.monsters, (knife, monster) => {monster.destroy(); });
                this.scene.physics.add.overlap(this.knifeHitbox, this.scene.monsterBullets, (knife, bullet) => {bullet.destroy(); });

                var angle = Phaser.Math.DegToRad(this.gun.angle);
                Phaser.Math.RotateTo(this.knife, this.x, this.y, angle, this.knife.distanceFromPlayer);
                // play stab animation
                this.knife.anims.play('stab', true);
                this.knife.on('animationcomplete', this.knifeComplete)
                // on animation finish stabbing = false
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
        if (this.knockedBack) {
            this.canTakeDamage = false;
            this.knockBackTime -= 1;
            if (this.knockBackTime % 10 == 0) {
                this.flicker();
            }
        }
        if (this.knockBackTime < 0) {
            this.alpha = 1;
            this.knockedBack = false;
            this.canTakeDamage = true;
            this.knockBackTime = this.knockBackMaxTime;
        }
    }
  
    moveEntity(horizontal, verticle, speed) {
        this.scene.physics.moveTo(this, horizontal * 100 + this.x, verticle * 100 + this.y, speed);
        this.scene.physics.moveTo(this.gun, horizontal * 100 + this.x, verticle * 100 + this.y, speed);
    }
  
    knockback(monster) {
        this.knockedBack = true;
        let angle = Phaser.Math.Angle.Between(this.x, this.y, monster.x, monster.y);
        let horizontal = Math.cos(angle);
        let verticle = Math.sin(angle);

        this.moveEntity(-horizontal, -verticle, this.knockBackSpeed);
    }
  
    flicker() {
        if (this.alpha == 0.5) {
            this.alpha = 1;
        }
        else if (this.alpha == 1) {
            this.alpha = 0.5
        }
    }
  
    knifeComplete = () => {
        this.stabbing = false;
        this.knife.body.enable = false;
        this.knife.visible = false;
        this.knifeHitbox.destroy();
    }
}