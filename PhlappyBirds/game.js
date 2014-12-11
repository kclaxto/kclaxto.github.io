
var main = {
    // load all the images and sounds
    preload: function() {	
        
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
    
    createGem: function(name, hardness, x, y) {
        var gem = game.add.sprite(x, y, name);
        gem.hardness = hardness
        game.physics.arcade.enable(gem);
        gem.inputEnabled = true;
        gem.events.onInputDown.add(this.selectgem, this);

        var style = { 
            font: "30px 'Comic Sans MS'", 
            fill: "#fff" 
             
        };
        var t = game.add.text(x, y, name, style);
        
        this[name] = gem;
    },
    
    // set up the game
    create: function() {
            
        
        this.explosionsound = game.add.audio('explosionsound');
        
        this.clickrocksound = game.add.audio('clickrocksound');
        
        this.diamonddropsound = game.add.audio('diamonddropsound');
        
        // create the player using an image and place it at (100, 245)
        this.createGem('diamond', 10, 50, 5);
        this.createGem('topaz', 8, 600, 60);
        this.createGem('calcite', 3, 300, 10);
        this.createGem('Corundum', 9, 160, 20);
        this.createGem('Feldspar', 6, 700, 10);
        this.createGem('fluorite', 4, 900, 50);
        this.createGem('Gypsum', 2, 500, 10);
        this.createGem('Quartz', 7, 1000, 50);
        this.createGem('Talc', 1, 500, 120);
        this.createGem('Apatite', 5, 800, 160);

        
        this.explosion =  game.add.sprite(-200, -100, 'explosion');
        this.explosion.animations.add('explode');
        this.explosion.animations.play('explode', 6, true);
       
        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        space.onDown.add(this.fallingdiamonds, this);
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
        if (this.gem1 && this.gem2 && game.physics.arcade.overlap(this.gem1,this.gem2)) {
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

// create a new Phaser game on an 1100x600 screen

var game = new Phaser.Game(1100, 600, Phaser.AUTO, '', main, true);
game.state.start("default");
