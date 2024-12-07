import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import CustomUser from './CustomUser.js';
import Oracle from './Oracle.js';

export default class UserScene extends THREE.Scene{
    /**
     * This is the scene for the user selections and being able to access the user afters
     * 
     * @param {THREE.WebGLRenderer} renderer is the renderer that will be used to render the scene
     */
    constructor(renderer) {
        super();

        // Create a camera, which determines what we'll see when we render the scene
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 16;
        this.camera.position.y = 4;

        // Add the orbit controls to the camera
        this.controls = new OrbitControls(this.camera, renderer.domElement);
        this.controls.enablePan = false;
        this.controls.enableZoom = false;
        this.controls.autoRotate = false;
        this.controls.update();

        // Add the directional light to the scene
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1).normalize();
        light.castShadow = true;
        light.shadow.mapSize.width = 512;
        light.shadow.mapSize.height = 512;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 500;
        light.shadow.camera.top = 10;
        light.shadow.camera.bottom = -10;
        light.shadow.camera.left = -10;
        light.shadow.camera.right = 10;
        this.add(light);

        // Add the ambient light to the scene
        var a = new THREE.AmbientLight(0x909090, 1);
        this.add(a);

        // Adding the surroundings
        const surroundings = this.createSurroundings();
        this.add(surroundings);
    }
    
    /**
     * This function creates the surroundings for the user scene
     * 
     * @returns {THREE.Group} the group containing the surroundings
     */
    createSurroundings() {
        const group = new THREE.Group();

        // Create the pedestal
        const pedestalGeometry = new THREE.CylinderGeometry(4, 4, 1, 32);
        const pedestalMaterial = new THREE.MeshPhongMaterial({color: 0x8B4513});
        const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
        pedestal.receiveShadow = true;
        pedestal.castShadow = true;
        pedestal.position.y = -6.5;
        group.add(pedestal);

        return group;
    }

}
