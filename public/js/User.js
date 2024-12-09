import * as THREE from 'three';

export default class User extends THREE.Group {
    /**
     * This is the constructor for the Users character
     */
    constructor() {
        super();
        this.headMesh = null;
        this.bodyMesh = null;

        
    }

    /**
     * Sets the head of the user
     * 
     * @param {THREE.Mesh or THREE.Group} headMesh 
     */
    setHead(headMesh) {
        this.headMesh = headMesh;
        this.headMesh.castShadow = true;
        this.headMesh.receiveShadow = true;
        
        this.add(this.headMesh);

        this.boundingBox = new THREE.Box3().setFromObject(this);
        console.log(this.boundingBox);

        this.receiveShadow = true;
        this.castShadow = true;
    }

    /**
     * Sets the body of the user
     * 
     * @param {THREE.Mesh or THREE.Group} bodyMesh 
     */
    setBody(bodyMesh) {
        this.bodyMesh = bodyMesh;
        bodyMesh.receiveShadow = true;
        bodyMesh.castShadow = true;
        this.add(this.bodyMesh);

        
    }

    /**
     * Sets the bounding box of the user
     */
    setBoundingBox() {
        this.boundingBox = new THREE.Box3().setFromObject(this);
        console.log(this.boundingBox);
        const boxHelper = new THREE.BoxHelper(this, 0xff0000); // Red color
        this.add(boxHelper);
    }

}