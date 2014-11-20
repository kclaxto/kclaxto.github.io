// create a new Phaser game on an 800x600 screen


var main = {
    // load all the images and sounds
    preload: function() {
        game.stage.backgroundColor = '#00c5cf';	
        
        game.load.image('player','diamond.png');
        game.load.image('topaz','topaz.png');
        game.load.image('calcite','calcite.png');
        game.load.image('corundum','corundum.png');
        game.load.image('feldspar','feldspar.png');
        game.load.image('fluorite','fluorite.png');
        game.load.image('quartz','quartz.png');
        game.load.image('talc','talc.png');
        game.load.image('apatite','apatite.png');
        game.load.image('gypsum','gypsum.png');
        
        
        //game.load.image('explosion','explosion-sprite.png');
        game.load.spritesheet('explosion', 'explosion-sprite.png', 128, 128, 30);
         
    },

    // set up the game
    create: function() {
        
        // create the player using an image and place it at (100, 245)
        this.player = game.add.sprite(0, 5, 'player');
        this.topaz =  game.add.sprite(80, 80, 'topaz');
        this.calcite = game.add.sprite(300, 130, 'calcite');
        this.corundum =  game.add.sprite(-5, 140, 'corundum');
        this.feldspar = game.add.sprite(700, 130, 'feldspar');
        this.fluorite =  game.add.sprite(900, 170, 'fluorite');
        this.gypsum = game.add.sprite(500, 130, 'gypsum');
        this.quartz =  game.add.sprite(1000, 170, 'quartz');
        this.talc = game.add.sprite(500, 240, 'talc');
        this.apatite = game.add.sprite(800, 280, 'apatite');
        
        
        this.explosion =  game.add.sprite(-200, -100, 'explosion');
        
        game.physics.arcade.enable(this.player);
        game.physics.arcade.enable(this.topaz);
        game.physics.arcade.enable(this.calcite);
        game.physics.arcade.enable(this.corundum);

        this.explosion.animations.add('explode');
        this.explosion.animations.play('explode', 6, true);
        
        /*this.player.width = 90;
        this.player.height = 90;
        this.topaz.width = 90;
        this.topaz.height = 90;*/
        
        this.player.body.setSize(90,90, 0, 0);
        this.topaz.body.setSize(90,90, 0, 0);
        
        this.gem1 = this.player;
        this.gem2 = this.topaz;
        this.move2gems();
        
        //game.input.onDown.add(this.move, this);
        
        //var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        //space.onDown.add(this.animate2gems, this);
        this.gem1.inputEnabled = true;
        this.gem1.events.onInputDown.add(this.animate2gems, this);
        this.gem2.inputEnabled = true;
        this.gem2.events.onInputDown.add(this.animate2gems, this);
        
        

    },
    
    move2gems: function() {
        this.gem1.x=200
        this.gem2.x=600
        this.gem1.y=200
        this.gem2.y=200
    },
    
    animate2gems: function() {
        this.gem1.body.velocity.x=150; 
        this.gem2.body.velocity.x=-150;
        this.gem1.body.velocity.y=150; 
        this.gem2.body.velocity.y=150;
    },
    
    // update the state of the game
    update: function() {
        if (this.player.inWorld==false)
            this.restartGame();
        
        if (game.physics.arcade.overlap(this.gem1,this.gem2)) {
           
            
            //this.gem1.body.velocity.x=0;
            //this.gem1.body.velocity.y=0; 
            this.gem2.body.velocity.x=0;
            this.gem2.body.velocity.y=0;
            this.gem2.x=-200
            this.gem2.y=-200
                
            //This is where our gems are colliding
            
            this.explosion.x=this.gem1.x
            this.explosion.y=this.gem1.y

            setTimeout(function(){

                this.explosion.x=-200
                this.explosion.y=-100
                
   alert("Ha Ha! I am a diamond and I am the Hardest gem on Mohs' Hardness Scale!");
               
            }.bind(this), 1000);
        }
    },
    
    // makes the player jump
    jump: function() {
        
     var emitter = game.add.emitter(game.world.centerX, 200, 200);

    emitter.makeParticles('player');

    //	false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
    //	The 5000 value is the lifespan of each particle
    emitter.start(false, 5000, 20);
   
        
    },
  
    // resest the state of the game
    restartGame: function() {
        game.state.start('default');    
    }
};

var game = new Phaser.Game(1100, 600, Phaser.AUTO, '', main);
game.state.start("default");
