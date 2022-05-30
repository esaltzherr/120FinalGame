let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    backgroundColor: '#4488aa',
    physics: {
      default: "arcade",
      arcade: {
        debug: false
      }
    },
    scene: [ Preload, Menu, Play, Select, HUD ]
  }
  
  let game = new Phaser.Game(config);
  
  // reserve keyboard vars
  let keyW, keyA, keyS, keyD, keyENTER, keySPACE, keySHIFT, keyO, keyP, keyL;