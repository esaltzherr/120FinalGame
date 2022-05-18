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
            this.timer = 0;

            // get all monsters that are spawned
            let children = this.scene.monsters.getChildren();
            for(let i = 0; i < children.length; ++i) {
                // if a given monster is not a healer and is within 150 pixels, heal them
                if(!(children[i] instanceof HealerMonster) && 
                   Phaser.Math.Distance.Between(this.x, this.y, children[i].x, children[i].y) < 150) {
                       children[i].heal();
                }
            }
        }
        this.timer++;
    }

    destroy() {
        this.head.destroy();
        super.destroy();
    }
}