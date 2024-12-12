import * as THREE from 'three';
import User from './User.js';

export default class Nachos extends User {
    /**
     * This is the constructor for the Tutor character
     */
    constructor() {
        super();
        this.setHead(this.createHead());
        this.setBody(this.createBody());
    }

    createHead() {
        const group = new THREE.Group();

        const loader = new THREE.TextureLoader();
        const geometry = new THREE.CylinderGeometry(1.6, 1.6, 3.2, 32);
        const material = [
            new THREE.MeshPhongMaterial({ color: 0xffe2c6 }),
            new THREE.MeshPhongMaterial({ map: loader.load('public/textures/Nachos3.jpg') }),
            new THREE.MeshPhongMaterial({ color: 0xffe2c6 })
        ];
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.y = Math.PI * 1.5 / 3;
        mesh.rotation.x = Math.PI / 2;
        mesh.position.z = .6;
        mesh.position.y = 3.25;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        group.add(mesh);

        const hatGeometry = new THREE.CylinderGeometry(0.1,3.5,6,3);
        const hatMaterial = new THREE.MeshPhongMaterial({ map: loader.load('public/textures/NachosTexture.jpg') });
        const hat = new THREE.Mesh(hatGeometry, hatMaterial);
        hat.position.z = -1.6;
        hat.position.y = 5.8;
        hat.rotation.x = -Math.PI / 5;
        hat.castShadow = true;
        hat.receiveShadow = true;
        group.add(hat);

        return group;

    }

    /**
     * This function creates the body of the character
     * 
     * @returns {THREE.Mesh} the mesh of the body
     */
    createBody() {
        const geometry = new THREE.CylinderGeometry(2.5, 3, 8, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -2;
        return mesh;
    }

}