"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    //var bouncy = null;
	var alienCat = null; //player
	
	var ground = null;
	var ct0 = null, ct1 = null, ct2 = null, ct3 = null;
	var bl = null;
	
	var gray = null, brown = null, calico = null, tux = null, white = null; //cats
	var hypnoeye_gr = null, hypnoeye_br = null, hypnoeye_cal = null, hypnoeye_tux = null, hypnoeye_wh = null; //possessed eyes
	
	var cursors = null;
	//uses spacebar
	var hypnoKey = null;
	
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }
	
	function hypnotize(alienCat, somecat, eyes, progress, alienFacing){ //for facing, 0-left 1-right
		if(hypnoKey.isDown){
			if(alienFacing === 0){alienCat.frame = 2;}
			else if(alienFacing === 1){alienCat.frame = 1;}
			
			eyes.alpha = 1.0;
			
			if(!(hypnoKey.downDuration(1000))){
				progress++;
				eyes.frame = progress;
				if(progress === 5){
					if(alienFacing === 0){alienCat.frame = 3;}
					else if(alienFacing === 1){alienCat.frame = 0;}
					return;
				}
			}
			if(!(hypnoKey.downDuration(2000))){
				progress++;
				eyes.frame = progress;
				if(progress === 5){
					if(alienFacing === 0){alienCat.frame = 3;}
					else if(alienFacing === 1){alienCat.frame = 0;}
					return;
				}
			}
			if(!(hypnoKey.downDuration(3000))){
				progress++;
				eyes.frame = progress;
				if(progress === 5){
					if(alienFacing === 0){alienCat.frame = 3;}
					else if(alienFacing === 1){alienCat.frame = 0;}
					return;
				}
			}
			if(!(hypnoKey.downDuration(4000))){
				progress++;
				eyes.frame = progress;
				if(progress === 5){
					if(alienFacing === 0){alienCat.frame = 3;}
					else if(alienFacing === 1){alienCat.frame = 0;}
					return;
				}
			}
			if(!(hypnoKey.downDuration(5000))){
				progress++;
				eyes.frame = progress;
				if(progress === 5){
					if(alienFacing === 0){alienCat.frame = 3;}
					else if(alienFacing === 1){alienCat.frame = 0;}
					return;
				}
			}
		}
		else if(!(hypnoKey.isDown)){
			if(alienFacing === 0){alienCat.frame = 3;}
			else if(alienFacing === 1){alienCat.frame = 0;}
			eyes.alpha = 0.0;
			return progress;
		}
		return progress;
	}
	
	
    return {
    
        create: function () {
    
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
			gray = game.add.sprite(2, 213, 'gray');
			game.physics.enable(gray, Phaser.Physics.ARCADE);
			
			tux = game.add.sprite(51, 441, 'tux');
			game.physics.enable(gray, Phaser.Physics.ARCADE);
			
			brown = game.add.sprite(353, 492, 'brown');
			game.physics.enable(gray, Phaser.Physics.ARCADE);
			//their eyessss....................................
			hypnoeye_gr = game.add.sprite(53, 244, 'eyesR'); hypnoeye_gr.alpha = 0.0;
			hypnoeye_br = game.add.sprite(450, 523, 'eyesR'); hypnoeye_br.alpha = 0.0;
			
			
			//player + animations.......................................................
			alienCat = game.add.sprite(301, 121, 'alien');
			//game.physics.arcade.enable(alienCat);
			game.physics.enable(alienCat, Phaser.Physics.ARCADE);
			alienCat.body.bounce.y = 0.2;
			alienCat.body.gravity.y = 500;
			alienCat.body.colliderWorldBounds = true;
			
			//actually frames go from 0-3, my bad, also i dont need animation right now
			/*alienCat.animations.add('mleft', [4,4], 3, true);
			alienCat.animations.add('mright', [1,1], 3, true);
			alienCat.animations.add('hypnoLeft', [3,3], 2, true);
			alienCat.animations.add('hypnoRight', [2,2], 2, true);*/
			
			//keyboard input........................................................
			cursors = game.input.keyboard.createCursorKeys();
			hypnoKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			
			//timer.................................................................
			
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
			
			//other important stuff...................................
			var count = 0; //keeps track of how many cats converted, at 5, win game
			
			//hypno process for each cat
			var p_gr = 0;
			
			//collide with platforms.........................
			var hitGround = game.physics.arcade.collide(alienCat, ground);
			var hitT3 = game.physics.arcade.collide(alienCat, ct3);
			var hitT2 = game.physics.arcade.collide(alienCat, ct2);
			var hitT1 = game.physics.arcade.collide(alienCat, ct1);
			var hitT0 = game.physics.arcade.collide(alienCat, ct0);
			var hitBlock = game.physics.arcade.collide(alienCat, bl);
			
			//overlap with cats
			var hitGray = game.physics.arcade.overlap(alienCat, gray);
			
			
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
				alienCat.body.velocity.y = -450;
			}
			
			//hypnotizing the cats.....................................
			if(hitGray && hitT2){
				p_gr = hypnotize(alienCat, gray, hypnoeye_gr, p_gr, 0);
			}
			

			
        }
    };
};
