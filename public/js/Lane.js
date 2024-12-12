import * as THREE from 'three';
import Car from './vehicles/car.js';

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

        const loadManager = new THREE.LoadingManager () ;
        const loader = new THREE.TextureLoader( loadManager );
        
        let material;

        switch (type) {
            case 'road':
                this.isRoad = true;
                let roadText = loader.load("/textures/Road007_1K-PNG_Color.png")
                let roadGLText = loader.load("/textures/Road007_1K-PNG_NormalGL.png")

                material = new THREE.MeshPhongMaterial({color: 0x808071, map: roadText, normalMap: roadGLText });
                //create cars 
                this.cars = [];
                this.isCastingShadows = false;
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
                    car.spotLight.castShadow = true;
                    this.isCastingShadows = true;
                }
                break;
            case 'grass':

                this.isGrass = true;
                let grassText = loader.load("/textures/Ground037_1K-PNG_Color.png")
                grassText.wrapS = THREE.MirroredRepeatWrapping
                grassText.wrapT = THREE.MirroredRepeatWrapping
                let grassGLText = loader.load("/textures/Ground037_1K-PNG_NormalGL.png")
                material = new THREE.MeshPhongMaterial({color: 0x228B22, map: grassText, normalMap: grassGLText});
                break;
        }
        
        

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

        if (this.position.distanceTo(user.position) <= 30) {
            if (!this.isCastingShadows ) {
                for (let car of this.cars) {
                    console.log("turning on spotlight");
                    car.spotLight.castShadow = true;
                }
                this.isCastingShadows = true;
            }
        }
        else if (this.isCastingShadows) {
            for (let car of this.cars) {
                console.log("turning off spotlight");
                car.spotLight.castShadow = false
                this.isCastingShadows = false;
            }
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

        //collision detection is broken right now 
        if (car.boundingBox.containsPoint(user.position) && user.position.x != 0 && user.position.z <= car.position.z + 5 && user.position.z >= car.position.z - 11 ) {
            if (this.hasCrashed) {
                return;
            }
            
            console.warn("car hit player")
            user.kill();
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

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
