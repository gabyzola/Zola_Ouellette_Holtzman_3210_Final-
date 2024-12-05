import * as THREE from 'three';
import UserScene from './UserScene';

const renderer = new THREE.WebGLRenderer({ canvas: myCanvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a new UserScene
const scene = new UserScene(renderer);

// Add the scene to the document
function animate() {
    requestAnimationFrame(animate);
    scene.controls.update();
    renderer.render(scene, scene.camera);
}
animate();

// Resize the renderer when the window is resized
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene.camera.aspect = window.innerWidth / window.innerHeight;
    scene.camera.updateProjectionMatrix();
});

const colorPickerBody = document.getElementById("colorPickerBody");
const colorPickerHead = document.getElementById("colorPickerHead");

colorPickerBody.addEventListener("change", function() {
    const selectedColor = this.value;
    scene.user.bodySetMaterial(selectedColor);
});

colorPickerHead.addEventListener("change", function() {
    const selectedColor = this.value;
    scene.user.headSetMaterial(selectedColor);
});