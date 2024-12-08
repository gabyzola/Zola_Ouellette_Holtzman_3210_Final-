import * as THREE from 'three';

export default class User extends THREE.Group {
    constructor() {
        super();
        this.headMesh = null;
        this.bodyMesh = null;
    }

    setHead(headMesh) {
        this.headMesh = headMesh;
        this.add(this.headMesh);

        this.boundingBox = new THREE.Box3().setFromObject(this);
        console.log(this.boundingBox);
        
    }

    setBody(bodyMesh) {
        this.bodyMesh = bodyMesh;
        this.add(this.bodyMesh);
    }

    setBoundingBox() {
        this.boundingBox = new THREE.Box3().setFromObject(this);
        console.log(this.boundingBox);
        const boxHelper = new THREE.BoxHelper(this, 0xff0000); // Red color
        this.add(boxHelper);
    }

}