import * as THREE from 'three';
import Exhaust from './exhaust.js';

/**
 * Car objects
 * 
 * @example
 * let car = new Car( new THREE.Color(Math.random(), Math.random(), Math.random()), THREE.MathUtils.randFloat(-25,-15););
 * scene.add(car)
 * 
 * //start particles effects
 * car.start();
 * 
 * animate() {
 *  //... animate code 
 *  car.update(delta);
 * }
 */
export default class Car extends THREE.Group {
    constructor(color, velocity) {
        super();
        //set car speed
        this.carSpeed = velocity;

        const loadManager = new THREE.LoadingManager () ;
        const loader = new THREE.TextureLoader( loadManager );
        this.isCar = true;
        //create car body
        let texture = loader.load("public/textures/Metal055A_1K-PNG_Color.png");
        let metalMap = loader.load("public/textures/Metal055A_1K-PNG_Metalness.png");

        let body = new THREE.BoxGeometry(12, 7, 20);
        let carMat = new THREE.MeshToonMaterial({ 
            color: color, map: texture, bumpMap: metalMap
        });
        this.bodyMesh = new THREE.Mesh(body, carMat);

        this.bodyMesh.castShadow = true;
        this.bodyMesh.receiveShadow = true;

        this.add(this.bodyMesh);
        
        //create cab
        let cab;
        if (Math.random() > 0.5) {
            cab = new THREE.CapsuleGeometry( 5, 6, 8, 8 ); 
        }
        else {
            cab = new THREE.BoxGeometry(11,12,7);
        }

        let cabText = loader.load("public/textures/Metal032_1K-PNG_Color.png");
        let metalCabMap = loader.load("public/textures/Metal032_1K-PNG_Metalness.png");

        let cabMat = new THREE.MeshToonMaterial({ 
            color: 0xFFFFFF,  map: cabText, bumpMap: metalCabMap
        });
        
        this.cabMesh = new THREE.Mesh(cab, cabMat);
        this.cabMesh.castShadow = true;
        this.cabMesh.receiveShadow = true;
        this.cabMesh.translateY(4);
        this.cabMesh.translateZ(2);
        this.cabMesh.rotateX(Math.PI/2);
        this.add(this.cabMesh);

        //add car exhaust
        this.exhaust = new Exhaust();
        this.exhaust.position.x = this.bodyMesh.position.x + 3
        this.exhaust.position.y = this.bodyMesh.position.y - 2;
        this.exhaust.position.z = this.bodyMesh.position.z + 10;

        this.add(this.exhaust);

        //add wheels to the car
        this.wheels = [];

        let wheel = new THREE.CylinderGeometry( 3, 3, 3, 32 ); 
        let wheelTexture = loader.load("public/textures/Rubber004_1K-JPG_Color.jpg");
        let displacementTexture = loader.load("public/textures/Rubber004_1K-JPG_Displacement.jpg");

        let wheelMat = new THREE.MeshToonMaterial({
            color: 0xd1d1d1, map: wheelTexture, bumpMap: displacementTexture
        })

        let wheelMesh = new THREE.Mesh(wheel, wheelMat);
        wheelMesh.castShadow = true;
        wheelMesh.receiveShadow = true;

        let backLeftWheel = wheelMesh.clone();
        backLeftWheel.rotateX(Math.PI/2)
        backLeftWheel.rotateZ(Math.PI/2)

        backLeftWheel.translateX(5);
        backLeftWheel.translateY(6);
        backLeftWheel.translateZ(3);


        let backRightWheel = backLeftWheel.clone();
        backRightWheel.translateY(-12)

        let frontLeftWheel = backLeftWheel.clone();
        frontLeftWheel.translateX(-11);

        let frontRightWheel = backRightWheel.clone();
        frontRightWheel.translateX(-11);

        this.wheels.push(frontLeftWheel);
        this.wheels.push(frontRightWheel);
        this.wheels.push(backLeftWheel);
        this.wheels.push(backRightWheel);
        
        for (let wheel of this.wheels) {
            this.add(wheel);
        }
        
        //add lights to the car 
        let headLight = new THREE.BoxGeometry(2, 2, 1);
        let material = new THREE.MeshBasicMaterial( {color: 0xF0FFFF} ); 

        let headLightLeftMesh = new THREE.Mesh(headLight, material);
        headLightLeftMesh.translateX(-3);
        headLightLeftMesh.translateY(0.5);
        headLightLeftMesh.translateZ(-10);

        this.add(headLightLeftMesh);

        let headLightRightMesh = headLightLeftMesh.clone();
        headLightRightMesh.translateX(6);

        //make bounding box before adding lights to avoid odd issues with helper meshes 
        this.boundingBox = new THREE.Box3().setFromCenterAndSize(this.position, new THREE.Vector3(18, 7 , 12));

        //const boxHelper = new THREE.Box3Helper(this.boundingBox, 0xff0000); // Red color
        //this.add(boxHelper);


        this.add(headLightRightMesh);
        this.translateY(2);

        this.spotLight = new THREE.SpotLight( 0xffa530, 10000, 150, Math.PI/5);
        this.spotLight.position.set(0, headLightLeftMesh.position.y - 2, headLightLeftMesh.position.z - 0.75);

        //create target, note may need to change this 
        let target = new THREE.Object3D;
        target.position.z = -300;
        this.spotLight.target = target;

        this.add(this.spotLight);
        this.add(this.spotLight.target);

        //let spotLightHelper = new THREE.SpotLightHelper( this.spotLight );
        //this.add( spotLightHelper );

    }

    /**
     * Start particle effects of exhaust
     */
    start() {
        this.exhaust.start();
    }

    /**
     * Update car - Moves forward, rotate wheels and update exhaust particles 
     * @param {Int} deltaTime Time since last animation frame to update object
     */
    update(deltaTime) {
        //update exhaust 
        this.exhaust.update(deltaTime)
        //rotate the wheels 
        for (let wheel of this.wheels) {
            wheel.rotateY(Math.PI/2 * deltaTime);
        }
        //move forward
        this.translateZ( this.carSpeed * deltaTime );

        this.boundingBox = new THREE.Box3().setFromObject(this);
    }

    /**
     * Check if a bounding box intersect's this car's bounding box 
     * @param {THREE.Box3} targetBoundingBox 
     * @returns true if intersecting false otherwise
     */
    isIntersecting(targetBoundingBox) {
        return this.boundingBox.intersectsBox(targetBoundingBox);
    }
}