import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Lane from './Lane.js';


export default class ObjectViewerScene extends THREE.Scene{

    /**
     * This is the scene for the user selections and being able to access the user afters
     * 
     * @param {THREE.WebGLRenderer} renderer 
     */
    constructor(renderer) {
        super();

        // Create a camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 300);

        this.camera.position.z = -20; //move camera right 

        this.camera.position.x = 55; 
      
        this.camera.position.y = 25; //move up

        this.camera.rotateY(Math.PI / 2);
        this.camera.rotateX(-Math.PI / 8)

        var a = new THREE.AmbientLight(0x707070, 10);
        this.add(a);


        this.createLanes();

    }
     /**
     * Create alternating lanes of road and grass
     */
     createLanes() {
        const laneWidth = 30;
        const laneLength = 300;
        const numLanes = 10;

        for (let i = 0; i < numLanes; i++) {
            const type = Math.round(Math.random() +1) % 2 === 0 ? 'road' : 'grass'; 
            const lane = new Lane(laneWidth, laneLength, type);

            // Position the lane based on its index
            lane.position.x = -laneWidth * i;
            lane.position.y = -3.85

            this.add(lane);
            console.log(lane.road);
        }
    }
}
