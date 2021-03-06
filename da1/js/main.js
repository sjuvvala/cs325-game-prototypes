"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 1100, 700, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'thing', 'assets/thingw.png' );
        game.load.image('ball', 'assets/red_ball.png');
    }
    
    var player;
    var balls;
    
    function create() {
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Create a sprite at the center of the screen using the 'logo' image.
        player = game.add.sprite( 500, 500, 'thing' );
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        //bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
      //  game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
      //  bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        //var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        //var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
        //text.anchor.setTo( 0.5, 0.0 );
        
        //game.physics.enable(ball, Phaser.Physics.ARCADE);
        
        balls = game.add.group();
        balls.enableBody = true;
        for(var i = 1; i < 4; i++){
            var ball = balls.create(100 + i, i * 50, 'ball');
            ball.body.collideWorldBounds = true;
            ball.body.velocity.setTo(150 * i, 150 * i);
            ball.body.bounce.setTo(1, 1);
        }
        
        for(var i = 1; i < 4; i++){
            var ball = balls.create(i * 50 , i * 50, 'ball');
            ball.body.collideWorldBounds = true;
            ball.body.velocity.setTo(-150 * i, -150 * i);
            ball.body.bounce.setTo(1, 1);
        }
        
        
        //var ball1 = balls.create(200, 200, 'ball');
        //var ball2 = balls.create(200, 100, 'ball');
        //var ball3 = balls.create(300, 200, 'ball');
        
        //ball1.body.collideWorldBounds = true;
        //ball2.body.collideWorldBounds = true;
        
        //ball1.body.velocity.setTo(200, 200);
        //ball1.body.bounce.setTo(1, 1);
        //ball2.body.velocity.setTo(200, 200);
        //ball2.body.bounce.setTo(1, 1);
        //balls.body.velocity.setTo(200, 200);
        //balls.body.bounce.setTo(1, 1);
        
        //game.physics.arcade.collide(ball1, ball2);
        //game.physics.arcade.collide(player, ball2);
        
    }
    
    function die(player, balls){
        player.kill();
    }
    
    function update() {
        
        game.physics.arcade.collide(balls, balls);
        //game.physics.arcade.collide(player, balls);
        
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
       // bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
        
        //  400 is the speed it will move towards the mouse
        //game.physics.arcade.moveToPointer(player, 900);
        game.physics.arcade.moveToPointer(player);

        //  if it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y))
        {
            player.body.velocity.setTo(0, 0);
        }
        
        game.physics.arcade.overlap(player, balls, die, null, this);
    }
   
};
