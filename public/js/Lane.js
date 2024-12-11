import * as THREE from 'three';
import Car from './vehicles/car';

export default class Lane extends THREE.Group {
    /**
     * Represents a lane in the scene.
     * 
     * @param {number} width Width of the lane.
     * @param {number} length Length of the lane.
     * @param {string} type Type of the lane ('road' or 'grass').
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
                for (let i = 0; i < 5; i++) {
                    let car = new Car(new THREE.Color(Math.random(), Math.random(), Math.random()), this.carSpeed);
                    car.start();
                    car.translateY(3.85);
                    car.position.z = -i * 40 + THREE.MathUtils.randInt(25, 50)
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
            car.update(delta);

            if (car.position.z < -150) {
                car.position.z = 150
            }

            if (car.position.x - user.position.x == 0) {
               continue;
            }

            //user.setBoundingBox();
            //if car is in the same "lane" as user turn on headlight's shadows and turn off headlight of last car 
             //this keeps the number of lights casting shadows low 
            //avoiding turning the same light on multiple times 
            if (car.spotLight.id != this.lastSpotLight.id) {
    
                this.lastSpotLight.castShadow = false;
                car.spotLight.castShadow = true;
    
                this.lastSpotLight = car.spotLight;
            }
    
            //collision detection is broken right now 
            if (false && car.isIntersecting(user.boundingBox) && !this.hasCrashed && (user.position.z <= car.position.z + 12)) {
                console.warn("car hit player")
                user.kill();
                //gameScene.playDeathAnimation();
                this.hasCrashed = true;
                
                
                this.sleep(2500).then(() => {
                    // CHAT GPT 
                    // Show custom Game Over modal
                    document.getElementById("game-over-modal").style.display = "flex";
                    document.getElementById("retry-button").addEventListener("click", function () {
                        // Handle game restart logic here 
                        location.reload();  
                    });
                });
            }
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}