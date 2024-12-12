import * as THREE from 'three';
import User from './User.js';

export default class Tutor extends User {
    /**
     * This is the constructor for the Tutor character
     */
    constructor() {
        super();
        this.setHead(this.createHead());
        this.setBody(this.createBody());
    }

    /**
     * This function creates the head of the character
     * 
     * @returns {THREE.Group} the group of the head
     */
    createHead() {
        const group = new THREE.Group();

        const geometry = new THREE.SphereGeometry(2, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0xffdbac });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 4;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        group.add(mesh);

        group.add(this.createGlasses());

        return group;
    }

    /**
     * This function creates the body of the character
     * 
     * @returns {THREE.Mesh} the mesh of the body
     */
    createBody() {
        const loader = new THREE.TextureLoader();
        const geometry = new THREE.CylinderGeometry(2.5, 3, 8, 32);
        const material = [
            new THREE.MeshPhongMaterial({ map: loader.load('public/textures/bugs-in-the-code.jpg') }),
            new THREE.MeshPhongMaterial({ color: 0xcbbfb7 }),
            new THREE.MeshPhongMaterial({ color: 0xcbbfb7 }),
        ];
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -2;
        mesh.rotateY(-Math.PI/2);
        return mesh;
    }

    /**
     * This function creates the glasses of the character
     * 
     * @returns {THREE.Group} the group of the glasses
     */
    createGlasses() {
        const group = new THREE.Group();

        const geometryLense1 = new THREE.TorusGeometry(0.75,0.05,32,32);
        const materialLense1 = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const meshLense1 = new THREE.Mesh(geometryLense1, materialLense1);
        meshLense1.position.y = 4.5;
        meshLense1.position.z = 2;
        meshLense1.position.x = 1;
        meshLense1.castShadow = true;
        meshLense1.receiveShadow = true;
        group.add(meshLense1);

        const geometryLense2 = new THREE.TorusGeometry(0.75,0.05,32,32);
        const materialLense2 = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const meshLense2 = new THREE.Mesh(geometryLense2, materialLense2);
        meshLense2.position.y = 4.5;
        meshLense2.position.z = 2;
        meshLense2.position.x = -1;
        meshLense2.castShadow = true;
        meshLense2.receiveShadow = true;
        group.add(meshLense2);

        const geometryBridge = new THREE.CylinderGeometry(0.05,0.05,0.5,32);
        const materialBridge = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const meshBridge = new THREE.Mesh(geometryBridge, materialBridge);
        meshBridge.position.y = 4.5;
        meshBridge.position.z = 2;
        meshBridge.rotateZ(Math.PI/2);
        meshBridge.castShadow = true;
        meshBridge.receiveShadow = true;
        group.add(meshBridge);

        const geometryFrame1 = new THREE.CylinderGeometry(0.05,0.05,2.5,32);
        const materialFrame1 = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const meshFrame1 = new THREE.Mesh(geometryFrame1, materialFrame1);
        meshFrame1.position.y = 4.5;
        meshFrame1.position.z = .75;
        meshFrame1.position.x = 1.75;
        meshFrame1.rotateX(Math.PI/2);
        meshFrame1.castShadow = true;
        meshFrame1.receiveShadow = true;
        group.add(meshFrame1);

        const geometryFrame2 = new THREE.CylinderGeometry(0.05,0.05,2.5,32);
        const materialFrame2 = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const meshFrame2 = new THREE.Mesh(geometryFrame2, materialFrame2);
        meshFrame2.position.y = 4.5;
        meshFrame2.position.z = .75;
        meshFrame2.position.x = -1.75;
        meshFrame2.rotateX(Math.PI/2);
        meshFrame2.castShadow = true;
        meshFrame2.receiveShadow = true;
        group.add(meshFrame2);

        return group;
    }
}