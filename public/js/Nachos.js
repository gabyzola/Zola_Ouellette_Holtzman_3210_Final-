import * as THREE from 'three';
import User from './User.js';

export default class Nachos extends User {
    constructor() {
        super();
        super.setHead(this.createHead());
        super.setBody(this.createBody());

        // Tetrahedran geometry that will have stezules face on them in some way
    }

    createHead() {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 2;
        return mesh;
    }

    createBody() {
        const geometry = new THREE.CylinderGeometry(1.25, 1.5, 4, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -1;
        return mesh;
    }

}