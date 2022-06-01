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
        this.waveCounter = this.add.text(game.config.width * 0.99, game.config.height * 0.01,
                                         'Wave: ' + this.playScene.waveNumber, waveConfig).setOrigin(1, 0);

        // Health Bar
        this.healthBacking = this.add.rectangle(this.minimap.x, this.minimap.y + this.minimap.height + 1,
                                                this.minimap.width, 25, 0x000000).setOrigin(0, 0);
        this.healthBarWidth = this.healthBacking.width - 5;
        this.healthBarHeight = this.healthBacking.height - 5;                                             
        this.healthBar = this.add.rectangle(this.healthBacking.x + 2.5, this.healthBacking.y + 2.5,
                                            this.healthBarWidth, this.healthBarHeight, 0x00ff44).setOrigin(0, 0);

        // Stamina Bar
        this.staminaBacking = this.add.rectangle(this.healthBacking.x, this.healthBacking.y + this.healthBacking.height + 1,
                                                 this.minimap.width, 10, 0x08003d).setOrigin(0, 0);
        this.staminaBarWidth = this.staminaBacking.width - 5;
        this.staminaBarHeight = this.staminaBacking.height - 5;
        this.staminaBar = this.add.rectangle(this.staminaBacking.x + 2.5, this.staminaBacking.y + 2.5,
                                             this.staminaBarWidth, this.staminaBarHeight, 0xe6a102).setOrigin(0, 0);
    }

    update() {
        this.minimap.scrollX = this.playScene.player.x;
        this.minimap.scrollY = this.playScene.player.y;
        this.healthBar.width = this.healthBarWidth * (this.playScene.player.health / this.playScene.player.maxHealth);
        
        if(this.playScene.player.dashCoolDown > 0) {
            this.staminaBar.width = this.staminaBarWidth *  ((this.playScene.player.maxDashCooldown - this.playScene.player.dashCoolDown) / this.playScene.player.maxDashCooldown);
        }
        else {
            this.staminaBar.width = this.staminaBarWidth;
        }
    }

    updateWaveCounter(waveNum) {
        this.waveCounter.text = 'Wave: ' + waveNum;
    }
}