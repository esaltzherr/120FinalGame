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
        this.setScale(1.5);
        this.distance = 10;
    }

    update() {
       this.direction();
    }
    
    direction(){
        var offsetXFromPlayer = 0;
        var offsetYFromPlayer = 0;
        
        if(this.player.facing.includes("North")){
            offsetYFromPlayer -= 1;
        }
        else if(this.player.facing.includes("South")){
            offsetYFromPlayer += 1;
        }
        if(this.player.facing.includes("West")){
            offsetXFromPlayer -= 1;
        }
        else if(this.player.facing.includes("East")){
            offsetXFromPlayer += 1;
        }
        this.setX(this.player.x + offsetXFromPlayer * this.distance - 2);
        this.setY(this.player.y + offsetYFromPlayer * this.distance + 15);
    }
    
}