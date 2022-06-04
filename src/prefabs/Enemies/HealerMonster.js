class HealerMonster extends TemplateMonster {
    constructor(scene, x, y, texture = 'healer_body') {
        super(scene, x, y, texture, {
            speed: 0,
            health: 150,
            meleeDamage: 5,
            sizeX: 80,
            sizeY: 100,
            offsetX: 0,
            offsetY: 0,
            scale: 1,
            isTower: true
        });
        this.head = scene.add.sprite(this.x, this.y - 40, 'healer_eye').setOrigin(0.5, 0.5);
        this.timer = 0;
        this.healInterval = 60;
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
                   Phaser.Math.Distance.Between(this.x, this.y, children[i].x, children[i].y) < 175) {
                        children[i].heal();
                        this.pulseParticles();                        
                }
            }
        }
        this.timer++;
    }

    pulseParticles() {
        // pulse particles in cirlce
        let particleManager = this.scene.add.particles('heal_particle');
        let dz = new Phaser.Geom.Circle(this.x, this.y, 175);
        let emitter = particleManager.createEmitter({
            x: this.x,
            y: this.y,
            lifespan: { min: 600, max: 800 },
            angle: { start: 0, end: 360, steps: 100 },
            speed: 200,
            quantity: 100,
            scale: { start: 0.5, end: 0.25 },
            frequency: 600,
            deathZone: { source: dz },
            deathCallback: () => { particleManager.destroy(); }
        });
        emitter.deathZone.killOnEnter = false;
    }

    destroy() {
        this.head.destroy();
        super.destroy();
    }
}