import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export default class UserScene extends THREE.Scene{
    /**
     * This is the scene for the user selections and being able to access the user afters
     * 
     * @param {THREE.WebGLRenderer} renderer is the renderer that will be used to render the scene
     */
    constructor(renderer) {
        super();

        // Create a camera, which determines what we'll see when we render the scene
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 300);

        this.camera.position.z = -20; //move camera right 
        this.camera.position.x = 35; 
        this.camera.position.y = 25; //move up

        this.camera.rotateY(Math.PI/2);
        this.camera.rotateX(-Math.PI/8)

        //this.camera.lookAt(new THREE.Vector3(0,5,0))


        //this.controls = new OrbitControls(this.camera, renderer.domElement);
       // this.controls.update();

        var a = new THREE.AmbientLight(0x707070, 10);
        this.add(a);

        const geometry = new THREE.PlaneGeometry( 1000, 1000 );
        const material = new THREE.MeshPhongMaterial( {color: 0x808071, side: THREE.DoubleSide} );
        const plane = new THREE.Mesh( geometry, material );

        plane.rotateX(Math.PI/2);
        plane.translateZ(3.85);
        plane.receiveShadow = true;

        this.add(plane);
        
    }
}
