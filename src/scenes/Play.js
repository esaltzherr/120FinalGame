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
    }
    create() {
        this.monsters = this.physics.add.group();
        this.monsters.runChildUpdate = true;
        this.bullets = this.physics.add.group();

        this.player = new Player(this, 450, 250, 'dudeDown');


        var monster = []

       // monster.push(new BasicMonster(this, 100, 100, 'monster'));
        //monster.push(new BasicMonster(this, 500, 500, 'monster'));
        this.monsters.addMultiple(monster);



        this.physics.add.collider(this.monsters, this.monsters);
        this.physics.add.collider(this.monsters, this.bullets, this.destroy);

    }

    update() {
       this.player.update();
    }
    destroy(monster, bullet){
        monster.destroy();
        bullet.destroy();
    }
}