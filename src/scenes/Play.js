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
        
        this.input.mouse.disableContextMenu();

        this.add.text(0,0,"Controls: \nWASD\nSpace - Dash\nShift - Heal\nRightMouseButton - Sword\nLeftMouseButton - Shoot",  { font: '"Press Start 2P"' });

        this.monsters = this.physics.add.group();
        this.monsters.runChildUpdate = true;
        this.bullets = this.physics.add.group();

        var r1 = this.add.rectangle(200, 200, 148, 148, 0x6666ff);

        this.player = new Player(this, 0, 0, 'dudeDown');
        
        this.cameras.main.startFollow(this.player);

        var monster = []

        monster.push(new BasicMonster(this, 100, 100, 'monster'));
        monster.push(new BasicMonster(this, 500, 500, 'monster'));
        this.monsters.addMultiple(monster);



        this.physics.add.collider(this.monsters, this.monsters);
        this.physics.add.collider(this.player, this.monsters, this.gotHit);
        this.physics.add.collider(this.monsters, this.bullets, this.destroy);
        this.physics.add.collider(this.player.knife, this.monsters, this.killMonster);

    }

    update() {
       this.player.update();
    }
    destroy(monster, bullet){
        monster.destroy();
        bullet.destroy();
    }
    killMonster(anything, monster){
        monster.destroy();
    }
    gotHit(player, monster){
       
        //player.health -= monster.damage;
        player.knockback(monster);

    }
}