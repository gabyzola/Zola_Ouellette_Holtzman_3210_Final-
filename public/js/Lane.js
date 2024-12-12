import * as THREE from 'three';
import Car from './vehicles/car.js';

export default class Lane extends THREE.Group {
    /**
     * Represents a lane in the scene.
     * 
     * @param {number} width Width of the lane.
     * @param {number} length Length of the lane.
     * @param {string} type Type of the lane ('road' or 'grass').
     * @param {THREE.Scene} Scene Scene to play death animation 
     */
    constructor(width, length, type) {
        super();

        this.width = width;
        this.length = length;
        this.type = type;

        let color; 

        switch (type) {
            case 'road':
                this.isRoad = true;
                color = 0x808071

                //create cars 
                this.cars = [];
                this.lastSpotLight = new THREE.SpotLight();
                this.hasCrashed = false;
                this.carSpeed = THREE.MathUtils.randFloat(-55,-15);

                //add cars to this group 
                for (let i = 0; i < 4; i++) {
                    let car = new Car(new THREE.Color(Math.random(), Math.random(), Math.random()), this.carSpeed);
                    car.start();
                    car.translateY(3.85);
                    car.position.z = -i * 150 + THREE.MathUtils.randInt(100, 150)
                    this.cars.push(car);
                    this.add(car);
                }
                break;
            case 'grass':
                this.isGrass = true;
                color = 0x228B22;
                break;
        }
        
        const material = new THREE.MeshPhongMaterial({ color });

        // Create a box geometry for the lane
        const geometry = new THREE.BoxGeometry(width, 0.1, length);
        const laneMesh = new THREE.Mesh(geometry, material);

        // Position the lane geometry
        laneMesh.receiveShadow = true;

        // Add the lane to the group
        this.add(laneMesh);
    }

    update(delta, user) {
        if ( this.type == 'grass') {
            //nothing to update return
            return;
        }


        for (let car of this.cars) {
            this.updateCar(car, delta, user);
        }
    }

    updateCar(car, delta, user) {
        
        car.update(delta);

        if (car.position.z < -300) {
            car.position.z = 300
        }

        //if car is in the same "lane" as user turn on headlight's shadows and turn off headlight of last car 
            //this keeps the number of lights casting shadows low 
        //avoiding turning the same light on multiple times 
        
        if (false && car.spotLight.id != this.lastSpotLight.id && car.position.z >= user.position.z - 5) {

            this.lastSpotLight.castShadow = false;
            car.spotLight.castShadow = true;

            this.lastSpotLight = car.spotLight;
        }
        
        
        //collision detection is broken right now 
        if (car.boundingBox.containsPoint(user.position) && user.position.x != 0&& user.position.z <= car.position.z + 12 && user.position.z >= car.position.z - 11 ) {
            if (this.hasCrashed) {
                return;
            }
            
            console.warn("car hit player")
            user.kill();
            this.hasCrashed = true;
        }
    }
}