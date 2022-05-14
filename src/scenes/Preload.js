class Preload extends Phaser.Scene {
    constructor() {
        super('preloadscene');
    }
    preload(){
        // keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        // keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        // keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        // keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //this.load.image('dude','./assets/tempDude.png');
        console.log("Yes It loaded EryTing");
    }
    create() {
        this.scene.start('menuscene')
    }
}
//export default Preload