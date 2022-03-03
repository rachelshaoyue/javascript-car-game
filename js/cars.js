class Cars{
    constructor(scene){
        // reference to the game scene
        this.scene = scene;

        this.cars = scene.physics.add.group();
    }

    /**
     * Creates car
     */
    create(){
        // 1.5 for car1 and 1.1 for car2
        var car = this.cars.create(SCREEN_CX, SCREEN_CY, 'car1').setScale(0.05);
    }

    /**
     * Updates player position
     */
    update(){
        // references to the scene objects
        var circuit = this.scene.circuit;
        var camera = this.scene.camera;

        for (const car of this.cars.getChildren()){
            car.setVelocityY(100);
            
            const result = car.scale + .009;
            console.log(result);
            car.setScale(result)
        }
    }   
}