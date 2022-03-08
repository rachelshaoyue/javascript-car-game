/**
 * Pseudo-3D Racing game prototype 
 * 
 * @author Srdjan Susnic
 * @copyright 2021 Ask for Game Task
 * @website http://www.askforgametask.com
 * @author Rachel Taylor (updated the code)
 */

// Global Constants

// screen size
const SCREEN_W = 1920;
const SCREEN_H = 1080;

// coordinates of the screen center
const SCREEN_CX = SCREEN_W/2
const SCREEN_CY = SCREEN_H/2

// game states
const STATE_INIT = 1;
const STATE_RESTART = 2;
const STATE_PLAY = 3;
const STATE_GAMEOVER = 4;

// Global Variables

// current state
var state = STATE_INIT;

// Main Scene

class MainScene extends Phaser.Scene{
    constructor(){
        super({
            key: 'SceneMain'
        });
    }

    /**
     * Loads all assets
     */
    preload(){
        this.load.image('bgImg', '../assets/bg_img.jpeg');
        this.load.image('cityBg', '../assets/city_bg.png');
        this.load.image('car1', '../assets/car1.png');
        this.load.image('car2', '../assets/car2.png');
        this.load.image('playerImg', "../assets/player_car.png");
    }

    /**
     * Creates all objects
     */
    create(){
        // backgrounds
        this.sprBack = this.add.image(SCREEN_CX, SCREEN_CY, 'bgImg');
        this.cityBack = [
            this.add.image(1100, 250, 'cityBg').setScale(2.5).setAlpha(.5), 
            this.add.image(500, 190, 'cityBg').setScale(1.8), 
            this.add.image(1400, 250, 'cityBg').setScale(2)];

        // instances
        this.cursors = this.input.keyboard.createCursorKeys();
        this.circuit = new Circuit(this);
        this.player = new Player(this);
        this.cars = new Cars(this);
        this.camera = new Camera(this);
        this.settings = new Settings(this);

        this.player.sprite.setBounce(1);
        // add physics
        this.physics.add.collider(this.cars.sprites, this.player.sprite, this.cars.hitPlayer, null, this);
        this.physics.add.overlap(this.cars.sprites, this.player.sprite, this.cars.touchPlayer, null, this);

        // listener to pause game
        this.input.keyboard.on('keydown-P', function(){
            this.settings.txtPause.text = "[P] Resume";
            this.scene.pause();
            this.scene.launch('ScenePause');
        }, this);

        // listener on resume event
        this.events.on('resume', function(){
            this.settings.show();
        }, this);
    }

    /**
     * Main Game Loop
     */
    update(time, delta){
        switch(state){
            case STATE_INIT:
                this.camera.init();
                this.player.init();

                state = STATE_RESTART;
                break;
            case STATE_RESTART:
                this.circuit.create();
                this.cars.create();
                this.player.restart();

                // test
                // this.circuit.render3D();

                state = STATE_PLAY;
                break;
            case STATE_PLAY:
                // duration of the time period
                var dt = Math.min(1, delta/1500);

                this.player.update(dt);
                this.camera.update();
                this.circuit.render3D();
                this.cars.update();

                if(this.circuit.finish){
                    state = STATE_GAMEOVER;
                }
                break;
            case STATE_GAMEOVER:
                break;
        }
    }
}

class PauseScene extends Phaser.Scene{
    constructor(){
        super({
            key: 'ScenePause'
        });
    }

    create(){
        // listener to resume game
        this.input.keyboard.on('keydown-P', function(){
            this.scene.resume('SceneMain');
            this.scene.stop();
        }, this);
    }
}

// Initializing Phaser Game

// game configuration
var config = {
    type: Phaser.AUTO,
    width: SCREEN_W,
    height: SCREEN_H,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },

    scene: [MainScene, PauseScene]
}

// game instance
var game = new Phaser.Game(config);