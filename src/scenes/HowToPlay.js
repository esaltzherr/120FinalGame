class HowToPlay extends Phaser.Scene {
    constructor() {
        super('howToPlay')
    }

    create() {
        // controls/how to play game
        this.add.text(game.config.width * 0.5, game.config.height * 0.25, 'Movement: WASD\nShoot: Left Click\nMelee: Right click\nDash: Space\nHeal: L Shift', {fontSize: 28, align: 'center'}).setOrigin(0.5, 0.5);
        this.add.text(game.config.width * 0.5, game.config.height * 0.5, 'Kill all the monsters and \ncomplete as many waves as possible.', {fontSize: 28, align: 'center'}).setOrigin(0.5, 0.5);
        this.add.text(game.config.width * 0.5, game.config.height * 0.7, 'After every round, you will be given a choice between\ntwo abilities. The ability you choose will be upgraded\nand the other will be disabled for that next round.', {fontSize: 28, align: 'center'}).setOrigin(0.5, 0.5);

        // back to menu button
        this.menuButton = this.add.sprite(game.config.width * 0.5, game.config.height * 0.9, 'menu_button_temp').setOrigin(0.5, 0.5);
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