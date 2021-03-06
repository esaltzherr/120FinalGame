class GameOver extends Phaser.Scene {
    constructor() {
        super('gameover');
    }

    preload() {
        this.load.image('game_over_screen', './assets/backgrounds/game_over_screen.png');
        this.load.image('retry_button', './assets/buttons/retry_button.png');
        this.load.image('menu_button', './assets/buttons/menu_button.png');
        this.load.audio('select_sound', './assets/audio/select_sound.mp3');
    }

    create() {
        this.add.sprite(0, 0, 'game_over_screen').setOrigin(0, 0);

        // buttons for restart and menu
        this.restartButton = this.add.sprite(game.config.width * 0.56, game.config.height * 0.65, 'retry_button').setOrigin(0, 0);
        this.menuButton = this.add.sprite(game.config.width * 0.75, game.config.height * 0.65, 'menu_button').setOrigin(0, 0);

        // make buttons clickable
        this.restartButton.setInteractive();
        this.menuButton.setInteractive();
        this.input.on('gameobjectdown', this.onObjectClicked, this);
    }

    onObjectClicked(pointer, gameObject, scene) {
        if(gameObject == this.restartButton) {
            this.scene.start('playscene')
        }
        else if(gameObject == this.menuButton) {
            this.scene.start('menuscene')
        }
        else {
            console.log('error')
        }
        this.sound.play('select_sound');
    }
}