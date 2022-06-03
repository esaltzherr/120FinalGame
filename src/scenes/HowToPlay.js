class HowToPlay extends Phaser.Scene {
    constructor() {
        super('howToPlay')
    }

    preload() {
        this.load.image('how_to_play', './assets/backgrounds/how_to_play.png');
    }

    create() {
        this.add.image(0, 0, 'how_to_play').setOrigin(0, 0);

        // back to menu button
        this.menuButton = this.add.sprite(game.config.width * 0.5, game.config.height * 0.9, 'menu_button').setOrigin(0.5, 0.5);
        this.menuButton.setInteractive();
        this.input.on('gameobjectdown', this.onObjectClicked, this);
    }

    onObjectClicked(pointer, gameObject, scene) {
        if(gameObject == this.menuButton) {
            this.scene.start('menuscene')
        }
        else {
            console.log('error')
        }
    }
}