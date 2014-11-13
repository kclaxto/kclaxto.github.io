// create a new Phaser game on an 800x600 screen


var main = {
    // load all the images and sounds
    preload: function() {
        game.stage.backgroundColor = '#71c5cf';	
        
        game.load.image('player','diamond.png');
        game.load.image('topaz','topaz.png');
        game.load.image('calcite','calcite.png');
        game.load.image('Corundum','Corundum.png');
        game.load.image('Feldspar','Feldspar.png');
        game.load.image('fluorite','fluorite.png');
        game.load.image('Gypsum','Gypsum.png');
        game.load.image('Quartz','Quartz.png');
        game.load.image('Talc','Talc.png');
        game.load.image('Apatite','Apatite.png');
        
    },

    // set up the game
    create: function() {
        
        
        // create the player using an image and place it at (100, 245)
        this.player = game.add.sprite(0, 5, 'player');
        this.topaz =  game.add.sprite(100, 15, 'topaz');
        this.player = game.add.sprite(180, 15, 'calcite');
        this.player = game.add.sprite(240, 15, 'Corundum');
        this.player = game.add.sprite(350, 15, 'Feldspar');
        this.player = game.add.sprite(450, 15, 'fluorite');
        this.player = game.add.sprite(500, 15, 'Gypsum');
        this.player = game.add.sprite(600, 15, 'Quartz');
        this.player = game.add.sprite(700, 15, 'Talc');
        this.player = game.add.sprite(800, 15, 'Apatite');
        
        this.player.width = 90;
        this.player.height = 90;
        this.topaz.width = 90;
        this.topaz.height = 90;
        this.Corundum.width = 90;
        this.Corundum.height = 90;
        this.Feldspar.width = 90;
        this.Feldspar.height = 90;
        this.Gypsum.width = 90;
        this.Gypsum.height = 90;
        this.quartz.width = 90;
        this.quartz.height = 90;
        this.Talc.width = 90;
        this.Talc.height = 90;
        this.Apatite.width = 10;
        this.Apatite.height = 10;
        
        game.physics.arcade.enable(this.player);
        
        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        space.onDown.add(this.jump, this);
    },
    
    
    // update the state of the game
    update: function() {
        if (this.player.inWorld==false)
            this.restartGame();
        
        if (game.physics.arcade.overlap(this.player,this.topaz)) {

        }
    },
  
    // makes the player jump
    jump: function() {
        
     var emitter = game.add.emitter(game.world.centerX, 200, 200);

    emitter.makeParticles('player');

    //	false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
    //	The 5000 value is the lifespan of each particle
    emitter.start(false, 5000, 20);
   
  this.gem1.body.velocity.x=-700;
        
    },
  
    addPipe: function() {  

    },

    // resest the state of the game
    restartGame: function() {
        game.state.start('default');    
    }
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', main);
game.state.start("default");
