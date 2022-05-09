class Select extends Phaser.Scene {
    constructor() {
        super('selectscene');
    }

    create() {
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyP.on("down", (key, event) => { 
            this.scene.resume('playscene');
            this.scene.stop();
        });
    }
}