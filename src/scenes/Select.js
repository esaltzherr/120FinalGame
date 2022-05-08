class Select extends Phaser.Scene {
    constructor() {
        super('selectscened');
    }

    create() {
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyENTER.on("down", (key, event) => { 
            this.scene.start('playscene')
        });
    }
}