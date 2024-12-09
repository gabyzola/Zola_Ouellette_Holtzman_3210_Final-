import * as THREE from 'three';
import User from './User.js';

export default class Nachos extends User {
    /**
     * This is the constructor for the Users character
     */
    constructor() {
        super();
        super.setHead(this.createHead());
        super.setBody(this.createBody());

        // Tetrahedran geometry that will have stezules face on them in some way
    }

    /**
     * This function creates the head of the character
     * 
     * @returns {THREE.Mesh} the mesh of the head
     */
    createHead() {
        const geometry = new THREE.SphereGeometry(2, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 4;
        return mesh;
    }

    /**
     * This function creates the body of the character
     * 
     * @returns {THREE.Mesh} the mesh of the body
     */
    createBody() {
        const geometry = new THREE.CylinderGeometry(2.5, 3, 8, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -2;
        return mesh;
    }

}