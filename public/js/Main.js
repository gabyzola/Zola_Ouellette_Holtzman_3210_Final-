import * as THREE from 'three';
import UserScene from './UserScene.js';
import Stats from 'https://unpkg.com/three@0.141.0/examples/jsm/libs/stats.module.js';
import Oracle from './Oracle.js';
import CustomUser from './CustomUser.js';
import Nachos from './Nachos.js';

const renderer = new THREE.WebGLRenderer({ canvas: myCanvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const stats = new Stats();
document.body.appendChild(stats.dom);

// Create a new UserScene
const scene = new UserScene(renderer);
var user = new CustomUser();
var customUser = user;

scene.add(user);


// Add the scene to the document
function animate() {
    stats.begin();

    requestAnimationFrame(animate);
    scene.controls.update();
    renderer.render(scene, scene.camera);
    if (user instanceof CustomUser) {
        customUser = user;
    }
    stats.end();
}
animate();

/**
 * This function resizes the renderer when the window is resized
 */
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene.camera.aspect = window.innerWidth / window.innerHeight;
    scene.camera.updateProjectionMatrix();
});

// Get the elements from the HTML
const colorPickerBody = document.getElementById("colorPickerBody");
const colorPickerHead = document.getElementById("colorPickerHead");
const texturePickerBody = document.getElementById("texturePickerBody");
const texturePickerHead = document.getElementById("texturePickerHead");
const shinySliderHead = document.getElementById("shinySliderHead");
const shinySliderBody = document.getElementById("shinySliderBody");
const emissiveButtonHead = document.getElementById("emessiveHead");
const emissiveButtonBody = document.getElementById("emessiveBody");
const presetSelector = document.getElementById("presetSelector");

// These are the default values for the user
var curColorBody = 0xff0000;
var curColorHead = 0xff0000;
var shinynessHead = 0;
var shinynessBody = 0;
var emissiveHead = false;
var emissiveBody = false;

/**
 * This function changes the preset of the user based on what the user selects
 */
presetSelector.addEventListener("change", function() {
    var preset = this.value;
    switch (preset) {
        case "oracle":
            document.getElementById("noPresets").style.display = "none";
            scene.remove(user);
            user = new Oracle();
            scene.add(user);
        break;
        case "none":
            document.getElementById("noPresets").style.display = "flex";
            scene.remove(user);
            user = customUser;
            scene.add(user);
        break;
        case "nachos":
            document.getElementById("noPresets").style.display = "none";
            scene.remove(user);
            user = new Nachos();
            scene.add(user);
        break;
    }
});

/**
 * This function changes the color of the head based on what the user selects
 */
emissiveButtonHead.addEventListener("click", function() {
    emissiveHead = !emissiveHead;
    if (emissiveHead) {
        user.headMesh.material.emissive.set(new THREE.Color(curColorHead));
        user.headMesh.material.emissiveIntensity = 0.5;
    } else {
        user.headMesh.material.emissive.set(new THREE.Color(0x000000));
        user.headMesh.material.emissiveIntensity = 0;
    }
});

/**
 * This function changes the color of the head based on what the user selects
*/
emissiveButtonBody.addEventListener("click", function() {
    emissiveBody = !emissiveBody;
    if (emissiveBody) {
        user.bodyMesh.material.emissive.set(new THREE.Color(curColorBody));
        user.bodyMesh.material.emissiveIntensity = 0.5;
    } else {
        user.bodyMesh.material.emissive.set(new THREE.Color(0x000000));
        user.bodyMesh.material.emissiveIntensity = 0;
    }
});

/**
 * This function changes the color of the body based on what the user selects
 */
colorPickerBody.addEventListener("change", function() {
    curColorBody = this.value;
    user.bodySetMaterial(curColorBody);
    if (emissiveBody) {
        user.bodyMesh.material.emissive.set(curColorBody);
    }
});

/**
 * This function changes the color of the head based on what the user selects
 */
colorPickerHead.addEventListener("change", function() {
    curColorHead = this.value;
    user.headSetMaterial(curColorHead);
    if (emissiveHead) {
        user.headMesh.material.emissive.set(curColorHead);
    }
});

/**
 * This function changes the shinyness of the head based on what the user selects
 */
