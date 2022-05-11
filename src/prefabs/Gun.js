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
        this.angle = 0;
    }

    update() {
       this.direction();
       this.fire();
       if(this.x != this.player.x){
           this.x = this.player.x;
       }
       if(this.y != this.player.y){
        this.y = this.player.y;
    }
    }
    
    direction(){
        var facing = '';


        this.getMouseCoords();
        // spawn player at 0,0 so the mouse can be tracked from an offset of 0,0 because that doesnt track canvas
        let angle = Phaser.Math.Angle.Between(this.x, this.y, this.scene.input.activePointer.worldX, this.scene.input.activePointer.worldY);
        angle = angle * (180/Math.PI);
        this.angle = angle;

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
        if(this.fireCooldown <= 0 && !this.player.tempDisableMove && this.player.canShoot){
            
        
            if(this.scene.input.activePointer.leftButtonDown()){
                var bullet = new Bullet(this.scene, this.x, this.y, 'bullet');
                bullet.angle = this.angle;
                this.scene.bullets.add(bullet);
                this.scene.physics.moveTo(bullet, this.scene.input.mousePointer.worldX, this.scene.input.mousePointer.worldY, bullet.speed);
                this.fireCooldown = this.fireMaxCooldown;
            }
        }
    }
    getMouseCoords() {
        // Takes a Camera and updates this Pointer's worldX and worldY values so they are the result of a translation through the given Camera.
        this.scene.input.activePointer.updateWorldPoint(this.scene.cameras.main);
        const pointer = this.scene.input.activePointer
        return {
          mouseX: pointer.worldX,
          mouseY: pointer.worldY,
        }
      }
}