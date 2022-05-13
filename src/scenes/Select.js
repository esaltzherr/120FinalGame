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
        var r1 = this.add.rectangle(300, 150, 148, 296, 0x6666ff).setOrigin(0,0);
        var r2 = this.add.rectangle(600, 150, 148, 296, 0x6666ff).setOrigin(0,0);


    }
}