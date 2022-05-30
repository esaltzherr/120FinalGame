class Menu extends Phaser.Scene {
    constructor() {
        super('menuscene');
    }

    preload() {
        this.load.image('play_button_temp', './assets/play_button_temp.png');
        this.load.image('howTo_button_temp', './assets/howTo_button_temp.png');
        this.load.image('menu_button_temp', './assets/menu_button_temp.png');
    }

    create() {
        // TEMP MENU
        let menuConfig = {
            fontFamily: "Fantasy",
            fontSize: "40px",
            backgroundColor: "#ebc034",
            color: "#615439",
            align: "center",
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5,
            },
            fixedWidth: 0
        };
        this.add.text(game.config.width * 0.5, game.config.height * 0.2, 'Where\'s My Gun?', menuConfig).setOrigin(0.5, 0.5);
        //this.add.text(game.config.width * 0.5, game.config.height * 0.5, 'Start: Enter\n\nMovement: WASD\nShoot: Left Click\nMelee: Right click\nDash: Space\nHeal: L Shift', {fontSize: 28, align: 'center'}).setOrigin(0.5, 0.5);
        //this.add.text(game.config.width * 0.5, game.config.height * 0.75, 'Kill all the monsters and \ncomplete as many waves as possible', {fontSize: 28, align: 'center'}).setOrigin(0.5, 0.5);

        //keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // keyENTER.on("down", (key, event) => { 
        //     this.scene.start('playscene')
        // });

        this.playButton = this.add.sprite(game.config.width * 0.5, game.config.height * 0.4, 'play_button_temp').setOrigin(0.5, 0.5);
        this.howToButton = this.add.sprite(game.config.width * 0.5, game.config.height * 0.65, 'howTo_button_temp').setOrigin(0.5, 0.5);

        this.playButton.setInteractive();
        this.howToButton.setInteractive();
        this.input.on('gameobjectdown', this.onObjectClicked, this);
    }

    onObjectClicked(pointer, gameObject, scene) {
        if(gameObject == this.playButton) {
            this.scene.start('playscene')
        }
        else if(gameObject == this.howToButton) {
            this.scene.start('howToPlay')
        }
        else {
            console.log('error')
        }
    }
}