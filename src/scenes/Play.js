class Play extends Phaser.Scene {
    constructor() {
        super("playscene");
    }
    
    preload(){
        this.load.image('player','./assets/tempDude.png');
        this.load.image('bullet','./assets/bullet.png');
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    create() {
        var r1 = this.add.rectangle(0, 0, 5000, 2000, 0x6666ff);
        this.player = new Player(this, 450, 250, 'player');
    }

    update() {
       this.player.update();
    }

}