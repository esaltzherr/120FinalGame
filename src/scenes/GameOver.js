class GameOver extends Phaser.Scene {
    constructor() {
        super('gameover');
    }

    preload() {
        this.load.image('restart_button_temp', './assets/restart_button_temp.png');
        this.load.image('menu_button_temp', './assets/menu_button_temp.png');
    }

    create() {
        let playScene = this.scene.manager.getScene('playscene');
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

        let waveNum = playScene.waveNumber;
        let waveText = ' Waves';
        if(waveNum == 1) { waveText = ' Wave'; }

        // TEMP GAME OVER TEXT
        this.add.text(game.config.width * 0.5, game.config.height * 0.25, 'Game Over', menuConfig).setOrigin(0.5, 0.5);
        this.add.text(game.config.width * 0.5, game.config.height * 0.4, 'You Lasted ' + waveNum + waveText, menuConfig).setOrigin(0.5, 0.5);

        // buttons for restart and menu
        this.restartButton = this.add.sprite(game.config.width * 0.25, game.config.height * 0.6, 'restart_button_temp').setOrigin(0, 0);
        this.menuButton = this.add.sprite(game.config.width * 0.75, game.config.height * 0.6, 'menu_button_temp').setOrigin(1, 0);

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
    }
}