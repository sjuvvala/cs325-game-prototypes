"use strict";

//time to make a game!
GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    //var bouncy = null;
	
	//player character
	var demonGirl = null;
	
	//stuffed animal
	var s_body = null;
	var s_head = null;
	var s_legL = null;
	var s_legR = null;
	var s_armL = null;
	var s_armR = null;
	
	var facing = null; //what direction is the demon girl facing: 0 for left, 1 for right
	
	var attackKey = null; //will be spacebar
	var cursors = null;
	var jumpTimer = 0;
	
	//extra!! change background
	var backgroundKey = null; //B
	var bNum = 0;
	var currb = null;
	
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }
	
	//launch it in an unrealistic way
	function hitStuffed(body, bodyB, shapeA, shapeB, equation){
		if(body && attackKey.isDown){
			if(facing === 0){
				s_body.body.velocity.x = game.rnd.integerInRange(-800,-400);
			}
			else if(facing === 1){
				s_body.body.velocity.x = game.rnd.integerInRange(400,800);
			}
			s_body.body.velocity.y = game.rnd.integerInRange(-800,-400);
		}
	}
	
	function changeBackground() {
		if(bNum===8){bNum = 0;}
		if(bNum===0){game.stage.backgroundColor = "#7099ff";}
		else if(bNum===1){game.stage.backgroundColor = "#fff670";}
		else if(bNum===2){game.stage.backgroundColor = "#ff2989";}
		else if(bNum===3){game.stage.backgroundColor = "#29ff4e";}
		else if(bNum===4){
			currb = game.add.sprite(0,0, 'b1');
			currb.sendToBack();
		}
		else if(bNum===5){
			currb.kill();
			currb = game.add.sprite(0,0, 'b2');
			currb.sendToBack();
		}
		else if(bNum===6){
			currb.kill();
			currb = game.add.sprite(0,0, 'b3');
			currb.sendToBack();
		}
		else if(bNum===7){
			currb.kill();
			game.stage.backgroundColor = "#f0f0f0"; //set back to default
		}
		bNum++;
		
	}
	
    
    return {
    
        create: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Create a sprite at the center of the screen using the 'logo' image.
            /*bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            bouncy.anchor.setTo( 0.5, 0.5 );
            
            // Turn on the arcade physics engine for this sprite.
            game.physics.enable( bouncy, Phaser.Physics.ARCADE );
            // Make it bounce off of the world bounds.
            bouncy.body.collideWorldBounds = true;
            
            // Add some text using a CSS style.
            // Center it in X, and position its top 15 pixels from the top of the world.
            var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
            var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
            text.anchor.setTo( 0.5, 0.0 );
            
            // When you click on the sprite, you go back to the MainMenu.
            bouncy.inputEnabled = true;
            bouncy.events.onInputDown.add( function() { quitGame(); }, this );*/
			
			game.stage.backgroundColor = "#f0f0f0";
			
			game.physics.startSystem(Phaser.Physics.P2JS);
			
			game.physics.p2.gravity.y = 450;
			
			//stuffed animal...............................................................
			s_body = game.add.sprite(789, 131, 'stuffed', 0);
			s_head = game.add.sprite(784, 30, 'stuffed', 1);
			s_legL = game.add.sprite(774, 189, 'stuffed', 2);
			s_legR = game.add.sprite(855, 189, 'stuffed', 3);
			s_armL = game.add.sprite(720, 101, 'stuffed', 4);
			s_armR = game.add.sprite(845, 95, 'stuffed', 5);
			
			game.physics.p2.enable([s_body, s_head, s_legL, s_legR, s_armL, s_armR], false);
			
			s_body.body.clearShapes();
			s_body.body.loadPolygon('s_data', 'body');
			s_body.body.collideWorldBounds = true; //doesnt seem nessesary
			
			s_head.body.clearShapes();
			s_head.body.loadPolygon('s_data', 'head');
			s_head.body.collideWorldBounds = true;
			
			s_legL.body.clearShapes();
			s_legL.body.loadPolygon('s_data', 'legL');
			s_legL.body.collideWorldBounds = true;
			
			s_legR.body.clearShapes();
			s_legR.body.loadPolygon('s_data', 'legR');
			s_legR.body.collideWorldBounds = true;
			
			s_armL.body.clearShapes();
			s_armL.body.loadPolygon('s_data', 'armL');
			s_armL.body.collideWorldBounds = true;
			
			s_armR.body.clearShapes();
			s_armR.body.loadPolygon('s_data', 'armR');
			s_armR.body.collideWorldBounds = true;
			
			game.physics.p2.createRevoluteConstraint(s_body, [0, -60], s_head, [0, 45], 100);
			game.physics.p2.createRevoluteConstraint(s_body, [-40, 35], s_legL, [-12, -25], 200);
			game.physics.p2.createRevoluteConstraint(s_body, [35, 45], s_legR, [-25, -40], 200);
			game.physics.p2.createRevoluteConstraint(s_body, [-60, -40], s_armL, [25, 0], 200);
			game.physics.p2.createRevoluteConstraint(s_body, [60, -40], s_armR, [-30, 0], 200);
			
			s_body.body.mass = 900;
			
			//player!........................................................................
			demonGirl = game.add.sprite(200, 476, 'demonGirl');
			facing = 0;
			
			game.physics.p2.enable(demonGirl, false);
			demonGirl.body.fixedRotation = true;
			demonGirl.body.damping = 0.5 //??
			
			demonGirl.animations.add('attackL', [1,2,0], 5, false);
			demonGirl.animations.add('attackR', [4,3,5], 5, false);
			
			//keyboard input.................................................................
			attackKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			backgroundKey = game.input.keyboard.addKey(Phaser.Keyboard.B);
			cursors = game.input.keyboard.createCursorKeys();
			
			//materials......................................................................
			var dgMaterial = game.physics.p2.createMaterial('dgMaterial', demonGirl.body);
			var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
			var sMaterial = game.physics.p2.createMaterial('worldMaterial');
			game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);
			
			var groundPlayerCM = game.physics.p2.createContactMaterial(dgMaterial, worldMaterial, { friction: 0.0 });
			var groundStuffCM = game.physics.p2.createContactMaterial(worldMaterial, sMaterial, { friction: 0.6 });
			
			//var sdgfriction = game.physics.p2.createContactMaterial(dgMaterial, sMaterial, {friction: 0.8});
			
			//hit....................................
			demonGirl.body.onBeginContact.add(hitStuffed, this);
			
			//b............................................
			//game.input.onDown.add(changeBackground, this);
			//backgroundKey.event.onInputDown.add(changeBackground, this); wrong 
			//backgroundKey.events.onInputDown(changeBackground, this); wrong
			backgroundKey.onDown.add(changeBackground, this); //yes!
        },
    
        update: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Accelerate the 'logo' sprite towards the cursor,
            // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
            // in X or Y.
            // This function returns the rotation angle that makes it visually match its
            // new trajectory.
            //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
			
			if(cursors.left.isDown){
				demonGirl.frame = 0;
				facing = 0;
				demonGirl.body.moveLeft(300);
			}
			else if(cursors.right.isDown){
				demonGirl.frame = 5;
				facing = 1;
				demonGirl.body.moveRight(300);
			}
			else{
				demonGirl.body.velocity.x = 0;
			}
			
			if(cursors.up.isDown && game.time.now > jumpTimer){
				demonGirl.body.moveUp(350);
				jumpTimer = game.time.now + 750;
			}
			
			if(attackKey.isDown){
				if(facing === 0){
					demonGirl.animations.play('attackL');
				}
				else if(facing === 1){
					demonGirl.animations.play('attackR');
				}
				//s_body.body.velocity.x = 500;
				//s_body.body.velocity.y = -500;
			}
			
			/*if(backgroundKey.isDown){
				changeBackground();
			}*/
			
			 game.debug.text('Time wasted: ' + this.game.time.totalElapsedSeconds(), 32, 32);
			
        }
    };
};
