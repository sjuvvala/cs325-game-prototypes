"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
	
	var player;
	
	var cursors;
	var interact;
	var r; //restart
	var keys2; //wasd alternative
	
    var top_plat1, top_plat2, top_plat_door;
	var bot_plat;
	var room_div, door_closed, door_opened;
	var end_door;
	var b1, b2; //boundries
	
	var crystal, key, box;
	var lever;
	var crys_state = false; //picked up-true
	var key_state = false;
	
	var cat;
	var girl, girl_sit;
	var soul;
	
	//sounds
	var door_locked;
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('End');

    }
	
	
	function interact_lever(){
		if((game.physics.arcade.overlap(lever, cat) && player===cat) || (game.physics.arcade.overlap(lever, girl) && player===girl)){
			if(lever.frame === 0){
				lever.frame = 1; top_plat_door.x = top_plat_door.x - 230;
			}
			else if(lever.frame === 1){lever.frame = 0; top_plat_door.x = top_plat_door.x + 230;} //
		}
	}
	
	function interact_crystal(){
		if(game.physics.arcade.overlap(crystal, girl) && player==girl){
			if(!crys_state){
				game.world.bringToTop(crystal);
				crystal.body.gravity.y = 0;
				crys_state = true;
			}
			else if(crys_state){ //&& (interact.duration > 50 deal with this later
				if(girl.frame === 0){
					crystal.body.velocity.x = -250;
					crystal.body.velocity.y = -400;
				}
				else if(girl.frame === 1){
					crystal.body.velocity.x = 250;
					crystal.body.velocity.y = -400;
				}
				crystal.body.gravity.y = 450; 
				crys_state = false;
			}
		}
	}
	
    
    return {
        //=================================================================================================
        create: function () {
			//game.physics.startSystem(Phaser.Physics.ARCADE);
			
			crys_state = false;
			key_state = false;
			
			game.add.sprite(0,0, 'bg');
			
			//platforms + doors + boundries............................................................	
			
			b1 = game.add.sprite(0, 0, 'bound_1');
			game.physics.enable(b1, Phaser.Physics.ARCADE);
			b1.body.immovable = true;
			b2 = game.add.sprite(1195, 0, 'bound_2');
			game.physics.enable(b2, Phaser.Physics.ARCADE);
			b2.body.immovable = true;
			
			top_plat_door = game.add.sprite(312, 394, 'top_plat_door');
			game.physics.enable(top_plat_door, Phaser.Physics.ARCADE);
			top_plat_door.body.immovable = true;
			top_plat_door.body.checkCollision.down = false;
			top_plat_door.body.checkCollision.right = false;
			
			top_plat1 = game.add.sprite(0, 391, 'top_plat1');
			game.physics.enable(top_plat1, Phaser.Physics.ARCADE);
			top_plat1.body.immovable = true;
			top_plat1.body.checkCollision.down = false;
			top_plat1.body.checkCollision.right = false;
			
			top_plat2 = game.add.sprite(530, 391, 'top_plat2');
			game.physics.enable(top_plat2, Phaser.Physics.ARCADE);
			top_plat2.body.immovable = true;
			top_plat2.body.checkCollision.down = false;
			top_plat2.body.checkCollision.left = false;
			
			bot_plat = game.add.sprite(0, 851, 'bot_plat');
			game.physics.enable(bot_plat, Phaser.Physics.ARCADE);
			bot_plat.body.immovable = true;
			
			room_div = game.add.sprite(850, 440, 'room_div');
			game.physics.enable(room_div, Phaser.Physics.ARCADE);
			room_div.body.immovable = true;
			
			door_closed = game.add.sprite(838, 521, 'door_closed');
			game.physics.enable(door_closed, Phaser.Physics.ARCADE);
			door_closed.body.immovable = true;
			
			door_opened = game.add.sprite(664, 518, 'door_opened');
			door_opened.alpha = 0.0;
			
			end_door = game.add.sprite(919, 58, 'end_door');
			game.physics.enable(end_door, Phaser.Physics.ARCADE);
			end_door.body.immovable = true;
			
			//items........................................................................
			
			lever = game.add.sprite(73, 355, 'lever');
			game.physics.enable(lever, Phaser.Physics.ARCADE);
			lever.body.immovable = true;
			
			box = game.add.sprite(751, 273, 'box');
			game.physics.enable(box, Phaser.Physics.ARCADE);
			box.body.colliderWorldBounds = true;
			box.body.gravity.y = 450;
			box.body.checkCollision.right = false;
			box.body.checkCollision.left = false;
			
			key = game.add.sprite(1097, 605, 'key');
			game.physics.enable(key, Phaser.Physics.ARCADE);
			key.body.immovable = true;
			
			crystal = game.add.sprite(1000, 769, 'crystal');
			game.physics.enable(crystal, Phaser.Physics.ARCADE);
			crystal.body.colliderWorldBounds = true;
			crystal.body.gravity.y = 450;
			
			//player-controled beings......................................................
			
			cat = game.add.sprite(543, 291, 'cat');
			game.physics.enable(cat, Phaser.Physics.ARCADE);
			cat.body.colliderWorldBounds = true;
			//cat.body.bounce.y = 0.4;
			cat.body.gravity.y = 450;
			
			girl = game.add.sprite(42, 558, 'girl');
			girl.frame = 1;
			game.physics.enable(girl, Phaser.Physics.ARCADE);
			girl.body.colliderWorldBounds = true;
			//girl.body.bounce.y = 0.2;
			girl.body.gravity.y = 500;
			
			girl_sit = game.add.sprite(girl.x, girl.y + 180, 'girl_sit');
			girl_sit.frame = 1;
			game.physics.enable(girl_sit, Phaser.Physics.ARCADE);
			girl_sit.alpha = 0.0;
			
			soul = game.add.sprite(girl.x + 20, girl.y + 100, 'soul');
			game.physics.enable(soul, Phaser.Physics.ARCADE);
			soul.alpha = 0.0;
			
			player = girl;
			
			//keyboard inputs.............................................................
			cursors = game.input.keyboard.createCursorKeys();
			interact = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			r = game.input.keyboard.addKey(Phaser.Keyboard.R);
			
			keys2 = {
				up: game.input.keyboard.addKey(Phaser.Keyboard.W),
				down: game.input.keyboard.addKey(Phaser.Keyboard.S),
				left: game.input.keyboard.addKey(Phaser.Keyboard.A),
				right: game.input.keyboard.addKey(Phaser.Keyboard.D),
				inter1: game.input.keyboard.addKey(Phaser.Keyboard.E),
				inter2: game.input.keyboard.addKey(Phaser.Keyboard.F)
			};
			
			//actions...................................................................
			interact.onDown.add(interact_lever, this); keys2.inter1.onDown.add(interact_lever, this); keys2.inter2.onDown.add(interact_lever, this);
			interact.onDown.add(interact_crystal, this); keys2.inter1.onDown.add(interact_crystal, this); keys2.inter2.onDown.add(interact_crystal, this);
			
			//sound.......................................................................
			door_locked = game.sound.add('door_locked');
			
        },
        
		//====================================================================================================
        update: function () {
			
			//restart??
			if(r.isDown){game.state.start('Game');}
			
			//if(player===girl){cat.x = 0;} //test to see
			
			//collides..............................................................
			
			//girl
			var hitp1 = game.physics.arcade.collide(girl, bot_plat); var hitp2_1 = game.physics.arcade.collide(girl, top_plat1);
			var hitp2_2 = game.physics.arcade.collide(girl, top_plat2); var hitp2_d = game.physics.arcade.collide(girl, top_plat_door);
			var hitdoor = game.physics.arcade.collide(girl, door_closed); var hitbox = game.physics.arcade.collide(girl, box);
			
			//cat
			var hitp1_cat = game.physics.arcade.collide(cat, bot_plat); var hitp2_1_cat = game.physics.arcade.collide(cat, top_plat1);
			var hitp2_2_cat = game.physics.arcade.collide(cat, top_plat2); var hitp2_d_cat = game.physics.arcade.collide(cat, top_plat_door);
			var hitdoor_cat = game.physics.arcade.collide(cat, door_closed); var hitbox_cat = game.physics.arcade.collide(cat, box);
			
			//boundry collisions (since collide world bounds doesnt work)
			game.physics.arcade.collide(b1, girl); game.physics.arcade.collide(b2, girl);
			game.physics.arcade.collide(b1, cat); game.physics.arcade.collide(b2, cat);
			game.physics.arcade.collide(b1, box); game.physics.arcade.collide(b2, box);
			game.physics.arcade.collide(b1, crystal); game.physics.arcade.collide(b2, crystal);
			
			//box
			game.physics.arcade.collide(box, bot_plat); 
			game.physics.arcade.collide(box, top_plat1);
			game.physics.arcade.collide(box, top_plat2); 
			game.physics.arcade.collide(box, top_plat_door);
			game.physics.arcade.collide(box, door_closed);
			
			//crystal
			var c1 = game.physics.arcade.collide(crystal, bot_plat); 
			var c2 = game.physics.arcade.collide(crystal, top_plat1);
			var c3 = game.physics.arcade.collide(crystal, top_plat2); 
			game.physics.arcade.collide(crystal, top_plat_door);
			game.physics.arcade.collide(crystal, door_closed);
			var obj_col = game.physics.arcade.collide(crystal, box);
			
			//collsion restrictions..............................................................................
			if(hitbox){girl.body.checkCollision.up = false;}
			else{girl.body.checkCollision.up = true;}
			
			if(obj_col){crystal.body.checkCollision.up = false;}
			else{crystal.body.checkCollision.up = true;}

			
			
			//movement.................................................................................
			
			soul.x = player.x;
			soul.y = player.y;
			
			box.body.velocity.x = 0;
			
			girl_sit.x = girl.x; girl_sit.y = girl.y + 180;
			
			if(crys_state){
				crystal.x = girl.x + 20; crystal.y = girl.y + 100;
			}
			else if(!crys_state){crystal.body.gravity.y = 450;}
			
			if(c1 || c2 || c3){crystal.body.velocity.x = 0;}
			
			//.......................
			if(player===girl){
				player.body.velocity.x = 0;
				
				if(cursors.left.isDown || keys2.left.isDown){
					player.body.velocity.x = -250;
					player.frame = 0;
				}
				else if(cursors.right.isDown || keys2.right.isDown){
					player.body.velocity.x = 250;
					player.frame = 1;
				}
				//jump
				if( (cursors.up.isDown || keys2.up.isDown) && player.body.touching.down && (hitp1 || hitp2_1 || hitp2_2 || hitp2_d || hitdoor || hitbox)){
					player.body.velocity.y = -375;
				}
				
				//separate soul
				if(cursors.down.isDown || keys2.down.isDown){
					player.body.velocity.x = 0;
					player = soul;
					soul.alpha = 0.9;
					girl_sit.alpha = 1.0; girl_sit.frame = girl.frame;
					girl.alpha = 0.0;
					crys_state = false;
				}
				
				//interact with things (box, doors)
				if(interact.isDown || keys2.inter1.isDown || keys2.inter2.isDown){
					box.body.checkCollision.right = true;
					box.body.checkCollision.left = true;
					
					//open door 1
					if(door_closed.body.touching.right && player.body.touching.left){
						door_closed.kill(); door_opened.alpha = 1.0;
					}
					else if(door_closed.body.touching.left && player.body.touching.right){door_locked.play();}
					
					//get key
					if(game.physics.arcade.overlap(key, girl)){
						key.kill();
						key_state = true;
					}
					
					//end door
					if(key_state === true && game.physics.arcade.overlap(end_door, girl) ){
						quitGame();
					}
					
				}
				else{
					box.body.checkCollision.right = false;
					box.body.checkCollision.left = false;
				}
			}
			
			if(player===cat){
				player.body.velocity.x = 0;
				
				if(cursors.left.isDown || keys2.left.isDown){
					player.body.velocity.x = -250;
					player.frame = 0;
				}
				else if(cursors.right.isDown || keys2.right.isDown){
					player.body.velocity.x = 250;
					player.frame = 1;
				}
				//jump
				if( (cursors.up.isDown || keys2.up.isDown) && player.body.touching.down && (hitp1_cat || hitp2_1_cat || hitp2_2_cat || hitp2_d_cat || hitdoor_cat || hitbox_cat)){
					player.body.velocity.y = -400;
				}
				
				//separate soul
				if(cursors.down.isDown || keys2.down.isDown){
					player.body.velocity.x = 0;
					player = soul;
					soul.alpha = 0.9;
				}
				
				//interact with things (box)
				if(interact.isDown || keys2.inter1.isDown || keys2.inter2.isDown){
					box.body.checkCollision.right = true;
					box.body.checkCollision.left = true;
					
				}
				else{
					box.body.checkCollision.right = false;
					box.body.checkCollision.left = false;
				}
			}
			
			if(player===soul){
				player.body.velocity.x = 0;
				player.body.velocity.y = 0;
				
				if(cursors.left.isDown || keys2.left.isDown){
					player.body.velocity.x = -250;
				}
				if(cursors.right.isDown || keys2.right.isDown){
					player.body.velocity.x = 250;
				}
				if(cursors.up.isDown || keys2.up.isDown){
					player.body.velocity.y = -250;
				}
				if(cursors.down.isDown || keys2.down.isDown){
					player.body.velocity.y = 250;
				}
				//possess, return or teleport
				if(interact.isDown || keys2.inter1.isDown || keys2.inter2.isDown){
					if(game.physics.arcade.overlap(soul, cat)){player = cat; soul.alpha = 0.0;}
					else if(game.physics.arcade.overlap(soul, girl_sit)){
						player = girl; 
						soul.alpha = 0.0;
						girl.alpha = 1.0;
						girl_sit.alpha = 0.0;
					}
					else if(game.physics.arcade.overlap(soul, crystal)){
						player = girl; 
						soul.alpha = 0.0; 
						girl.alpha = 1.0;
						girl_sit.alpha = 0.0;
						player.x = crystal.x; player.y = crystal.y - 290;
					}
				}
				
			}
			
        }
    };
};
