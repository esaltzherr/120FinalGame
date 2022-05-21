class Select extends Phaser.Scene {
    constructor() {
        super('selectscene');
    }

    create() {
        var abilities = ["Movement", "Shooting", "Dashing", "Stabing", "Healing"];

        var option1 = abilities.splice(Phaser.Math.Between(0, abilities.length-1),1);
        var option2 = abilities.splice(Phaser.Math.Between(0, abilities.length-1),1);



        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyP.on("down", (key, event) => {
            this.scene.resume('playscene', "JEFF");
            this.scene.stop();
        });
        var r1 = this.add.rectangle(300, 150, 148, 296, 0x6666ff).setOrigin(0, 0);
        var r2 = this.add.rectangle(600, 150, 148, 296, 0x6666ff).setOrigin(0, 0);

        this.object1 = this.add.image(300, 150, 'dudeDown');
        this.object2 = this.add.image(600, 150, 'dudeUp');

        r1.setInteractive();
        r2.setInteractive();

        this.object1.setInteractive();
        this.object2.setInteractive();

        this.input.on('gameobjectdown', this.onObjectClicked, this);


    }
    onObjectClicked(pointer, gameObject, scene) {

        console.log(gameObject);
        console.log(scene);
        if(gameObject == this.object1){
            this.scene.selected(option1, option2);
        }
        else if(gameObject == this.object2){
            this.scene.selected(option2, option1);
        }
        else{
            console.log("ERROR");
        }
    }
    selected(upgrade, disable){
        this.scene.resume('playscene', {upgrade, disable});
        this.scene.stop();
    }
}