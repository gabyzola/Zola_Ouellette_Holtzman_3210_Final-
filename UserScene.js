import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import User from './User.js';

// Create the scene
const scene = new THREE.Scene();

// Create a camera, which determines what we'll see when we render the scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer and attach it to our document
const renderer = new THREE.WebGLRenderer({canvas: myCanvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

var user = new User();
scene.add(user);

// Create a function to animate our scene
function animate() {

    controls.update();

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Resize the renderer when the window is resized
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});

// add a listerner for a key press
window.addEventListener('keypress', (event) => {
    if (event.key === 'a') {
        user.bodySetMaterial(new THREE.Color("blue"));
    }
});

const colorPickerBody = document.getElementById("colorPickerBody");

colorPickerBody.addEventListener("change", function() {
    const selectedColor = this.value;
    user.bodySetMaterial(selectedColor);
    console.log("Selected Color Body:", selectedColor); 
});

const colorPickerHead = document.getElementById("colorPickerHead");

colorPickerHead.addEventListener("change", function() {
    const selectedColor = this.value;
    user.headSetMaterial(selectedColor);
    console.log("Selected Color Head:", selectedColor); 
});