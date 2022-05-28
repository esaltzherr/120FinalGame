class HUD extends Phaser.Scene {
    constructor() {
        super('hud');
    }

    create() {
        this.playScene = this.scene.manager.getScene('playscene');

        // minimap
        this.minimap = this.playScene.cameras.add(game.config.width * 0.01, game.config.height * 0.01, 175, 100).setZoom(0.1).setName('mini');
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
        //game.config.width * 0.99, game.config.height * 0.01,
        this.waveCounter = this.add.text(game.config.width * 0.99, game.config.height * 0.01,
                                         'Wave: ' + this.playScene.waveNumber, waveConfig).setOrigin(1, 0);


        //this.option1 = this.add.rectangle(450, 100, 148, 296, 0x6666ff).setOrigin(0, 0);

        //game.config.width * 0.01, game.config.height * 0.9,
        this.healthBacking = this.add.rectangle(this.minimap.x, this.minimap.y + this.minimap.height + 1,
                                                this.minimap.width, 25, 0x000000).setOrigin(0, 0);

        this.healthbarWidth = this.healthBacking.width - 5;
        this.healthbarHeight = this.healthBacking.height - 5;                                             
        this.healthBar = this.add.rectangle(this.healthBacking.x + 2.5, this.healthBacking.y + 2.5,
                                            this.healthbarWidth, this.healthbarHeight, 0x00ff44).setOrigin(0, 0);
    }

    update() {
        this.minimap.scrollX = this.playScene.player.x;
        this.minimap.scrollY = this.playScene.player.y;
        this.healthBar.width = this.healthbarWidth * (this.playScene.player.health / this.playScene.player.maxHealth)
    }

    updateWaveCounter(waveNum) {
        console.log('updated wave');
        this.waveCounter.text = 'Wave: ' + waveNum;
    }
}