class Menu extends Phaser.Scene {
    constructor() {
        super('menuscene');
    }

    preload() {
        this.load.image('menu_screen', './assets/menu_screen.png')
        this.load.image('play_button_temp', './assets/play_button_temp.png');
        this.load.image('howTo_button_temp', './assets/howTo_button_temp.png');
        this.load.image('menu_button_temp', './assets/menu_button_temp.png');
    }

    create() {
        this.add.image(0, 0, 'menu_screen').setOrigin(0, 0);

        this.playButton = this.add.sprite(game.config.width * 0.25, game.config.height * 0.7, 'play_button_temp').setOrigin(0, 0);
        this.howToButton = this.add.sprite(game.config.width * 0.75, game.config.height * 0.7, 'howTo_button_temp').setOrigin(1, 0);

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