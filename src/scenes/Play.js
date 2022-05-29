class Play extends Phaser.Scene {
    constructor() {
        super("playscene");
    }

    preload() {
        this.load.image('dudeDown', './assets/DudeFaceDown.png');
        this.load.image('dudeUp', './assets/DudeFaceUp.png');
        //this.load.image('bullet', './assets/bullet.png');
        this.load.image('monster', './assets/monster.png');
        this.load.image('tower_body_temp', './assets/tower_body_temp.png');
        this.load.image('sentry_head_temp', './assets/sentry_head_temp.png');
        this.load.image('healer_head_temp', './assets/healer_head_temp.png');
        this.load.image('heal_particle_temp', './assets/heal_particle_temp.png');
        this.load.image('gun', './assets/gun.png');
        this.load.audio('temp_shoot', './assets/temp_shoot.wav');

        // player sprites
        this.load.spritesheet('player_idle_right', './assets/player_idle_right.png', { frameWidth: 96, frameHeight: 96 });
        this.load.spritesheet('player_idle_up_right', './assets/player_idle_up_right.png', { frameWidth: 96, frameHeight: 96 });
        this.load.spritesheet('player_run_right', './assets/player_run_right.png', { frameWidth: 96, frameHeight: 96 });
        this.load.spritesheet('player_run_up_right', './assets/player_run_up_right.png', { frameWidth: 96, frameHeight: 96 });
        this.load.image('player_gun', './assets/player_gun.png');
        this.load.image('player_bullet', './assets/bullet_1.png');

        // enemy sprites
        this.load.spritesheet('slime_enemy', './assets/slime_enemy.png', { frameWidth: 96, frameHeight: 96 });
        this.load.spritesheet('brute_enemy', './assets/brute_enemy.png', { frameWidth: 120, frameHeight: 124 });
        this.load.image('turret_body', './assets/turret_body.png');
        this.load.image('turret_eye', './assets/turret_eye.png');
        this.load.image('healer_body', './assets/healer_body.png');
        this.load.image('healer_eye', './assets/healer_eye.png');
        this.load.image('enemy_bullet', './assets/enemy_bullet.png');

        // other sprites
        this.load.image('floor_1', './assets/floor_1.png');
        this.load.spritesheet('bullet_impact', './assets/bullet_impact.png', { frameWidth: 32, frameHeight: 32});

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.keyboard.addCapture(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    }

    create() {
        // ability enable/disable
        this.events.on('resume', (scene, data) => {
            switch (data.upgrade[0]) {
                case 'Shooting':
                    this.player.shootCoolDown /= 1.5;
                    console.log("ShootCD: " + this.player.shootCooldown);
                    this.player.bulletDamage *= 2;
                    this.player.gun.updateUpgrades(this.player.shootCoolDown, this.player.bulletDamage);
                    break;
                case 'Healing':
                    this.player.healAmount *= 1.5;
                    break;
                case 'Walking':
                    this.player.moveSpeed *= 1.5;
                    break;
                case 'Dashing':
                    this.player.dashSpeed *= 1.5;
                    this.player.maxDashCooldown /= 1.5;
                    break;
                case 'Stabbing':

                    break;
            }
            switch(data.disable[0]){
                case 'Shooting':
                    this.player.canShoot = false;  
                    this.player.gun.updateUpgrades(); 
                    break;
                case 'Healing':
                    this.player.canHeal = false;
                    break;
                case 'Walking':
                    this.player.canWalk = false;
                    console.log(this.player.canWalk);
                    break;
                case 'Dashing':
                    this.player.canDash = false;
                    break;
                case 'Stabbing':
                    this.player.canStab = false;
                    break;
            }
        });

        // world bounds
        this.boundWidth = this.game.config.width * 2.5;
        this.boundHeight = this.game.config.height * 2.5;
        this.physics.world.setBounds(0, 0, this.boundWidth, this.boundHeight);
        this.physics.world.setBoundsCollision(true, true, true, true);

        // ground
        for (let i = -240; i < this.boundWidth; i += 960) {
            for (let j = -135; j < this.boundHeight; j += 540) {
                this.add.sprite(i, j, 'floor_1').setOrigin(0, 0);
            }
        }

        // show world bounds
        this.boundsLeft = this.add.rectangle(0, 0, 50, this.boundHeight).setOrigin(1, 0);
        this.boundsTop = this.add.rectangle(0, 0, this.boundWidth, 50).setOrigin(0, 1);
        this.boundsRight = this.add.rectangle(this.boundWidth, 0, 50, this.boundHeight).setOrigin(0,0);
        this.boundsBottom = this.add.rectangle(0, this.boundHeight, this.boundWidth, 50).setOrigin(0, 0);
        this.boundsLeft.setStrokeStyle(3, 0x1a65ac);
        this.boundsTop.setStrokeStyle(3, 0x1a65ac);
        this.boundsRight.setStrokeStyle(3, 0x1a65ac);
        this.boundsBottom.setStrokeStyle(3, 0x1a65ac);

        // world bound physics (because for some reason, bullets don't wanna collide with actual bounds)
        this.physics.add.existing(this.boundsLeft)
        this.physics.add.existing(this.boundsTop)
        this.physics.add.existing(this.boundsRight)
        this.physics.add.existing(this.boundsBottom)

        this.boundsGroup = this.physics.add.group();
        this.boundsGroup.add(this.boundsLeft);
        this.boundsGroup.add(this.boundsTop);
        this.boundsGroup.add(this.boundsRight);
        this.boundsGroup.add(this.boundsBottom);
        this.boundsGroup.getChildren().forEach(element => {
            element.body.pushable = false;
        });

        // extras
        var r1 = this.add.rectangle(200, 200, 148, 148, 0x6666ff);
        this.add.text(0, 0, "Controls: \nWASD\nSpace - Dash\nShift - Heal\nRightMouseButton - Sword\nLeftMouseButton - Shoot", { font: '"Press Start 2P"' });

        // Mouse Control
        this.input.mouse.disableContextMenu();
        this.input.setPollAlways();

        // setup monsters and spawn first round
        this.monsterTypes = [BasicMonster, BruteMonster, RangedMonster, SentryMonster, HealerMonster];
        this.numMonsters = 10;
        this.monsterBullets = this.physics.add.group();
        this.monsters = this.physics.add.group();
        this.monsters.runChildUpdate = true;
        this.spawnMonsters(this.numMonsters, [BasicMonster]);
        this.spawning = true;
        this.waveNumber = 1;
        this.monstersChosen;

        // player setup 
        this.player = new Player(this, 200, 200, 'dudeDown');
        this.player.body.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player);
        this.bullets = this.physics.add.group();
        this.scene.launch('hud')

        // physics setup
        this.physics.add.collider(this.monsters, this.monsters);
        this.physics.add.collider(this.player, this.monsters, this.gotHit);
        this.physics.add.collider(this.player, this.monsterBullets, (player, bullet) => {
            this.gotShot(player, bullet);
            bullet.destroy();
        });
        this.physics.add.collider(this.monsters, this.bullets, this.hurtMonster);
        this.physics.add.collider(this.player.knife, this.monsters, (knife, monster) => { monster.destroy(); });
        //this.physics.add.collider(this.monsters, this.player.knife, this.stabMonster);

        this.physics.add.collider(this.monsters, this.bullets, this.destroy);
        this.physics.add.collider(this.player.knife, this.monsters, this.killMonster);

        this.physics.add.collider(this.boundsGroup, this.bullets, (bounds, bullet) => { bullet.destroy(); });
        this.physics.add.collider(this.boundsGroup, this.monsterBullets, (bounds, bullet) => { bullet.destroy(); });
        this.physics.add.collider(this.boundsGroup, this.monsters);

        // FOR DEBUG ONLY: CLEAR WAVE
        keyL.on("down", (key, event) => {
            this.monsters.clear(1, 1);
        });
    }

    update() {
        this.disableScreen();
        this.player.update();

        // Maybe add a second delay after killing the last monster so that it does actually die. or move this update to the beggining of update


        // at end of round, spawn 5 more monsters than last round
        if (this.monsters.getLength() == 0 && !this.spawning) {
            this.spawning = true;
            if(this.numMonsters < 50) { this.numMonsters += 5; }
            this.scene.manager.getScene('hud').updateWaveCounter(++this.waveNumber);
            this.monstersChosen = this.pickMonsters();

            this.bullets.clear(1, 1);
            this.monsterBullets.clear(1, 1);
            this.resetPlayer();
            this.scene.launch('selectscene', this.monstersChosen);
            this.scene.pause();
            //console.log(monstersChosen);

            this.spawnMonsters(this.numMonsters, this.monstersChosen);
        }
    }

    hurtMonster(monster, bullet) {
        // damage monsters and destroy them if health is 0
        monster.health -= bullet.damage;
        bullet.destroy();
        if (monster.health <= 0) { monster.destroy(); }
    }

    stabMonster(knife, monster) {
        monster.health -= knife.damage;
        if (monster.health <= 0) { monster.destroy(); }
        //else { monster.knockback(knife); }
    }

    gotHit(player, monster) {
        if(player.canTakeDamage){
            player.health -= monster.meleeDamage;
        }
            
        player.knockback(monster);
    }
    gotShot(player, bullet) {
        if(player.canTakeDamage){
            player.health -= bullet.damage;
        }
        player.knockback(bullet);
    }
    disableScreen() {
        if (Phaser.Input.Keyboard.JustDown(keyO)) {
            //console.log(this); 
            this.scene.launch('selectscene');
            this.scene.pause();
        }
    }

    spawnMonsters(num, monsterArr) {
        // spawn num times every second
        let spawnTimer = this.time.addEvent({
            delay: 1000,
            repeat: num - 1,
            callback: () => {
                // find random point between 200 and 500 pixels way from player
                do {
                    var randX = this.player.x + Math.cos(Phaser.Math.Between(0, 2 * Math.PI)) * Phaser.Math.Between(200, 500);
                    var randY = this.player.y + Math.sin(Phaser.Math.Between(0, 2 * Math.PI)) * Phaser.Math.Between(200, 500);

                    // see if monster is outside of bounds, inside player radius, or overlapping with another monster
                    var outsideBounds = randX < 72 || randX > this.boundWidth - 120 || randY < 120 || randY > this.boundHeight - 120;
                    var insidePlayerRad = Phaser.Math.Distance.Between(this.player.x, this.player.y, randX, randY) < 200;
                    var overlapping = this.monsters.getChildren().filter(enemy => randX >= enemy.x - 120 && randX <= enemy.x + 120 &&
                                                                         randY >= enemy.y - 120 && randY <= enemy.y + 120);
                } while (outsideBounds || insidePlayerRad || overlapping.length > 0);

                // spawn monsters from monsterArr at random
                let monster = monsterArr[Phaser.Math.Between(0, monsterArr.length - 1)];
                this.monsters.add(new monster(this, randX, randY).setOrigin(0.5, 0.5));

                // check if done spawning
                if (spawnTimer.getRepeatCount() == 0) {
                    this.spawning = false;
                }
            },
            callbackScope: this
        });
    }

    pickMonsters() {
        // pick 4 random monsters to put into an array
        let arr = [];
        for (let i = 0; i < 4; ++i) {
            arr.push(this.monsterTypes[Phaser.Math.Between(0, this.monsterTypes.length - 1)]);
        }
        return arr;
    }

    // this may be un needed but I'm not sure yet
    chooseSign() {
        if (Math.floor(Math.random() * 2) % 2 == 0) { return 1; }
        else { return -1; }
    }
    resetPlayer(){
        this.player.moveSpeed = this.player.defaultMoveSpeed;

        this.player.canDash = true;
        this.player.maxDashCooldown = this.player.defaultDashCooldown;
        this.player.dashSpeed = this.player.defaultDashSpeed;


        this.player.canWalk = true;
        this.player.moveSpeed = this.player.defaultMoveSpeed;


        this.player.canHeal = true;
        this.player.healAmount = this.player.defaultHealAmount;

        this.player.canStab = true;

        this.player.canShoot = true;
        this.player.bulletDamage = this.player.defaultBulletDamage;
        this.player.shootCoolDown = this.player.defaultShootCooldown;
        this.player.gun.updateUpgrades();
        
    }
}