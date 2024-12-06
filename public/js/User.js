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
    }

    setBody(bodyMesh) {
        this.bodyMesh = bodyMesh;
        this.add(this.bodyMesh);
    }

}