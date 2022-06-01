class SentryMonster extends TemplateMonster {
    constructor(scene, x, y, texture = 'turret_body') {
        super(scene, x, y, texture, {
            speed: 0,
            health: 200,
            meleeDamage: 10,
            sizeX: 80,
            sizeY: 100,
            offsetX: 0,
            offsetY: 0,
            scale: 1,
            isTower: true
        });
        this.head = scene.add.sprite(this.x, this.y - 40, 'turret_eye').setOrigin(0.5, 0.5);

        // shooting and cooldown timers
        this.timer = 0;
        this.fireInterval = 120;
        this.coolDownInterval = 480;
        this.coolDownTime = 180;
        this.coolingDown = false;
        this.bulletDamage = 15;
        
        //console.log('spawned sentry');
    }

    update() {
        let playerX = this.scene.player.x;
        let playerY = this.scene.player.y;
        if(Phaser.Math.Distance.Between(this.x, this.y, playerX, playerY) < 500) {
            // have head follow player
            this.head.rotation = Math.atan2(playerY - this.y, playerX - this.x);

            // shoot on designated intervals
            if(this.timer % this.fireInterval == 0 && this.timer != 0 && !this.coolingDown) {
                let bullet = new Bullet(this.scene, this.head.x, this.head.y, 'enemy_bullet');
                bullet.rotation = this.head.rotation;
                bullet.speed = 300;
                bullet.damage = this.bulletDamage;
                this.scene.monsterBullets.add(bullet);
                this.scene.physics.moveTo(bullet, playerX, playerY, bullet.speed);
            }
            
            // start cool down
            if(this.timer % this.coolDownInterval == 0 && this.timer != 0 && !this.coolingDown) {
                this.coolingDown = true;
                this.timer = 0;
            }

            // end cool down
            if(this.timer % this.coolDownTime == 0 && this.timer != 0 && this.coolingDown) {
                this.coolingDown = false;
                this.timer = 0;
            }
            this.timer++;
        }
    }

    destroy() {
        this.head.destroy();
        super.destroy();
    }
}