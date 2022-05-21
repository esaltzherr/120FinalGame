class BruteMonster extends TemplateMonster {
    constructor(scene, x, y, texture = 'slime_enemy') {
        super(scene, x, y, texture, {
            speed: 30,
            health: 200,
            meleeDamage: 40,
            sizeX: 75,
            sizeY: 67,
            offsetX: 10,
            offsetY: 27,
            scale: 1.25
        });

        this.anims.create({
            key: 'slime_move',
            frames: 'slime_enemy',
            frameRate: 4,
            repeat: -1
        });
        this.anims.play('slime_move');

        console.log('spawned brute');
    }
}