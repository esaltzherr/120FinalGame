class RangedMonster extends TemplateMonster {
    constructor(scene, x, y, texture = 'ranged_enemy') {
        super(scene, x, y, texture, {
            speed: 80,
            health: 100,
            meleeDamage: 10,
            sizeX: 75,
            sizeY: 67,
            offsetX: 10,
            offsetY: 27,
            scale: 0.75,
            isTower: false
        });

        this.timer = 0;
        this.fireInterval = 180;
        this.coolDownInterval = 450;
        this.coolDownTime = 180;
        this.coolingDown = false;
        this.bulletDamage = 10;

        this.anims.create({
            key: 'ranged_move',
            frames: 'ranged_enemy',
            frameRate: 4,
            repeat: -1
        });
        this.anims.play('ranged_move');
    }

    update() {
        let playerX = this.scene.player.x;
        let playerY = this.scene.player.y;

        // move towards player until they are 200 pixels away
        if(Phaser.Math.Distance.Between(this.x, this.y, playerX, this.scene.player.y) > 200) {
            this.scene.physics.accelerateTo(this, playerX, this.scene.player.y, this.speed, this.speed, this.speed);
        }
        else {
            this.setVelocity(0, 0);
        }

        if(playerX < this.x) { this.flipX = true; }
        else { this.flipX = false; }

        if(Phaser.Math.Distance.Between(this.x, this.y, playerX, playerY) < 500) {
            // shoot on designated intervals
            if(this.timer % this.fireInterval == 0 && this.timer != 0 && !this.coolingDown) {
                let bullet = new Bullet(this.scene, this.x, this.y, 'enemy_bullet');
                bullet.rotation = Math.atan2(playerY - this.y, playerX - this.x);
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
}