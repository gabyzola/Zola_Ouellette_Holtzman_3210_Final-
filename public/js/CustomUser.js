import * as THREE from 'three';
import User from './User.js';

export default class CustomUser extends User {
    /**
     * This is the constructor for the Users character
     */
    constructor() {
        super();
        super.setHead(this.createHead());
        super.setBody(this.createBody());
    }

    createBody() {
        const geometry = new THREE.CylinderGeometry(1.25, 1.5, 4, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -1;
        return mesh;
    }

    createHead() {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 2;
        return mesh;
    }

    /**
     * This function sets the material of the body and head of the character
     * 
     * @param {STRING} color this is the color of the material
     */
    bodySetMaterial(color) {
        this.bodyMesh.material.color.set(color);
    }

    /**
     * This function sets the material of the body and head of the character
     * 
     * @param {STRING} path this is the path to the texture of choice
     * @param {STRING} normalPath this is the path to the normal map of the texture
     */
    bodySetTexture(path, normalPath) {
        var texture = new THREE.TextureLoader().load(path);
        var normal = new THREE.TextureLoader().load(normalPath);
        var material = new THREE.MeshPhongMaterial({ map: texture, normalMap: normal });
        this.bodyMesh.material = material;
    }   

    /**
     * This function sets the material of the head of the character
     * 
     * @param {STRING} color of choice
     */
    headSetMaterial(color) {
        this.headMesh.material.color.set(color);
    }

    /**
     * This function sets the texture of the head of the character
     * 
     * @param {STRING} path to to the texture of choice
     * @param {STRING} normalPath to the normal map of the texture
     */
    headSetTexture(path, normalPath) {
        var texture = new THREE.TextureLoader().load(path);
        var normal = new THREE.TextureLoader().load(normalPath);
        var material = new THREE.MeshPhongMaterial({ map: texture, normalMap: normal });
        this.headMesh.material = material
            
    }

}