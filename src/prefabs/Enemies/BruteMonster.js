class BruteMonster extends TemplateMonster {
    constructor(scene, x, y, texture = 'brute_enemy') {
        super(scene, x, y, texture, {
            speed: 30,
            health: 200,
            meleeDamage: 40,
            sizeX: 120,
            sizeY: 124,
            offsetX: 0,
            offsetY: 0,
            scale: 0.95,
            isTower: false
        });

        this.anims.create({
            key: 'brute_move',
            frames: 'brute_enemy',
            frameRate: 4,
            repeat: -1
        });
        this.anims.play('brute_move');

        console.log('spawned brute');
    }
}