// create a new Phaser game on an 800x600 screen


var main = {
    // load all the images and sounds
    preload: function() {
        //game.stage.backgroundColor = '#71c5cf';	
        //game.stage.backgroundColor = '#000000';	
        
        game.load.image('diamond','diamond.png');
        game.load.image('topaz','topaz.png');
        game.load.image('calcite','calcite.png');
        game.load.image('Corundum','Corundum.png');
        game.load.image('Feldspar','Feldspar.png');
        game.load.image('fluorite','fluorite.png');
        game.load.image('Quartz','Quartz.png');
        game.load.image('Talc','Talc.png');
        game.load.image('Apatite','Apatite.png');
        game.load.image('Gypsum','Gypsum.png');
        game.load.image('background', 'Starrybackground.gif');
        
        
        
        game.load.audio('explosionsound','GrenadeExplosion.wav');
        
        game.load.audio('clickrocksound','CaveRocks.wav');
        
        game.load.audio('diamonddropsound','coins-drop-1.wav');
        
        

        
        //game.load.image('explosion','explosion-sprite.png');
        game.load.spritesheet('explosion', 'explosion-sprite.png', 128, 128, 30);
         
    },
    

    // set up the game
    create: function() {
            
        
        //game.add.tileSprite(0, 0, 1100, 600, 'background');

        this.explosionsound = game.add.audio('explosionsound');
        
        this.clickrocksound = game.add.audio('clickrocksound');
        
        this.diamonddropsound = game.add.audio('diamonddropsound');
        
        // create the player using an image and place it at (100, 245)
        this.diamond = game.add.sprite(50, 5, 'diamond');
        this.diamond.hardness = 10
        this.topaz =  game.add.sprite(600, 60, 'topaz');
        this.topaz.hardness = 8
        this.calcite = game.add.sprite(300, 10, 'calcite');
        this.calcite.hardness = 3
        this.Corundum =  game.add.sprite(160, 20, 'Corundum');
        this.Corundum.hardness = 9
        this.Feldspar = game.add.sprite(700, 10, 'Feldspar');
        this.Feldspar.hardness = 6
        this.fluorite =  game.add.sprite(900, 50, 'fluorite');
        this.fluorite.hardness = 4
        this.Gypsum = game.add.sprite(500, 10, 'Gypsum');
        this.Gypsum.hardness = 2
        this.Quartz =  game.add.sprite(1000, 50, 'Quartz');
        this.Quartz.hardness = 7
        this.Talc = game.add.sprite(500, 120, 'Talc');
        this.Talc.hardness = 1
        this.Apatite = game.add.sprite(800, 160, 'Apatite');
        this.Apatite.hardness = 5
        
        this.explosion =  game.add.sprite(-200, -100, 'explosion');
        
        game.physics.arcade.enable(this.diamond);
        game.physics.arcade.enable(this.topaz);
        game.physics.arcade.enable(this.calcite);
        game.physics.arcade.enable(this.Corundum);
        game.physics.arcade.enable(this.Feldspar);
        game.physics.arcade.enable(this.fluorite);
        game.physics.arcade.enable(this.Gypsum);
        game.physics.arcade.enable(this.Quartz);
        game.physics.arcade.enable(this.Talc);
        game.physics.arcade.enable(this.Apatite);
                

        this.diamond.inputEnabled = true;
        this.diamond.events.onInputDown.add(this.selectgem, this);
        this.topaz.inputEnabled = true;
        this.topaz.events.onInputDown.add(this.selectgem, this);
        this.calcite.inputEnabled= true;
        this.calcite.events.onInputDown.add(this.selectgem, this);
        this.Corundum.inputEnabled = true;
        this.Corundum.events.onInputDown.add(this.selectgem, this);
        this.Feldspar.inputEnabled = true;
        this.Feldspar.events.onInputDown.add(this.selectgem, this);
        this.fluorite.inputEnabled = true;
        this.fluorite.events.onInputDown.add(this.selectgem, this);
        this.Gypsum.inputEnabled = true;
        this.Gypsum.events.onInputDown.add(this.selectgem, this);
        this.Quartz.inputEnabled = true;
        this.Quartz.events.onInputDown.add(this.selectgem, this);
        this.Talc.inputEnabled = true;
        this.Talc.events.onInputDown.add(this.selectgem, this);
        this.Apatite.inputEnabled = true;
        this.Apatite.events.onInputDown.add(this.selectgem, this);
        

        this.explosion.animations.add('explode');
        this.explosion.animations.play('explode', 6, true);
       
        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        space.onDown.add(this.fallingdiamonds, this);
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
        
        this.clickrocksound.play();
        
        if (!this.gem1)
        {
            this.gem1= clicked
            this.gem1.x=200
            this.gem1.y=200
           
            
        } else if(!this.gem2) {
            this.gem2=clicked    
            this.gem2.x=600
            this.gem2.y=200
            
        } else {
            this.animate2gems()
        }
    },
    
    // update the state of the game
    update: function() {
        if (this.gem1 && this.gem2) {    
            if (game.physics.arcade.overlap(this.gem1,this.gem2)) {
                this.gem1.body.velocity.x=0;
                this.gem1.body.velocity.y=0; 

                //This is where our gems are colliding
                var winner, loser;
                if ( this.gem1.hardness > this.gem2.hardness) {
                    winner = this.gem1;
                    loser = this.gem2;
                } else {
                    winner = this.gem2;
                    loser = this.gem1;
                }
                
                this.explosionsound.play();

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
    
    // makes the diamond jump
    fallingdiamonds: function() {
        alert("CONGRATULATIONS!!! YOU ARE SMOTHERED IN DIAMONDS!  YOU ARE RICH!! PRESS RETURN/ENTER TO RECEIVE YOUR RICHES!!!");
     var emitter = game.add.emitter(game.world.centerX, 0, 200);

    emitter.makeParticles('diamond');

    //	false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
    //	The 5000 value is the lifespan of each particle
    emitter.start(false, 5000, 20);
        
    this.diamonddropsound.play();
        
    },
  
    // resest the state of the game
    restartGame: function() {
        this.gem1 = null;
        this.gem2 = null;
        game.state.start('default');    
    }
};

var game = new Phaser.Game(1100, 600, Phaser.AUTO, '', main, true);
game.state.start("default");
