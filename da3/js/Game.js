"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    //var bouncy = null;
	var alienCat = null; //player
	var ground = null;
	var tree = null;
	var bl = null;
	
	var cursors = null;
	
	//uses spacebar
	var hypnoButton = null;
	
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

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
			
			tree = game.add.sprite(0, 108, 'cattree');
			game.physics.enable(tree, Phaser.Physics.ARCADE);
			tree.body.collideWorldBounds = true;
			tree.body.checkCollision.up = false;
			tree.body.checkCollision.down = true; //!!
			tree.body.checkCollision.left = false;
			tree.body.checkCollision.right = false;
			tree.body.immovable = true;
			
			bl = game.add.sprite(400, 432, 'blockk');
			game.physics.enable(bl, Phaser.Physics.ARCADE);
			bl.body.collideWorldBounds = true;
			//bl.body.checkCollision.up = false;
			bl.body.checkCollision.down = true; //!!
			bl.body.checkCollision.left = false;
			bl.body.checkCollision.right = false;
			bl.body.immovable = true;
			
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
			
			//cursor and keys
			cursors = game.input.keyboard.createCursorKeys();
			
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
			
			//collide with platforms.........................
			var hitGround = game.physics.arcade.collide(alienCat, ground);
			var hitTree = game.physics.arcade.collide(alienCat, tree); //cat tree isnt acting right, need to split it
			var hitBlock = game.physics.arcade.collide(alienCat, bl);
			
			//movement..................................................
			alienCat.body.velocity.x = 0;
			//alienCat.body.velocity.y = 0;
				//|| game.input.keyboard.isUp(Phaser.Keyboard.S) 
			if(cursors.left.isDown){
				alienCat.body.velocity.x = -250;
				//alienCat.animations.play('mleft');
				alienCat.frame = 3;
			}
			else if(cursors.right.isDown){
				alienCat.body.velocity.x = 250;
				//alienCat.animations.play('mright');
				alienCat.frame = 0;
			}
			//jump
			if(cursors.up.isDown && alienCat.body.touching.down && (hitGround || hitBlock)){
				alienCat.body.velocity.y = -500;
			}

			
			
			
        }
    };
};
