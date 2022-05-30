class Select extends Phaser.Scene {
    constructor() {
        super('selectscene');
    }

    create() {
        this.nextWave = [];

        this.events.on('create', (scene, data) => {
            // choose monstsers to display for next round
            let chosen = this.scene.manager.getScene('playscene').monstersChosen; 
            let offset = -125;
            for(let i = 0; i < chosen.length; ++i) {
                if(chosen[i] == BasicMonster) {
                    this.add.sprite(game.config.width * 0.5 + offset, game.config.height * 0.15, 'slime_enemy').setOrigin(0.5, 0.5);
                }
                else if(chosen[i] == BruteMonster) {
                    this.add.sprite(game.config.width * 0.5 + offset, game.config.height * 0.15, 'brute_enemy').setOrigin(0.5, 0.5);
                }
                else if(chosen[i] == RangedMonster) {
                    this.add.sprite(game.config.width * 0.5 + offset, game.config.height * 0.15, 'slime_enemy').setOrigin(0.5, 0.5);
                }
                else if(chosen[i] == SentryMonster) {
                    this.add.sprite(game.config.width * 0.5 + offset, game.config.height * 0.15, 'turret_body').setOrigin(0.5, 0.5);
                }
                else if(chosen[i] == HealerMonster) {
                    this.add.sprite(game.config.width * 0.5 + offset, game.config.height * 0.15, 'healer_body').setOrigin(0.5, 0.5);
                }
                else {
                    console.log('how did you even get here???');
                }
                offset += 100
            }
         });

        var abilities = ["Walking", "Shooting", "Dashing", "Stabbing", "Healing"];

        this.ability1 = abilities.splice(Phaser.Math.Between(0, abilities.length-1),1);
        this.ability2 = abilities.splice(Phaser.Math.Between(0, abilities.length-1),1);
        

        this.option1 = this.add.image(300, 150, '').setOrigin(0, 0);
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