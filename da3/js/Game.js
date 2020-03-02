"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    //var bouncy = null;
	var alienCat = null; //player
	
	var ground = null;
	var ct0 = null, ct1 = null, ct2 = null, ct3 = null;
	var bl = null;
	
	var gray = null, brown = null, calico = null, tux = null, white = null; //cats
	
	var granny = null;
	//var timer = null;
	
	var cursors = null;
	var hypnoKey = null; //uses spacebar
	
	//var count = null; //keeps track of how many cats converted, at 5, win game
	var score = null;
    var scoreText = null;
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');
    }
	
	function scoreincr(){
		score += 1;
		scoreText.text = 'cats converted: ' + score;
	}
	
	
	//this doesnt work the way i want but that ok (hypnotizing process starts over again once stopped instead of continuing from where it left off)
	function hypnotize(alienCat, somecat, alienFacing){ //for facing, 0-left 1-right
	    var fr = somecat.currframe;
		if(hypnoKey.isDown){
			if(alienFacing === 0){alienCat.frame = 2;}
			else if(alienFacing === 1){alienCat.frame = 1;}
			
			somecat.hypnoeye.alpha = 1.0;
			
			if(!(hypnoKey.downDuration(500))){
				fr++;
				somecat.hypnoeye.frame = fr;
				if(fr === 5){
					if(alienFacing === 0){alienCat.frame = 3;}
					else if(alienFacing === 1){alienCat.frame = 0;}
					somecat.hypnoeye.alpha = 1.0;
					somecat.currframe = fr;
					return;
				}
			}
			if(!(hypnoKey.downDuration(1000))){
				fr++;
				somecat.hypnoeye.frame = fr;
				if(fr === 5){
					if(alienFacing === 0){alienCat.frame = 3;}
					else if(alienFacing === 1){alienCat.frame = 0;}
					somecat.hypnoeye.alpha = 1.0;
					somecat.currframe = fr;
					return;
				}
			}
			if(!(hypnoKey.downDuration(1500))){
				fr++;
				somecat.hypnoeye.frame = fr;
				if(fr === 5){
					if(alienFacing === 0){alienCat.frame = 3;}
					else if(alienFacing === 1){alienCat.frame = 0;}
					somecat.hypnoeye.alpha = 1.0;
					somecat.currframe = fr;
					return;
				}
			}
			if(!(hypnoKey.downDuration(2000))){
				fr++;
				somecat.hypnoeye.frame = fr;
				if(fr === 5){
					if(alienFacing === 0){alienCat.frame = 3;}
					else if(alienFacing === 1){alienCat.frame = 0;}
					somecat.hypnoeye.alpha = 1.0;
					somecat.currframe = fr;
					return;
				}
			}
			if(!(hypnoKey.downDuration(2500))){
				fr++;
				somecat.hypnoeye.frame = fr;
				if(fr === 5){
					if(alienFacing === 0){alienCat.frame = 3;}
					else if(alienFacing === 1){alienCat.frame = 0;}
					somecat.hypnoeye.alpha = 1.0;
					somecat.currframe = fr;
					return;
				}
			}
		}
		else if(!(hypnoKey.isDown)){
			if(alienFacing === 0){alienCat.frame = 3;}
			else if(alienFacing === 1){alienCat.frame = 0;}
			somecat.hypnoeye.alpha = 0.0;
			somecat.currframe = fr;
		}
	}
	
	//randomly generate what old lady does
	function grannyActions(granny){
		granny.looking = false;
		var rint = game.rnd.integerInRange(0,4);
		if(rint === 2){
			granny.granSprite.animations.play('look');
			//granny.granSprite.frame = 2;
			game.time.events.add(1000, setLooking, this, granny);
			//granny.looking = true;
		}
		else if(rint === 1){
			granny.looking = false; //probably redundant
			granny.granSprite.frame = 1;
		}
		else if(rint === 0){
			granny.looking = false; //probably redundant
			granny.granSprite.frame = 0
		}
		else if(rint === 3){
			granny.granSprite.animations.play('look');
			game.time.events.add(1000, setLooking, this, granny);
			//granny.looking = true;
		}
		else if(rint === 4){
			granny.looking = false; //probably redundant
			granny.granSprite.frame = 0
		}
	}
	function setLooking(granny){
		granny.looking = true;
	}
	
	/*function grannyLookUp(granny){
		granny.granSprite.frame = game.rnd.integerInRange(0,2);
		//granny.granSprite.frame = 1;
	}*/
	
	//game over
	function caught(granny){
		if(hypnoKey.isDown && granny.looking){
			alienCat.kill()
			game.add.text( game.world.centerX, 100, "you've been caught!", { fontSize: '32px', fill: '#000', align: "center"});
		}
	}
	
	//............................................................................................
    return {
    
        create: function () {
			
			//game.time.events.add(1000, scoreincr, this, 7);
			//game.time.events.loop(1000, scoreincr, this, 7);
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Create a sprite at the center of the screen using the 'logo' image.
            //bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            //bouncy.anchor.setTo( 0.5, 0.5 );
            
            // Turn on the arcade physics engine for this sprite.
            //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
            // Make it bounce off of the world bounds.
            //bouncy.body.collideWorldBounds = true;
            
            // Add some text using a CSS style.
            // Center it in X, and position its top 15 pixels from the top of the world.
            //var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
            //var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
            //text.anchor.setTo( 0.5, 0.0 );
            
            // When you click on the sprite, you go back to the MainMenu.
            //bouncy.inputEnabled = true;
            //bouncy.events.onInputDown.add( function() { quitGame(); }, this );
		
			//=======================================================================================
			//game.physics.startSystem(Phaser.Physics.ARCADE);
			
			//set up environment..................................................
			game.add.sprite(0,0, 'background_g');
			
			ground = game.add.sprite(0, 624, 'ground');
			game.physics.enable(ground, Phaser.Physics.ARCADE);
			ground.body.collideWorldBounds = true; //not sure how nessesary this is
			ground.body.immovable = true;
			
			ct3 = game.add.sprite(0, 108, 'ct3');
			game.physics.enable(ct3, Phaser.Physics.ARCADE);
			ct3.body.collideWorldBounds = true;
			//ct3.body.checkCollision.up = false;
			ct3.body.checkCollision.down = true; //!!
			ct3.body.checkCollision.left = false;
			ct3.body.checkCollision.right = false;
			ct3.body.immovable = true;
			
			ct2 = game.add.sprite(0, 242, 'ct2');
			game.physics.enable(ct2, Phaser.Physics.ARCADE);
			ct2.body.collideWorldBounds = true;
			//ct2.body.checkCollision.up = false;
			ct2.body.checkCollision.down = false; //!!
			ct2.body.checkCollision.left = false;
			ct2.body.checkCollision.right = false;
			ct2.body.immovable = true;
			
			ct1 = game.add.sprite(0, 405, 'ct1');
			game.physics.enable(ct1, Phaser.Physics.ARCADE);
			ct1.body.collideWorldBounds = true;
			//ct1.body.checkCollision.up = false;
			ct1.body.checkCollision.down = true; //!!
			ct1.body.checkCollision.left = false;
			ct1.body.checkCollision.right = false;
			ct1.body.immovable = true;
			
			ct0 = game.add.sprite(0, 570, 'ct0');
			game.physics.enable(ct0, Phaser.Physics.ARCADE);
			ct0.body.collideWorldBounds = true;
			//ct0.body.checkCollision.up = false;
			ct0.body.checkCollision.down = true; //!!
			ct0.body.checkCollision.left = false;
			ct0.body.checkCollision.right = false;
			ct0.body.immovable = true;
			
			bl = game.add.sprite(400, 432, 'blockk');
			game.physics.enable(bl, Phaser.Physics.ARCADE);
			bl.body.collideWorldBounds = true;
			//bl.body.checkCollision.up = false;
			bl.body.checkCollision.down = true; //!!
			bl.body.checkCollision.left = false;
			bl.body.checkCollision.right = false;
			bl.body.immovable = true;
			
			//other cats :3............................................................
			gray = { cat: game.add.sprite(2, 213, 'gray'), hypnoeye: game.add.sprite(53, 244, 'eyesR'), currframe: 0, isConverted: false };
			game.physics.enable(gray.cat, Phaser.Physics.ARCADE);
			gray.hypnoeye.alpha = 0.0;
			
			tux = { cat: game.add.sprite(51, 441, 'tux'), hypnoeye: game.add.sprite(53, 470, 'eyesL'), currframe: 0, isConverted: false };
			game.physics.enable(tux.cat, Phaser.Physics.ARCADE);
			tux.hypnoeye.alpha = 0.0;
			
			brown = { cat: game.add.sprite(353, 492, 'brown'), hypnoeye: game.add.sprite(450, 523, 'eyesR'), currframe: 0, isConverted: false };
			game.physics.enable(brown.cat, Phaser.Physics.ARCADE);
			brown.hypnoeye.alpha = 0.0;
			
			calico = { cat: game.add.sprite(502, 244, 'calico'), hypnoeye: game.add.sprite(504, 276, 'eyesL'), currframe: 0, isConverted: false };
			game.physics.enable(calico.cat, Phaser.Physics.ARCADE);
			calico.hypnoeye.alpha = 0.0;
			
			white = { cat: game.add.sprite(690, 443, 'white'), hypnoeye: game.add.sprite(813, 471, 'eyesR'), currframe: 0, isConverted: false };
			game.physics.enable(white.cat, Phaser.Physics.ARCADE);
			white.hypnoeye.alpha = 0.0;
			
			//gran......................................................................
			granny = {granSprite: game.add.sprite(880, 180, 'gran'), looking: false };
			granny.granSprite.animations.add('look', [1,1,2], 2, false);
			game.time.events.loop(2700, grannyActions, this, granny);
				//game.time.events.loop(5000, grannyActions, this, granny);
				//timer = game.time.create(false); //no
				//timer.loop(game.rnd.integerInRange(1000, 4000)) //no
			
			
			//player + animations.......................................................
			alienCat = game.add.sprite(301, 121, 'alien');
			//game.physics.arcade.enable(alienCat);
			game.physics.enable(alienCat, Phaser.Physics.ARCADE);
			alienCat.body.bounce.y = 0.2;
			alienCat.body.gravity.y = 450;
			alienCat.body.colliderWorldBounds = true;
			
			//actually frames go from 0-3, my bad, also i dont need animation right now
			/*alienCat.animations.add('mleft', [4,4], 3, true);
			alienCat.animations.add('mright', [1,1], 3, true);
			alienCat.animations.add('hypnoLeft', [3,3], 2, true);
			alienCat.animations.add('hypnoRight', [2,2], 2, true);*/
			
			//keyboard input........................................................
			cursors = game.input.keyboard.createCursorKeys();
			hypnoKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			
			//count of cats converted
			score = 0;
			scoreText = game.add.text(16, 16, 'cats converted: 0', { fontSize: '16px', fill: '#000' });
			
			
        },
    
        update: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Accelerate the 'logo' sprite towards the cursor,
            // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
            // in X or Y.
            // This function returns the rotation angle that makes it visually match its
            // new trajectory.
            //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
			
			//==================================================================
			
			//win game
			if(score === 5){
				var wintext = game.add.text( game.world.centerX, 100, "you win.", { fontSize: '32px', fill: '#000', align: "center"  });
				alienCat.kill(); //temporary fix
			}
			
			//collide with platforms.........................
			var hitGround = game.physics.arcade.collide(alienCat, ground);
			var hitT3 = game.physics.arcade.collide(alienCat, ct3);
			var hitT2 = game.physics.arcade.collide(alienCat, ct2);
			var hitT1 = game.physics.arcade.collide(alienCat, ct1);
			var hitT0 = game.physics.arcade.collide(alienCat, ct0);
			var hitBlock = game.physics.arcade.collide(alienCat, bl);
			
			//overlap with cats...................................
			var hitGray = game.physics.arcade.overlap(alienCat, gray.cat);
			var hitBrown = game.physics.arcade.overlap(alienCat, brown.cat);
			var hitCalico = game.physics.arcade.overlap(alienCat, calico.cat);
			var hitTux = game.physics.arcade.overlap(alienCat, tux.cat);
			var hitWhite = game.physics.arcade.overlap(alienCat, white.cat);
			
			
			//movement..................................................
			alienCat.body.velocity.x = 0;
			//alienCat.body.velocity.y = 0;
				//|| game.input.keyboard.isUp(Phaser.Keyboard.S) 
			if(cursors.left.isDown && !(hypnoKey.isDown)){
				alienCat.body.velocity.x = -250;
				//alienCat.animations.play('mleft');
				alienCat.frame = 3;
			}
			else if(cursors.right.isDown && !(hypnoKey.isDown)){
				alienCat.body.velocity.x = 250;
				//alienCat.animations.play('mright');
				alienCat.frame = 0;
			}
			//jump
			if(cursors.up.isDown && alienCat.body.touching.down && (hitGround || hitBlock || hitT1 || hitT2 || hitT3 || hitT0) && !(hypnoKey.isDown)){
				alienCat.body.velocity.y = -400;
			}
			
			//hypnotizing the cats.....................................
			if(hitGray && hitT2 && !hitT0){
				//hypnotize(alienCat, gray, hypnoeye_gr, 0, 0);
				//hypnotize(alienCat, gray.cat, gray.hypnoeye, 0, 0);
				
				caught(granny);
				if(gray.currframe !== 5 && gray.isConverted === false){hypnotize(alienCat, gray, 0);}
				if(gray.currframe === 5 && gray.isConverted === false){
					gray.isConverted = true;
					scoreincr();
				}
			}
			
			if(hitBrown && hitGround){
				caught(granny);
				if(brown.currframe !== 5 && brown.isConverted === false){hypnotize(alienCat, brown, 1);}
				if(brown.currframe === 5 && brown.isConverted === false){
					brown.isConverted = true;
					scoreincr();
				}
			}
			
			if(hitCalico && hitBlock){
				caught(granny);
				if(calico.currframe !== 5 && calico.isConverted === false){hypnotize(alienCat, calico, 1);}
				if(calico.currframe === 5 && calico.isConverted === false){
					calico.isConverted = true;
					scoreincr();
				}
			}
			
			if(hitTux && hitT0){
				caught(granny);
				if(tux.currframe !== 5 && tux.isConverted === false){hypnotize(alienCat, tux, 0);}
				if(tux.currframe === 5 && tux.isConverted === false){
					tux.isConverted = true;
					scoreincr();
				}
			}
			
			if(hitWhite && hitGround){
				caught(granny);
				if(white.currframe !== 5 && white.isConverted === false){hypnotize(alienCat, white, 1);}
				if(white.currframe === 5 && white.isConverted === false){
					white.isConverted = true;
					scoreincr();
				}
			}
			

			
        }
    };
};
