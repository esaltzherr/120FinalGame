class HUD extends Phaser.Scene {
    constructor() {
        super('hud');
    }

    create() {
        this.playScene = this.scene.manager.getScene('playscene');

        // minimap
        this.minimap = this.playScene.cameras.add(10, 10, 175, 100).setZoom(0.1).setName('mini');
        this.minimap.setBackgroundColor(0x002244);

        // wave counter
        let waveConfig = {
            fontFamily: "Fantasy",
            fontSize: "40px",
            backgroundColor: "#ebc034",
            color: "#615439",
            align: "left",
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5,
            },
            fixedWidth: 0
        };
        this.waveCounter = this.add.text(game.config.width * 0.8, game.config.height * 0.05, 
                                         'Wave: ' + this.playScene.waveNumber, waveConfig);
    }

    update() {
        this.minimap.scrollX = this.playScene.player.x;
        this.minimap.scrollY = this.playScene.player.y;
    }

    updateWaveCounter(waveNum) {
        console.log('updated');
        this.waveCounter.text = 'Wave: ' + waveNum;
    }
}