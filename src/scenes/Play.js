class Play extends Phaser.Scene {
    constructor() {
        super("playscene");
    }
    
    preload(){
        this.load.image('dudeDown','./assets/DudeFaceDown.png');
        this.load.image('dudeUp','./assets/DudeFaceUp.png');
        this.load.image('bullet','./assets/bullet.png');
        this.load.image('monster', './assets/monster.png');
        this.load.image('gun', './assets/gun.png');

        this.load.image('player_gun', './assets/player_gun.png');
        this.load.spritesheet('slime_enemy', './assets/slime_enemy.png', { frameWidth: 96, frameHeight: 96});

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.keyboard.addCapture(Phaser.Input.Keyboard.KeyCodes.SHIFT); 
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        
    }

    create() {
        // world bounds
        this.boundWidth = this.game.config.width * 2.5;
        this.boundHeight = this.game.config.height * 2.5;
        this.physics.world.setBounds(0, 0, this.boundWidth, this.boundHeight);
        this.physics.world.setBoundsCollision(true, true, true, true);

        // show world bounds
        var r3 = this.add.rectangle(0, 0, this.boundWidth, this.boundHeight).setOrigin(0, 0);
        r3.setStrokeStyle(3, 0x1a65ac);

        this.input.mouse.disableContextMenu();
        this.input.setPollAlways();
        this.add.text(0,0,"Controls: \nWASD\nSpace - Dash\nShift - Heal\nRightMouseButton - Sword\nLeftMouseButton - Shoot",  { font: '"Press Start 2P"' });

        // spawn monsters in first round
        this.numMonsters = 10;
        this.monsters = this.physics.add.group();
        this.monsters.runChildUpdate = true;
        this.spawnMonsters(this.numMonsters);
        this.spawning = true;

        this.bullets = this.physics.add.group();

        var r1 = this.add.rectangle(200, 200, 148, 148, 0x6666ff);

        this.player = new Player(this, 200, 200, 'dudeDown');
        this.player.body.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player);

        // minimap
        this.minimap = this.cameras.add(10, 10, 175, 100).setZoom(0.1).setName('mini');
        this.minimap.setBackgroundColor(0x002244);

        this.physics.add.collider(this.monsters, this.monsters);
        this.physics.add.collider(this.player, this.monsters, this.gotHit);
        this.physics.add.collider(this.monsters, this.bullets, this.hurtMonster);
        this.physics.add.collider(this.player.knife, this.monsters, (knife, monster) => { monster.destroy(); });
        
        this.physics.add.collider(this.monsters, this.bullets, this.destroy);
        this.physics.add.collider(this.player.knife, this.monsters, this.killMonster);
    }

    update() {

        this.disableScreen();
        

        this.player.update();
        this.minimap.scrollX = this.player.x;
        this.minimap.scrollY = this.player.y;

        // at end of round, spawn 5 more monsters than last round
        if(this.monsters.getLength() == 0 && !this.spawning) {
            this.spawning = true;
            this.numMonsters += 5;
            this.spawnMonsters(this.numMonsters);
        }
    }

    hurtMonster(monster, bullet) {
        monster.health -= bullet.damage;
        bullet.destroy();
        if(monster.health <= 0) { monster.destroy(); }
    }

    gotHit(player, monster){
        //player.health -= monster.damage;
        player.knockback(monster);

    }

    disableScreen(){
        if(Phaser.Input.Keyboard.JustDown(keyO)){    
            console.log(this); 
            this.scene.launch('selectscene');
            this.scene.pause();
        } 
    }

    spawnMonsters(num) {
        // spawn num times every second
        let spawnTimer = this.time.addEvent({
            delay: 1000,
            repeat: num - 1,
            callback: () => {
                let randX = this.player.x;
                let randY = this.player.y;

                // create coordinates until monsters aren't spawning on each other
                do {
                    // choose x depending on how close player is to edge
                    if(this.player.x < 300) {
                        randX += Phaser.Math.Between(200, 300);
                    }
                    else if(this.player.x > this.boundWidth - 300) {
                        randX -= Phaser.Math.Between(200, 300);
                    }
                    else {
                        randX += Phaser.Math.Between(200, 300) * this.chooseSign();
                    }

                    // choose y depending on how close player is to edge
                    if(this.player.y < 300) {
                        randY += Phaser.Math.Between(200, 300);
                    }
                    else if(this.player.y > this.boundHeight - 300) {
                        randY -= Phaser.Math.Between(200, 300);
                    }
                    else {
                        randY += Phaser.Math.Between(200, 300) * this.chooseSign();
                    }
                    var monsterX = this.monsters.getChildren().filter(enemy => enemy.x == randX);
                    var monsterY = this.monsters.getChildren().filter(enemy => enemy.y == randX);

                } while(randX == monsterX && randY == monsterY);
                
                // spawn monster
                this.monsters.add(new BasicMonster(this, randX, randY, 'slime_enemy').setOrigin(0.5, 0.5));
                //console.log(randX + ', ' + randY);
                
                // check if done spawning
                if(spawnTimer.getRepeatCount() == num - 1) {
                    this.spawning = false;
                }
            },
            callbackScope: this
        });
    }
    
    chooseSign() {
        if(Math.floor(Math.random() * 2) % 2 == 0) { return 1; }
        else { return -1; }
    }
}

