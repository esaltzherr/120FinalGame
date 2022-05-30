class Knife extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, player) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;
        this.player = player;
        this.body.enable = false;
        this.visible = false;
        // physics settings

        
        this.setPushable(false);
        this.distance = 10;
        this.setScale(.9);
        this.setSize(100,100);
        this.depth = 5;
        this.damage = 1

        this.distanceFromPlayer = 30;

        this.anims.create({
            key: 'stab',
            frames: 'player_knife',
            hideOnComplete: true,
            frameRate: 10,
        });
    }

    update() {
       //this.direction();
    }
    
    direction(){

        // var offsetXFromPlayer = 0;
        // var offsetYFromPlayer = 0;
        
        // if(this.player.facing.includes("North")){
        //     offsetYFromPlayer -= 1;
        // }
        // else if(this.player.facing.includes("South")){
        //     offsetYFromPlayer += 1;
        // }
        // if(this.player.facing.includes("West")){
        //     offsetXFromPlayer -= 1;
        // }
        // else if(this.player.facing.includes("East")){
        //     offsetXFromPlayer += 1;
        // }
        // this.setX(this.player.x + offsetXFromPlayer * this.distance - 2);
        // this.setY(this.player.y + offsetYFromPlayer * this.distance + 15);

        //var angle = this.player.gun.angle;
        //console.log(angle);

       // angle = Phaser.Math.DegToRad(angle);

        //Phaser.Math.RotateTo(this, this.player.x, this.player.y, angle, this.distanceFromPlayer);

        


       
        


    }



    
}