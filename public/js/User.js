import * as THREE from 'three';

export default class User extends THREE.Group {
    constructor() {
        super();
        this.headMesh = null;
        this.bodyMesh = null;

        
    }

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

    setBody(bodyMesh) {
        this.bodyMesh = bodyMesh;
        bodyMesh.receiveShadow = true;
        bodyMesh.castShadow = true;
        this.add(this.bodyMesh);

        
    }

    setBoundingBox() {
        this.boundingBox = new THREE.Box3().setFromObject(this);
        console.log(this.boundingBox);
        const boxHelper = new THREE.BoxHelper(this, 0xff0000); // Red color
        this.add(boxHelper);
    }

}