shinySliderHead.addEventListener("change", function() {
    shinynessHead = this.value;
    user.headMesh.material.shininess = shinynessHead;
});

/**
 * This function changes the shinyness of the body based on what the user selects
 */
shinySliderBody.addEventListener("change", function() {
    shinynessBody = this.value;
    user.bodyMesh.material.shininess = shinynessBody;
});

/**
 * This function changes the texture of the body based on what the user selects
 */
texturePickerBody.addEventListener("change", function() {
    const selectedTexture = this.value;
    switch (selectedTexture) {
        case "fabric":
            var color = user.bodyMesh.material.color;
            user.bodySetTexture("./public/texture/FabricTexture.png", "./public/texture/FabricTextureNormal.png");
            user.bodyMesh.material.color = color;
            user.bodyMesh.material.shininess = shinynessBody;
        break;
        case "metal":
            user.bodySetTexture("./public/texture/MetalTexture.png", "./public/texture/MetalTextureNormal.png");
            user.bodyMesh.material.shininess = 1000;
            user.bodyMesh.material.specular = new THREE.Color(0xffffff);
        break;
        case "plastic":
            user.bodySetTexture("./public/texture/PlasticTexture.png", "./public/texture/PlasticTextureNormal.png");
            user.bodyMesh.material.opacity = 0.75;
            user.bodyMesh.material.shininess = shinynessBody;
            user.bodyMesh.material.transparent = true;
        break;
        case "wood":
            user.bodySetTexture("./public/texture/WoodTexture.png", "./public/texture/WoodTextureNormal.png");
            user.bodyMesh.material.shininess = shinynessBody;
        break;
        case "gold":
            user.bodySetTexture("./public/texture/GoldTexture.png", "./public/texture/GoldTextureNormal.png");
            user.headMesh.material.shininess = 1000;
            user.headMesh.material.specular = new THREE.Color(0xffd700);
            user.headMesh.material.color = new THREE.Color(0xffd700);
            user.bodyMesh.material.shininess = shinynessBody;
        break;
        case "none":
            user.bodyMesh.material = new THREE.MeshPhongMaterial({ color: curColorBody });
            user.bodyMesh.material.shininess = shinynessBody;

        break;
    }
});

/**
 * This function changes the texture of the head based on what the user selects
 */
texturePickerHead.addEventListener("change", function() {
    const selectedTexture = this.value;
    switch (selectedTexture) {
        case "gold":
            user.headSetTexture("./public/texture/GoldTexture.png", "./public/texture/GoldTextureNormal.png");
            user.headMesh.material.shininess = 1000;
            user.headMesh.material.specular = new THREE.Color(0xffd700);
            user.headMesh.material.color = new THREE.Color(0xffd700);
        break;
        case "fabric":
            var color = user.headMesh.material.color;
            user.headSetTexture("./public/texture/FabricTexture.png", "./public/texture/FabricTextureNormal.png");
            user.headMesh.material.color = color;
            user.headMesh.material.shininess = shinynessHead
        break;
        case "metal":
            user.headSetTexture("./public/texture/MetalTexture.png", "./public/texture/MetalTextureNormal.png");
            user.headMesh.material.shininess = 1000;
            user.headMesh.material.specular = new THREE.Color(0xffffff);
            user.headMesh.material.shininess = shinynessHead;
        break;
        case "plastic":
            user.headSetTexture("./public/texture/PlasticTexture.png", "./public/texture/PlasticTextureNormal.png");
            user.headMesh.material.opacity = 0.75;
            user.headMesh.material.transparent = true;
        break;
        case "wood":
            user.headSetTexture("./public/texture/WoodTexture.png", "./public/texture/WoodTextureNormal.png");
            user.headMesh.material.shininess = shinynessHead
        break;
        case "none":
            user.headMesh.material = new THREE.MeshPhongMaterial({ color: curColorHead });
            user.headMesh.material.shininess = shinynessHead
        break;
    }
});

// Add a keyboard short cuts
document.addEventListener("keydown", function(e) {
    switch (e.key) {
        case 'r':
            if (scene instanceof UserScene) {
                scene.controls.autoRotate = !scene.controls.autoRotate;
            }
    }
});