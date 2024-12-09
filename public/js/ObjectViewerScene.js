import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import Lane from './Lane.js';

export default class UserScene extends THREE.Scene {
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
        this.camera.position.x = 35;
        this.camera.position.y = 25; //move up

        this.camera.rotateY(Math.PI / 2);
        this.camera.rotateX(-Math.PI / 8)

        //this.camera.lookAt(new THREE.Vector3(0,5,0))


        //this.controls = new OrbitControls(this.camera, renderer.domElement);
        // this.controls.update();

        var a = new THREE.AmbientLight(0x707070, 10);
        this.add(a);

        const geometry = new THREE.PlaneGeometry(100000, 1000);
        const material = new THREE.MeshPhongMaterial({ color: 0x808071, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(geometry, material);

        plane.rotateX(Math.PI / 2);
        plane.translateZ(3.85);
        plane.receiveShadow = true;

        this.add(plane);

    }
     /**
     * Create alternating lanes of road and grass
     */
     createLanes() {
        const laneWidth = 5;
        const laneLength = 100;
        const numLanes = 10;

        for (let i = 0; i < numLanes; i++) {
            const type = i % 2 === 0 ? 'road' : 'grass'; 
            const lane = new Lane(laneWidth, laneLength, type);

            // Position the lane based on its index
            lane.position.z = -laneWidth * i;
            lane.position.x = 0;

            this.add(lane);
        }
    }
}
