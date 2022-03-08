class Cars{
    constructor(scene){
        // reference to the game scene
        this.scene = scene;
        this.player = scene.player;

        this.sprites = scene.physics.add.group();
    }

    /**
     * Creates car
     */
    create(){
        // var car = this.cars.create(SCREEN_CX, SCREEN_CY + 10, 'car1').setScale(0.05);
        
        var car = this.sprites.create(SCREEN_CX, SCREEN_CY + 10, 'car2').setScale(0.03);
    }

    /**
     * Updates car position
     */
    update(){
        // references to the scene objects
        var camera = this.scene.camera;
        var cursors = this.scene.cursors;

        for (const car of this.sprites.getChildren()){
            car.setVelocityY(100);
            
            const result = car.scale + .007;
            car.setScale(result);

            car.x = SCREEN_CX;

            // car1: 0 for center, 650 for left, -650 for right
            // car2: 750 for left and -750 for right
            car.x -= ((camera.x) * (car.scale/2));

            if(car.y > SCREEN_H){
                car.setVelocityY(0);
                car.disableBody(true, true);
                car.destroy();
            }
        }
    }

    /**
     * Hit the player
     */
    hitPlayer(player, car){
        // console.log("hitttt")
        // console.log("touching");
        // console.log(player.body.touching);
        // console.log("blocked");
        // console.log(player.body.blocked);
        // if(player.body.touching.right) this.player.sprite.x -= 0.1;
        // if(player.body.touching.left) this.player.sprite.x += 0.1;


    }

    /**
     * touches the player
     */
    touchPlayer(player, car){
        if(this.player.sprite.x > car.x){
            this.player.sprite.x += .1;
        }else{
            this.player.sprite.x -= .1;
        }
    }   
}