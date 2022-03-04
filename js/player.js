class Player{
    constructor(scene){
        // reference to the main scene
        this.scene = scene;

        this.sprite = scene.physics.add.image(SCREEN_CX, SCREEN_H, 'playerImg').setVisible(true).setScale(.7, .6).refreshBody().setImmovable();
        const scaledHeight = this.sprite.height * this.sprite.scale;
        const scaledWidth = this.sprite.width * this.sprite.scale;
        this.sprite.y -= (scaledHeight) / 2;
        this.sprite.body.setSize(scaledWidth, scaledHeight)
        this.sprite.setOffset(scaledWidth/3.5, scaledHeight/2);
        this.sprite.setDepth(1);

        // player world coordinates
        this.x = 0;
        this.y = 0;
        this.z = 0;
        // this.w = (this.sprite.width/1000)*2;

        // player screen coordinates
        this.screen = { x: 0, y: 0, h: 0 };

        // max speed (to avoid moving for more than 1 road segment, assuming fps=60)
        this.maxSpeed = (scene.circuit.segmentLength) / (1/60);

        // driving control parameters
        this.speed = 0;

        this.moveRight = true;
        this.moveLeft = true;
    }

    /**
     * Initializes player (must be called when initializing game or chaning settings)
     */
    init(){
        // set the player screen size
        this.screen.w = this.sprite.width * .7;
        this.screen.h = this.sprite.height * .5;

        // set the player screen position
        this.screen.x = SCREEN_CX;
        this.screen.y = SCREEN_H - this.screen.h/2;
    }

    /**
     * Restarts player
     */
    restart(){
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.speed = this.maxSpeed;
    }

    /**
     * Updates player position
     */
    update(dt){
        // references to the scene objects
        var circuit = this.scene.circuit;
        var cursors = this.scene.cursors;

        // Moving in Z direction
    
        this.z += this.speed * dt;
        if (this.z >= circuit.roadLength) this.z -= circuit.roadLength;

        if (cursors.left.isDown) //  && this.x > -0.8
        {
            this.sprite.setVelocityX(-2);
            this.x = this.sprite.x - SCREEN_CX;
        }
        else if (cursors.right.isDown) //  && this.x < 0.8
        {
            this.sprite.setVelocityX(2);
            this.x = this.sprite.x - SCREEN_CX;

        }else{
            this.sprite.setVelocityX(0);
        }

    }

    setMoveRight(flag){
        this.moveRight = flag;
    }

    setMoveLeft(flag){
        this.moveLeft = flag;
    }
}