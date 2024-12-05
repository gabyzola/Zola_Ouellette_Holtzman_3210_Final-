import * as THREE from 'three';

export default class User extends THREE.Group {
    /**
     * This is the constructor for the Users character
     */
    constructor() {
        super();

        // Sets the body and head of the character
        this.body = new THREE.CylinderGeometry(1.25, 1.5, 4, 32);
        var bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        this.head = new THREE.SphereGeometry(1, 32, 32);
        var headMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        this.bodyMesh = new THREE.Mesh(this.body, bodyMaterial);
        this.headMesh = new THREE.Mesh(this.head, headMaterial);

        this.bodyMesh.castShadow = true;
        this.bodyMesh.receiveShadow = true;
        this.headMesh.castShadow = true;
        this.headMesh.receiveShadow = true;

        this.headMesh.position.y = 2;
        this.bodyMesh.position.y = -1;

        this.add(this.bodyMesh);
        this.add(this.headMesh);
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
     */
    bodySetTexture(path) {
        var texture = new THREE.TextureLoader().load(path);
        var material = new THREE.MeshBasicMaterial({ map: texture });
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
     */
    headSetTexture(path) {
        var texture = new THREE.TextureLoader().load(path);
        var material = new THREE.MeshBasicMaterial({ map: texture });
        this.headMesh.material = material
            
    }

}