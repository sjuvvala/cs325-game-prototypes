"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
    
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            //background = game.add.sprite(0, 0, 'preloaderBackground');
            preloadBar = game.add.sprite(300, 400, 'preloaderBar');
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            game.load.setPreloadSprite(preloadBar);
    
            //	Here we load the rest of the assets our game needs.
            //	As this is just a Project Template I've not provided these assets, swap them for your own.
			
            /*game.load.image('titlePage', 'assets/title.jpg');
            game.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
            game.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
            //	+ lots of other required assets here
            game.load.image( 'logo', 'assets/phaser.png' );*/
			
			game.load.image('title', 'assets/title_screen.png');
			game.load.atlas('playButton', 'assets/play_button_ac.png', 'assets/play_button_ac.json');
			
			game.load.image('rules', 'assets/rules.png');
			
			game.load.image( 'bg', 'assets/background.png');
			game.load.image('top_plat1', 'assets/platformt_1.png');
			game.load.image('top_plat2', 'assets/platformt_2.png');
			game.load.image('top_plat_door', 'assets/platformd.png');
			game.load.image('bot_plat', 'assets/platformb.png');
			game.load.image('room_div', 'assets/room_div.png');
			game.load.image('door_opened', 'assets/door_opened.png');
			game.load.image('door_closed', 'assets/door_closed.png');
			game.load.image('end_door', 'assets/end_door.png');
			game.load.image('crystal', 'assets/crystal.png');
			game.load.image('key', 'assets/key.png');
			game.load.image('box', 'assets/box1.png');
			
			game.load.image('bound_1', 'assets/bound_1.png');
			game.load.image('bound_2', 'assets/bound_2.png');
			
			game.load.spritesheet('lever', 'assets/lever.png', 83, 36);
			game.load.spritesheet('girl', 'assets/girlv2.png', 80, 295);
			game.load.spritesheet('girl_sit', 'assets/girl_sit.png', 113, 143);
			game.load.spritesheet('cat', 'assets/cat.png', 97, 100);
			
			game.load.image('soul', 'assets/soul.png');
			
			game.load.audio('door_locked', ['assets/door-locked.wav']);
        },
    
        create: function () {
    
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            preloadBar.cropEnabled = false;
    
        },
    
        update: function () {
    
            //	You don't actually need to do this, but I find it gives a much smoother game experience.
            //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
            //	You can jump right into the menu if you want and still play the music, but you'll have a few
            //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
            //	it's best to wait for it to decode here first, then carry on.
            
            //	If you don't have any music in your game then put the game.state.start line into the create function and delete
            //	the update function completely.
            
            /*if (game.cache.isSoundDecoded('titleMusic') && ready == false)
            {
                ready = true;
                game.state.start('MainMenu');
            }*/
			game.state.start('MainMenu');
    
        }
    
    };
};
