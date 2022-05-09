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

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.keyboard.addCapture(Phaser.Input.Keyboard.KeyCodes.SHIFT); 
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        
    }
    create() {
        this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
        this.physics.world.setBoundsCollision(true, true, true, true);

        var r3 = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height).setOrigin(0, 0);
        r3.setStrokeStyle(3, 0x1a65ac);

        this.input.mouse.disableContextMenu();
        this.add.text(0,0,"Controls: \nWASD\nSpace - Dash\nShift - Heal\nRightMouseButton - Sword\nLeftMouseButton - Shoot",  { font: '"Press Start 2P"' });

        this.numMonsters = 10;
        this.monsters = this.physics.add.group();
        this.monsters.runChildUpdate = true;
        this.spawnMonsters(this.numMonsters);
        this.spawning = true;

        this.bullets = this.physics.add.group();

        var r1 = this.add.rectangle(200, 200, 148, 148, 0x6666ff);

        this.player = new Player(this, 0, 0, 'dudeDown');
        this.player.body.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player);

        //var monster = []
        //monster.push(new BasicMonster(this, 100, 100, 'monster'));
        //monster.push(new BasicMonster(this, 500, 500, 'monster'));
        //this.monsters.addMultiple(monster);

        this.physics.add.collider(this.monsters, this.monsters);
        this.physics.add.collider(this.player, this.monsters, this.gotHit);
        this.physics.add.collider(this.monsters, this.bullets, this.destroy);
        this.physics.add.collider(this.player.knife, this.monsters, this.killMonster);
    }

    update() {
        this.player.update();

        // at end of round, spawn 5 more monsters than last round
        if(this.monsters.getLength() == 0 && !this.spawning) {
            this.spawning = true;
            this.numMonsters += 5;
            this.spawnMonsters(this.numMonsters);
        }
    }
    destroy(monster, bullet){
        monster.destroy();
        bullet.destroy();
        console.log('dead');
    }
    killMonster(anything, monster){
        monster.destroy();
    }
    gotHit(player, monster){
       
        //player.health -= monster.damage;
        player.knockback(monster);

    }

    spawnMonsters(num) {
        // spawn num times every second
        let spawnTimer = this.time.addEvent({
            delay: 1000,
            repeat: num - 1,
            callback: () => {
                // randomly spawn monser between 200-300 pixels away
                // LATER, WILL NEED TO CHANGE SO THEY DON'T SPAWN OUTSIDE WORLD
                let randX = this.player.x + (Phaser.Math.Between(200, 300) * this.chooseSign());
                let randY = this.player.y + (Phaser.Math.Between(200, 300) * this.chooseSign());                
                this.monsters.add(new BasicMonster(this, randX, randY, 'monster'));
                //console.log(randX + ', ' + randY)
                
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