import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import User from './User.js';

export default class UserScene extends THREE.Scene{
    constructor(renderer) {
        super();

        // Create a camera, which determines what we'll see when we render the scene
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 8;
        this.camera.position.y = 2;

        

        this.controls = new OrbitControls(this.camera, renderer.domElement);
        this.controls.enablePan = false;
        this.controls.enableZoom = false;
        this.controls.autoRotate = true;
        this.controls.update();

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

        var a = new THREE.AmbientLight(0x707070, 1);
        this.add(a);

        this.user = new User();
        this.add(this.user);

    }
    

}
