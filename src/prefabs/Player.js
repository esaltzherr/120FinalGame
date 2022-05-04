class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scene = scene;

        // physics settings
        this.setPushable(false);
        this.speed = 100;
        this.body.collideWorldBounds = true;

        this.setSize(this.width/2,this.height/2);
        this.setOffset(this.width/5,this.height/2);

        this.fireMaxCooldown = 50;
        this.fireCooldown = this.fireMaxCooldown;


        // Facing for animations and dashing
        this.facing = 'South';
    }

    update() {
        this.move();
        this.fire();
        
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
        
      
        if(this.x + horizontal != this.x || this.y  + verticle != this.y){
            this.scene.physics.moveTo(this, horizontal + this.x, verticle + this.y, this.speed);
            this.updateFacing(horizontal, verticle);
        }
        // else you are not moving so set to standing animations
        else{
            standingAnimations();
        }
        verticle = 0;
        horizontal = 0;
    }
    fire(){
        // offsets will probably end up being a object that becomes fixed to the gun/ just is a gun object if we seperate
        if(this.fireCooldown > 0){
            this.fireCooldown -= 1;
        }
        if(this.fireCooldown <= 0){
            
        
            var xOffset = 0;
            var yOffset = 0;

            
            
            if(this.scene.input.mousePointer.isDown){
                let angle = Phaser.Math.Angle.Between(this.x, this.y, this.scene.input.mousePointer.x, this.scene.input.mousePointer.y);
                angle = angle * (180/Math.PI);
                var bullet = new Bullet(this.scene, this.x + xOffset, this.y + yOffset, 'bullet');
                bullet.angle = angle;
                this.scene.bullets.add(bullet);
                this.scene.physics.moveTo(bullet, this.scene.input.mousePointer.x, this.scene.input.mousePointer.y, bullet.speed);
                this.fireCooldown = this.fireMaxCooldown;
            }
        }
    }
    updateFacing(horizontal, verticle){
        var facing = '';
        if(verticle > 0){
            facing += 'South';
        }
        else if(verticle < 0){
            facing += 'North';
        }
        if(horizontal > 0){
            facing += 'East';
        }
        else if(horizontal < 0){
            facing += 'West';
        }
        this.facing = facing;
        // update animation based on this
        
        // These are all walking animations because this is called only while moving
        // Same Animations for each direction but flipped to match direction
        if(this.facing.includes('East')){
            this.flipX = true;
        }
        else if(this.facing.includes('West')){
            this.flipX = false
        }

        // < 6 to check if its only a single direction
        if(this.facing.length < 6){
            if(this.facing == 'North'){
                // set to Up animation
            }
            else if(this.facing == 'South'){
                // set to Down animation
            }
        }
        else if(this.facing.length > 6){
            if(this.facing.includes('North')){
                // set to Angled Up animation
            }
            else if(this.facing.includes('South')){
                // set to Angled Down animation
            }
        }
    }
    standingAnimations(){
        
        // These are all standing animations because this is called only while not moving
        // Same Animations for each direction but flipped to match direction
        if(this.facing.includes('East')){
            this.flipX = true;
        }
        else if(this.facing.includes('West')){
            this.flipX = false
        }

        // < 6 to check if its only a single direction
        if(this.facing.length < 6){
            if(this.facing == 'North'){
                // set to Up animation
            }
            else if(this.facing == 'South'){
                // set to Down animation
            }
        }
        else if(this.facing.length > 6){
            if(this.facing.includes('North')){
                // set to Angled Up animation
            }
            else if(this.facing.includes('South')){
                // set to Angled Down animation
            }
        }
    }
}