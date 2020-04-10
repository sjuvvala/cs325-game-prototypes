"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
    
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            background = game.add.sprite(0, 0, 'preloaderBackground');
            preloadBar = game.add.sprite(300, 400, 'preloaderBar');
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            game.load.setPreloadSprite(preloadBar);
    
            //	Here we load the rest of the assets our game needs.
            //	As this is just a Project Template I've not provided these assets, swap them for your own.
            game.load.image('titlePage', 'assets/title_ac.png');
            game.load.atlas('playButton', 'assets/play_button_ac.png', 'assets/play_button_ac.json');
            //game.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
			
            //	+ lots of other required assets here
            //game.load.image( 'logo', 'assets/phaser.png' );
			
			game.load.image('background_g', 'assets/background.png');
			game.load.image('ground', 'assets/ground.png');
			game.load.image('ct0', 'assets/cat_tree0.png');
			game.load.image('ct1', 'assets/cat_tree1.png');
			game.load.image('ct2', 'assets/cat_tree2.png');
			game.load.image('ct3', 'assets/cat_tree3.png');
			game.load.image('blockk', 'assets/block.png')
			
			game.load.image('brown', 'assets/norm_brown.png');
			game.load.image('calico', 'assets/norm_calico.png');
			game.load.image('gray', 'assets/norm_gray.png');
			game.load.image('tux', 'assets/norm_tuxedo.png');
			game.load.image('white', 'assets/norm_white.png');
			
			game.load.spritesheet('eyesL', 'assets/bigeyeLSheet.png', 60, 26);
			game.load.spritesheet('eyesR', 'assets/bigeyeRSheet.png', 60, 26);
			
			game.load.spritesheet('alien', 'assets/alien_cat.png', 153, 189);
			game.load.spritesheet('gran', 'assets/old_lady.png', 368, 465);
			
			game.load.audio('alien_music', ['assets/Humanfobia_-_03_-_Alien_Radar.mp3']);
			game.load.audio('meow', ['assets/Meow.ogg']);
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
			//game.state.start('MainMenu');
			
			if (game.cache.isSoundDecoded('alien_music') && ready == false)
            {
                ready = true;
                game.state.start('MainMenu');
            }
    
        }
    
    };
};
