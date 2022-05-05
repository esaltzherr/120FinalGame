class Gun extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, player) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;
        this.player = player;
        // physics settings
        this.setPushable(false);


        this.fireMaxCooldown = 50;
        this.fireCooldown = this.fireMaxCooldown;
        this.depth = 2;
    }

    update() {
       this.direction();
       this.fire();
    }
    
    direction(){
        var facing = '';
        let angle = Phaser.Math.Angle.Between(this.x, this.y, this.scene.input.mousePointer.x, this.scene.input.mousePointer.y);
        angle = angle * (180/Math.PI);
        this.angle = angle;
        //console.log(this.angle);

        if(this.angle >= 0){
            facing += 'South'
        }
        else{
            facing += 'North'
        }
        if(Math.abs(this.angle) >= 90){
            this.flipY = true;
            facing += 'West'
        }
        else{
            this.flipY = false;
            facing += 'East'
        }
        // if(facing != this.facing){
        //     console.log(facing);
        // }
        this.facing = facing; 
    }
    fire(){
        // offsets will probably end up being a object that becomes fixed to the gun/ just is a gun object if we seperate
        if(this.fireCooldown > 0){
            this.fireCooldown -= 1;
        }
        if(this.fireCooldown <= 0){
            
        
            if(this.scene.input.mousePointer.isDown){
                var bullet = new Bullet(this.scene, this.x, this.y, 'bullet');
                bullet.angle = this.scene.player.gun.angle;
                this.scene.bullets.add(bullet);
                this.scene.physics.moveTo(bullet, this.scene.input.mousePointer.x, this.scene.input.mousePointer.y, bullet.speed);
                this.fireCooldown = this.fireMaxCooldown;
            }
        }
    }
    move(){
        this.x = this.player.x;
        this.y = this.player.y;
    }
}