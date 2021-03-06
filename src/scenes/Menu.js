class Menu extends Phaser.Scene {
    constructor() {
        super('menuscene');
    }

    preload() {
        this.load.image('menu_screen', './assets/backgrounds/menu_screen.png')
        this.load.image('play_button', './assets/buttons/play_button.png');
        this.load.image('how_to_button', './assets/buttons/how_to_button.png');
        this.load.image('menu_button', './assets/buttons/menu_button.png');
        this.load.audio('select_sound', './assets/audio/select_sound.mp3');
    }

    create() {
        this.add.image(0, 0, 'menu_screen').setOrigin(0, 0);

        this.playButton = this.add.sprite(game.config.width * 0.25, game.config.height * 0.7, 'play_button').setOrigin(0, 0);
        this.howToButton = this.add.sprite(game.config.width * 0.75, game.config.height * 0.7, 'how_to_button').setOrigin(1, 0);

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
        this.sound.play('select_sound');
    }
}