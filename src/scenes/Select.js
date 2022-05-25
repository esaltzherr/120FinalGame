class Select extends Phaser.Scene {
    constructor() {
        super('selectscene');
    }



    create() {
        this.nextWave;
        //this.events.on('start', (scene, data) => {
        //    this.nextWave = data;
        //});

        var abilities = ["Walking ", "Shooting", "Dashing", "Stabing", "Healing"];

        this.ability1 = abilities.splice(Phaser.Math.Between(0, abilities.length-1),1);
        this.ability2 = abilities.splice(Phaser.Math.Between(0, abilities.length-1),1);

        this.option1 = this.add.rectangle(300, 150, 148, 296, 0x6666ff).setOrigin(0, 0);
        this.add.text(325, 170, 'Upgrade: ' + this.ability1 + "\n\nDisable: " + this.ability2, { font: '"Press Start 2P"' });

        this.option2 = this.add.rectangle(600, 150, 148, 296, 0x6666ff).setOrigin(0, 0);
        this.add.text(625, 170, 'Upgrade: ' + this.ability2 + "\n\nDisable: " + this.ability1, { font: '"Press Start 2P"' });


        // this.object1 = this.add.image(300, 150, 'dudeDown');
        // this.object2 = this.add.image(600, 150, 'dudeUp');

        this.option1.setInteractive();
        this.option2.setInteractive();

        // this.object1.setInteractive();
        // this.object2.setInteractive();
        this.input.on('gameobjectdown', this.onObjectClicked, this);


    }
    onObjectClicked(pointer, gameObject, scene) {
        if(gameObject == this.option1){
            this.selected(this.ability1, this.ability2);
        }
        else if(gameObject == this.option2){
            this.selected(this.ability2, this.ability1);
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