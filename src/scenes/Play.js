class Play extends Phaser.Scene {
    constructor() {
        super("playscene");
    }

    preload() {
        // player assets
        this.load.spritesheet('player_idle_right', './assets/player/player_idle_right.png', { frameWidth: 96, frameHeight: 96 });
        this.load.spritesheet('player_idle_up_right', './assets/player/player_idle_up_right.png', { frameWidth: 96, frameHeight: 96 });
        this.load.spritesheet('player_run_right', './assets/player/player_run_right.png', { frameWidth: 96, frameHeight: 96 });
        this.load.spritesheet('player_run_up_right', './assets/player/player_run_up_right.png', { frameWidth: 96, frameHeight: 96 });
        this.load.spritesheet('player_knife', './assets/player/melee_anim.png', { frameWidth: 96, frameHeight: 96 });
        this.load.image('player_gun', './assets/player/player_gun.png');
        this.load.image('player_bullet', './assets/player/bullet_1.png');
        this.load.audio('player_shoot', './assets/audio/shoot_sound_final.mp3');
        this.load.audio('dash_sound', './assets/audio/dash_sound.mp3');

        // enemy assets
        this.load.spritesheet('enemy_spawn', './assets/enemies/enemy_spawn_effect.png', {frameWidth: 72, frameHeight: 72});
        this.load.spritesheet('slime_enemy', './assets/enemies/slime_enemy.png', { frameWidth: 96, frameHeight: 96 });
        this.load.spritesheet('brute_enemy', './assets/enemies/brute_enemy.png', { frameWidth: 120, frameHeight: 124 });
        this.load.spritesheet('ranged_enemy', './assets/enemies/ranged_enemy.png', { frameWidth: 96, frameHeight: 96 });
        this.load.image('turret_body', './assets/enemies/turret_body.png');
        this.load.image('turret_eye', './assets/enemies/turret_eye.png');
        this.load.image('healer_body', './assets/enemies/healer_body.png');
        this.load.image('healer_eye', './assets/enemies/healer_eye.png');
        this.load.image('heal_particle', './assets/enemies/heal_particle.png');
        this.load.image('enemy_bullet', './assets/enemies/enemy_bullet.png');
        this.load.audio('hit_enemy', './assets/audio/hit_enemy.mp3');

        // other sprites
        this.load.image('floor_1', './assets/environment/floor_1.png');
        this.load.image('wall', './assets/environment/wall.png');
        this.load.spritesheet('bullet_impact', './assets/player/bullet_impact.png', { frameWidth: 32, frameHeight: 32});

        // inputs
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.keyboard.addCapture(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
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
                    this.player.knife.setScale(1.1);
                    this.player.knife.setSize(120,120);
                    this.player.knife.distance = 15;
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
        this.boundWidth = this.game.config.width * 2.5 - 96;
        this.boundHeight = this.game.config.height * 2.5 - 70;
        this.physics.world.setBounds(0, 0, this.boundWidth, this.boundHeight);
        this.physics.world.setBoundsCollision(true, true, true, true);

        // ground
        for (let i = -240; i < this.boundWidth; i += 960) {
            for (let j = -135; j < this.boundHeight; j += 540) {
                this.add.sprite(i, j, 'floor_1').setOrigin(0, 0);
            }
        }

        // add walls to show world bounds
        for(let x = -768; x < this.boundWidth + 768; x += 128) {
            for(let y = -512; y < this.boundHeight + 512; y += 128) {
                if((x < 0 || x >= this.boundWidth) || (y < 0 || y >= this.boundHeight)) {
                    this.add.sprite(x, y, 'wall').setOrigin(0, 0);
                }
            }
        }

        // world bound physics (because for some reason, bullets don't wanna collide with actual bounds)
        this.boundsLeft = this.add.rectangle(0, 0, 50, this.boundHeight).setOrigin(1, 0);
        this.boundsTop = this.add.rectangle(0, 0, this.boundWidth, 50).setOrigin(0, 1);
        this.boundsRight = this.add.rectangle(this.boundWidth, 0, 50, this.boundHeight).setOrigin(0,0);
        this.boundsBottom = this.add.rectangle(0, this.boundHeight, this.boundWidth, 50).setOrigin(0, 0);

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
        this.player = new Player(this, 200, 200, 'player_idle_right');
        this.player.body.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player);
        this.bullets = this.physics.add.group();
        this.scene.launch('hud')
        this.gameOver = false;

        // physics setup
        this.physics.add.collider(this.monsters, this.monsters);
        this.physics.add.collider(this.player, this.monsters, this.gotHit);
        this.physics.add.collider(this.player, this.monsterBullets, (player, bullet) => {
            this.gotShot(player, bullet);
            bullet.destroy();
        });
        this.physics.add.collider(this.monsters, this.bullets, this.hurtMonster, null, this);
        this.physics.add.collider(this.monsters, this.bullets, this.destroy);
        this.physics.add.collider(this.bullets, this.monsterBullets, (bullet1, bullet2) => {
            bullet1.destroy();
            bullet2.destroy();
        })

        this.physics.add.collider(this.boundsGroup, this.bullets, (bounds, bullet) => { bullet.destroy(); });
        this.physics.add.collider(this.boundsGroup, this.monsterBullets, (bounds, bullet) => { bullet.destroy(); });
        this.physics.add.collider(this.boundsGroup, this.monsters);
    }

    update() {
        if(!this.gameOver) {
            this.player.update();

            if(this.player.health <= 0) {
                this.gameOver = true;
            }

            // at end of round, spawn 5 more monsters than last round
            if (this.monsters.getLength() == 0 && !this.spawning) {
                // update wave and choose monsters to spawn next round
                this.spawning = true;
                if(this.numMonsters < 50) { this.numMonsters += 5; }
                this.scene.manager.getScene('hud').updateWaveCounter(++this.waveNumber);
                this.monstersChosen = this.pickMonsters();
    
                // reset scene and launch select scene
                this.bullets.clear(1, 1);
                this.monsterBullets.clear(1, 1);
                this.resetPlayer();
                this.scene.launch('selectscene', this.monstersChosen);
                this.scene.pause();
    
                // start spawning next round's monsters
                this.spawnMonsters(this.numMonsters, this.monstersChosen);
            }
        }
        else {
            this.scene.stop('hud');
            this.scene.start('gameover');
        }
        
    }

    hurtMonster(monster, bullet) {
        // damage monsters and destroy them if health is 0
        monster.health -= bullet.damage;
        bullet.destroy();
        if (monster.health <= 0) { monster.destroy(); }
        this.sound.play('hit_enemy');
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


        this.player.knife.setScale(.9);
        this.player.knife.setSize(100,100);
        this.player.knife.distance = 10;

    }
}