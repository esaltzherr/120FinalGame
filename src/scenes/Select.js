class Select extends Phaser.Scene {
    constructor() {
        super('selectscene');
    }
    preload() {
        this.load.image('dudeDown', './assets/DudeFaceDown.png');

    }
    create() {
        var abilities = ["Movement", "Shooting", "Dashing", "Stabing", "Healing"];
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyP.on("down", (key, event) => {
            this.scene.resume('playscene', "JEFF");
            this.scene.stop();
        });
        var r1 = this.add.rectangle(300, 150, 148, 296, 0x6666ff).setOrigin(0, 0);
        var r2 = this.add.rectangle(600, 150, 148, 296, 0x6666ff).setOrigin(0, 0);

        this.object1 = this.add.image(100, 100, 'dudeDown');
        this.object1.setInteractive();

        this.input.on('gameobjectdown', this.onObjectClicked);


    }
    onObjectClicked(pointer, gameObject) {
        console.log("DHSJADHJKASHBJK");
    }
}