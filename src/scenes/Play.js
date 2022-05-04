class Play extends Phaser.Scene {
    constructor() {
        super("playscene");
    }
    
    preload(){
        this.load.image('player','./assets/tempDude.png');
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }
    create() {
        var r1 = this.add.rectangle(200, 200, 148, 148, 0x6666ff);
        this.player = new Player(this, 10, 10, 'player');
        console.log(this.player);
    }

    update() {
       this.player.update();
    }

}