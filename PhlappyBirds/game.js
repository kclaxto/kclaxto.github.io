// create a new Phaser game on an 800x600 screen


var main = {
    // load all the images and sounds
    preload: function() {
        game.stage.backgroundColor = '#71c5cf';	
        
        game.load.image('diamond','diamond.png');
        game.load.image('topaz','topaz.png');
        game.load.image('calcite','calcite.png');
        game.load.image('corundum','corundum.png');
        game.load.image('feldspar','feldspar.png');
        game.load.image('fluorite','fluorite.png');
        game.load.image('quartz','quartz.png');
        game.load.image('talc','talc.png');
        game.load.image('Apatite','Apatite.png');
        game.load.image('gypsum','gypsum.png');
        
        
        //game.load.image('explosion','explosion-sprite.png');
        game.load.spritesheet('explosion', 'explosion-sprite.png', 128, 128, 30);
         
    },

    // set up the game
    create: function() {
        
        // create the player using an image and place it at (100, 245)
        this.diamond = game.add.sprite(50, 5, 'diamond');
        this.diamond.hardness = 10
        this.topaz =  game.add.sprite(600, 60, 'topaz');
        this.topaz.hardness = 8
        this.calcite = game.add.sprite(300, 10, 'calcite');
        this.calcite.hardness = 3
        this.corundum =  game.add.sprite(160, 20, 'corundum');
        this.corundum.hardness = 9
        this.feldspar = game.add.sprite(700, 10, 'feldspar');
        this.feldspar.hardness = 6
        this.fluorite =  game.add.sprite(900, 50, 'fluorite');
        this.fluorite.hardness = 4
        this.gypsum = game.add.sprite(500, 10, 'gypsum');
        this.gypsum.hardness = 2
        this.quartz =  game.add.sprite(1000, 50, 'quartz');
        this.quartz.hardness = 7
        this.talc = game.add.sprite(500, 120, 'talc');
        this.talc.hardness = 1
        this.Apatite = game.add.sprite(800, 160, 'apatite');
        this.Apatite.hardness = 5
        
        this.explosion =  game.add.sprite(-200, -100, 'explosion');
        
        game.physics.arcade.enable(this.diamond);
        game.physics.arcade.enable(this.topaz);
        game.physics.arcade.enable(this.calcite);
        game.physics.arcade.enable(this.corundum);
        game.physics.arcade.enable(this.feldspar);
        game.physics.arcade.enable(this.fluorite);
        game.physics.arcade.enable(this.gypsum);
        game.physics.arcade.enable(this.quartz);
        game.physics.arcade.enable(this.talc);
        game.physics.arcade.enable(this.Apatite);
                

        this.diamond.inputEnabled = true;
        this.diamond.events.onInputDown.add(this.selectgem, this);
        this.topaz.inputEnabled = true;
        this.topaz.events.onInputDown.add(this.selectgem, this);
        this.calcite.inputEnabled= true;
        this.calcite.events.onInputDown.add(this.selectgem, this);
        this.corundum.inputEnabled = true;
        this.corundum.events.onInputDown.add(this.selectgem, this);
        this.feldspar.inputEnabled = true;
        this.feldspar.events.onInputDown.add(this.selectgem, this);
        this.fluorite.inputEnabled = true;
        this.fluorite.events.onInputDown.add(this.selectgem, this);
        this.gypsum.inputEnabled = true;
        this.gypsum.events.onInputDown.add(this.selectgem, this);
        this.quartz.inputEnabled = true;
        this.quartz.events.onInputDown.add(this.selectgem, this);
        this.talc.inputEnabled = true;
        this.talc.events.onInputDown.add(this.selectgem, this);
        this.Apatite.inputEnabled = true;
        this.Apatite.events.onInputDown.add(this.selectgem, this);
        

        this.explosion.animations.add('explode');
        this.explosion.animations.play('explode', 6, true);
        
        /*this.player.width = 90;
        this.player.height = 90;
        this.topaz.width = 90;
        this.topaz.height = 90;
        
        this.diamond.body.setSize(90,90, 0, 0);
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
        */
        

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
    
    
    selectgem: function(clicked) {
        if (!this.gem1)
        {
            this.gem1= clicked
        } else if(!this.gem2) {
            this.gem2=clicked    
            this.move2gems()
        } else {
            this.animate2gems()
        }
    },
    
    // update the state of the game
    update: function() {
        if (this.gem1 && this.gem2) {    
            if (game.physics.arcade.overlap(this.gem1,this.gem2)) {
                //this.gem1.body.velocity.x=0;
                //this.gem1.body.velocity.y=0; 

                //This is where our gems are colliding
                var winner, loser;
                if ( this.gem1.hardness > this.gem2.hardness) {
                    winner = this.gem1;
                    loser = this.gem2;
                } else {
                    winner = this.gem2;
                    loser = this.gem1;
                }

                this.explosion.x=winner.x
                this.explosion.y=winner.y
                loser.body.velocity.x=0;
                loser.body.velocity.y=0;
                loser.x=-200
                loser.y=-200

                setTimeout(function(){

                    this.explosion.x=-200
                    this.explosion.y=-100

                    alert("Aha! "+winner.key+" is Harder with a number of "+winner.hardness+" on the Mohs' Hardness scale");
                    
                    this.restartGame()

                }.bind(this), 1000);
            }
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
        this.gem1 = null;
        this.gem2 = null;
        game.state.start('default');    
    }
};

var game = new Phaser.Game(1100, 600, Phaser.AUTO, '', main);
game.state.start("default");
