class Select extends Phaser.Scene {
    constructor() {
        super('selectscene');
    }

    preload() {
        // card sprites
        this.load.image('Walking', './assets/cards/running_card.png');
        this.load.image('Shooting', './assets/cards/shooting_card.png');
        this.load.image('Dashing', './assets/cards/dashing_card.png');
        this.load.image('Stabbing', './assets/cards/melee_card.png');
        this.load.image('Healing', './assets/cards/healing_card.png');
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
                    this.add.sprite(game.config.width * 0.5 + offset, game.config.height * 0.15, 'ranged_enemy').setOrigin(0.5, 0.5);
                }
                else if(chosen[i] == SentryMonster) {
                    let sentryBody = this.add.sprite(game.config.width * 0.5 + offset, game.config.height * 0.15, 'turret_body').setOrigin(0.5, 0.5);
                    scene.add.sprite(sentryBody.x, sentryBody.y - 40, 'turret_eye').setOrigin(0.5, 0.5);
                }
                else if(chosen[i] == HealerMonster) {
                    let healerBody = this.add.sprite(game.config.width * 0.5 + offset, game.config.height * 0.15, 'healer_body').setOrigin(0.5, 0.5);
                    scene.add.sprite(healerBody.x, healerBody.y - 40, 'healer_eye').setOrigin(0.5, 0.5);
                }
                else {
                    console.log('how did you even get here???');
                }
                offset += 100
            }
         });

         // select two random abilities
        var abilities = ["Walking", "Shooting", "Dashing", "Stabbing", "Healing"];
        this.ability1 = abilities.splice(Phaser.Math.Between(0, abilities.length-1),1);
        this.ability2 = abilities.splice(Phaser.Math.Between(0, abilities.length-1),1);

        // display abilities as buttons
        this.option1 = this.add.sprite(300, 150, this.ability1).setOrigin(0, 0);
        this.option2 = this.add.sprite(600, 150, this.ability2).setOrigin(0, 0);
        
        // make buttons interactive
        this.option1.setInteractive();
        this.option2.setInteractive();
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