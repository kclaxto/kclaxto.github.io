// create a new Phaser game on an 800x600 screen


var main = {
    // load all the images and sounds
    preload: function() {
        game.stage.backgroundColor = '#71c5cf';	
        
        game.load.image('player','diamond.png');
        game.load.image('gem1','topaz.png');
    },

    // set up the game
    create: function() {
        
        game.physics.startSystem(Phaser.Physics.ARCARDE);
        
        // create the player using an image and place it at (100, 245)
        this.player = game.add.sprite(300, 160, 'player');
        this.gem1 = game.add.sprite(300, 300, 'gem1');
        
        
        
game.physics.arcade.enable(this.player);
        
game.physics.arcade.enable(this.gem1);
    
this.player.body.gravity.y=1000;
        
        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        space.onDown.add(this.jump, this);
    },
    
    
    // update the state of the game
    update: function() {
        if (this.player.inWorld==false)
            this.restartGame();
        
        if (game.physics.arcade.overlap(this.player,this.gem1)) {
          this.gem1.body.velocity.y=700;  
        }
    },
  
    // makes the player jump
    jump: function() {
  this.player.body.velocity.y=-500;
        
  this.gem1.body.velocity.y=-700;
        
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
