class HealerMonster extends TemplateMonster {
    constructor(scene, x, y, texture = 'tower_body_temp') {
        super(scene, x, y, texture, {
            speed: 0,
            health: 150,
            meleeDamage: 5,
            sizeX: 80,
            sizeY: 100,
            offsetX: 0,
            offsetY: 0,
            scale: 1
        });
        this.head = scene.add.sprite(this.x, this.y - 40, 'healer_head_temp').setOrigin(0.5, 0.5);
        this.timer = 0;
        this.healInterval = 60;

        console.log('spawned healer');
    }

    update() {
        // have head follow player
        let playerX = this.scene.player.x;
        let playerY = this.scene.player.y;
        this.head.rotation = Math.atan2(playerY - this.y, playerX - this.x);

        // heal on designated intervals
        if(this.timer == this.healInterval) {
            // heal and reset timer
            this.timer = 0;
            
        }
        this.timer++;
    }

    destroy() {
        this.head.destroy();
        super.destroy();
    }
}