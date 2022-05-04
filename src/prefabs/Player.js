class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;

        // physics settings
        this.setPushable(false);
        this.speed = 100;
        
    }

    update() {
        this.move();
        //console.log(this.x);
        //console.log(this.x);
    }
    move(){
        this.setVelocity(0,0);
        var verticle = 0;
        var horizontal = 0;
        if(keyW.isDown){
            verticle -= 10;
        }
        if(keyS.isDown){
            verticle += 10;
        }
        if(keyA.isDown){
            horizontal -= 10;
        }
        if(keyD.isDown){
            horizontal += 10;
        }
        
        //this.scene.physics.moveTo(this, horizontal, verticle, this.speed);
        //console.log(this.x, verticle);
        if(this.x + horizontal != this.x || this.y  + verticle != this.y){
            this.scene.physics.moveTo(this, horizontal + this.x, verticle + this.y, this.speed);
            
        }
        verticle = 0;
        horizontal = 0;
    }
}