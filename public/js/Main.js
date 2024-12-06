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
var user = scene.user;

// Add the scene to the document
function animate() {
    stats.begin();

    requestAnimationFrame(animate);
    scene.controls.update();
    renderer.render(scene, scene.camera);

    stats.end();
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
const texturePickerBody = document.getElementById("texturePickerBody");
const texturePickerHead = document.getElementById("texturePickerHead");
const shinySliderHead = document.getElementById("shinySliderHead");
const shinySliderBody = document.getElementById("shinySliderBody");
const emissiveButtonHead = document.getElementById("emessiveHead");
const emissiveButtonBody = document.getElementById("emessiveBody");
const presetSelector = document.getElementById("presetSelector");

var curColorBody = 0xff0000;
var curColorHead = 0xff0000;
var shinynessHead = 0;
var shinynessBody = 0;
var emissiveHead = false;
var emissiveBody = false;

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
            user = new CustomUser();
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

colorPickerBody.addEventListener("change", function() {
    curColorBody = this.value;
    user.bodySetMaterial(curColorBody);
    user.bodyMesh.material.emissive.set(curColorBody);
});

colorPickerHead.addEventListener("change", function() {
    curColorHead = this.value;
    user.headSetMaterial(curColorHead);
    user.headMesh.material.emissive.set(curColorHead);
});

shinySliderHead.addEventListener("change", function() {
    shinynessHead = this.value;
    user.headMesh.material.shininess = shinynessHead;
});

shinySliderBody.addEventListener("change", function() {
    shinynessBody = this.value;
    user.bodyMesh.material.shininess = shinynessBody;
});

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
            var color = user.bodyMesh.material.color;
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