import * as THREE from 'three';
import Exhaust from './exhaust';


export default class Car extends THREE.Group {
    constructor() {
        super();
        //create car body
        let texture = new THREE.TextureLoader().load("public/textures/Metal055A_1K-PNG_Color.png");
        let metalMap = new THREE.TextureLoader().load("public/textures/Metal055A_1K-PNG_Metalness.png");

        let body = new THREE.BoxGeometry(12, 7, 20);
        let carMat = new THREE.MeshPhongMaterial({ 
            color: 0x08080, reflectivity: 10, shininess: 10, map: texture, bumpMap: metalMap
        });
        this.bodyMesh = new THREE.Mesh(body, carMat);

        this.bodyMesh.castShadow = true;
        this.bodyMesh.receiveShadow = true;

        this.add(this.bodyMesh);
        
        //create cab
        let cab = new THREE.CapsuleGeometry( 5, 6, 8, 8 ); 
        let cabText = new THREE.TextureLoader().load("public/textures/Metal032_1K-PNG_Color.png");
        let metalCabMap = new THREE.TextureLoader().load("public/textures/Metal032_1K-PNG_Metalness.png");

        let cabMat = new THREE.MeshPhongMaterial({ 
            color: 0xFFFFFF, reflectivity: 25, shininess: 100, map: cabText, bumpMap: metalCabMap
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
        let wheelTexture = new THREE.TextureLoader().load("public/textures/Rubber004_1K-JPG_Color.jpg");
        let displacementTexture = new THREE.TextureLoader().load("public/textures/Rubber004_1K-JPG_Displacement.jpg");

        let wheelMat = new THREE.MeshPhongMaterial({
            color: 0x97a18d, map: wheelTexture, bumpMap: displacementTexture
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

        this.spotLightLeft = new THREE.SpotLight( 0xfcd268, 10000);
        this.spotLightLeft.position.set(headLightLeftMesh.position.x, headLightLeftMesh.position.y, headLightLeftMesh.position.z);
        this.spotLightLeft.castShadow = true;

        //create target, note may need to change this 
        let target = new THREE.Object3D;
        target.position.z = -1000;
        this.spotLightLeft.target = target;

        this.add(this.spotLightLeft);
        this.add(this.spotLightLeft.target);

        let spotLightHelper = new THREE.SpotLightHelper( this.spotLightLeft );
        this.add( spotLightHelper );


        let headLightRightMesh = headLightLeftMesh.clone();
        headLightRightMesh.translateX(6);

        this.add(headLightRightMesh);

        this.spotLightRight = this.spotLightLeft.clone();
        this.spotLightRight.position.x = (this.spotLightLeft.position.x + 6);

        this.add(this.spotLightRight);
        this.add(this.spotLightRight.target);

        let spotLightHelper2 = new THREE.SpotLightHelper( this.spotLightRight );
        this.add( spotLightHelper2 );

        this.translateY(2);
    }

    start() {
        this.exhaust.start();
    }

    update(deltaTime) {
        //update exhaust 
        this.exhaust.update(deltaTime)
        //rotate the wheels 
        for (let wheel of this.wheels) {
            wheel.rotateY(Math.PI/2 * deltaTime);
        }
        //this.translateZ(-3 * deltaTime);
    }
}