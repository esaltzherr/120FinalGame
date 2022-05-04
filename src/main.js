let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    physics: {
      default: "arcade",
      arcade: {
        debug: true
      }
    },
    scene: [ Preload, Menu, Play ]
  }
  
  let game = new Phaser.Game(config);
  
  // reserve keyboard vars
  let keyW, keyA, keyS, keyD, keyENTER, keySPACE;