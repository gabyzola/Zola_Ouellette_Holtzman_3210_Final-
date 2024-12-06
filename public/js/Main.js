import * as THREE from 'three';
import UserScene from './UserScene';
import ObjectViewerScene from "./ObjectViewerScene";

const renderer = new THREE.WebGLRenderer({ canvas: myCanvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a new UserScene
let scene = new UserScene(renderer);

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

// Add a keyboard short cuts
document.addEventListener("keydown", function(e) {
    switch (e.key) {
    case "Enter": 
        console.log("Going to next scene ");

        // Hide CSS elements
        document.getElementById("container").style.display = "none";

        //switch scene
        //below is my scene to test objects created 
        scene = new ObjectViewerScene(renderer);
        
        break;
    }
});