import * as THREE from 'three';

export default class Lane extends THREE.Group {
    /**
     * Represents a lane in the scene.
     * 
     * @param {number} width Width of the lane.
     * @param {number} length Length of the lane.
     * @param {string} type Type of the lane ('road' or 'grass').
     */
    constructor(width, length, type) {
        super();

        this.width = width;
        this.length = length;
        this.type = type;
        this.road =false; 

        // Define the material based on type
        const color = type === 'road' ? 0x808071 : 0x228B22; 
        if (color==0x808071 ){
            this.road= true; 
        }
        
        const material = new THREE.MeshPhongMaterial({ color });

        // Create a box geometry for the lane
        const geometry = new THREE.BoxGeometry(width, 0.1, length);
        const laneMesh = new THREE.Mesh(geometry, material);

        // Position the lane geometry
        laneMesh.receiveShadow = true;

        // Add the lane to the group
        this.add(laneMesh);
    }
}