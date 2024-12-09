import * as THREE from 'three';

import Stats from "three/examples/jsm/libs/stats.module.js";

import Oracle from './Oracle.js';
import CustomUser from './CustomUser.js';
import Nachos from './Nachos.js';
import UserScene from './UserScene';
import ObjectViewerScene from "./ObjectViewerScene";
import Car from './vehicles/car';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const renderer = new THREE.WebGLRenderer({ canvas: myCanvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

//stats for fps counter
const stats = new Stats()
//stats.showPanel(1) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

//clock for delta time 
const clock = new THREE.Clock();

//keep track of which scene we are currently in 
let hasSwitched = false;

// Create a new UserScene
let scene = new UserScene(renderer);
var user = new CustomUser();

var userControls = new OrbitControls(scene.camera, renderer.domElement);
userControls.maxPolarAngle = Math.PI * 1.25 / 2;
userControls.autoRotate = false;
userControls.autoRotateSpeed = Math.PI;

var customUser = user;

scene.add(user);

var rotate = false;

//create scene with objects for testing 
let objScene =  new ObjectViewerScene(renderer);

//variables used in controlling movement 
let farest = 0; //farest we have gone so far 
let jumpSize = 30; //size of each "jump" of the player 


// hold objects to update, all object MUST have an update function 
let objToUpdate = [];

//create cars
//@NOTE we will need to replace this with an object pool I just wanted to check logic 
for (let i = 0; i < 25; i++) {
    let car = new Car( new THREE.Color(Math.random(), Math.random(), Math.random()));
    objScene.add(car);
    car.position.x = -i * jumpSize;
    car.position.z = THREE.MathUtils.randFloat(50, 150);
    car.start();
    objToUpdate.push(car);
}

//last car head light we enabled 
let lastSpotLight = new THREE.SpotLight();

function updateCar(obj) {
    if (!hasSwitched) {
        return;
    }
    //if car is in the same "lane" as user turn on headlight's shadows and turn off headlight of last car 
    //this keeps the number of lights casting shadows low 

   if ( obj.position.x - user.position.x === 0 ) {
        //avoiding turning the same light on multiple times 
        if (obj.spotLight.id != lastSpotLight.id) {
            console.log("Turning on car light at pos: ", obj.position, " player pos", user.position);

            lastSpotLight.castShadow = false;
            obj.spotLight.castShadow = true;

            lastSpotLight = obj.spotLight;
        }
        
        //console.log(obj.isIntersecting(user.boundingBox))

        if (obj.isIntersecting(user.boundingBox)) {
            console.warn("car hit player")
        }
    }
}
// Add the scene to the document
function animate() {
    stats.begin();
    requestAnimationFrame(animate);

    //check if we have switched scenes 
    if (!hasSwitched) {

        if (user instanceof CustomUser) {
            customUser = user;
        }

        userControls.update();
    }


    //update each of our objects by delta 
    let delta = clock.getDelta();

    for (let obj of objToUpdate) {
        obj.update(delta);

        if (obj.isCar) {
            updateCar(obj);
        }
    }

    renderer.render(scene, scene.camera);    

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
const play = document.getElementById("play");

// These are the default values for the user
var curColorBody = 0xff0000;
var curColorHead = 0xff0000;
var shinynessHead = 0;
var shinynessBody = 0;
var emissiveHead = false;
var emissiveBody = false;

/**
 * This function switches the scene when the user clicks the play button
 */
play.addEventListener("click", function() {
    if (hasSwitched) {
        return;
    }

    console.log("Going to next scene ");

    // Hide CSS elements
    document.getElementById("container").style.display = "none";
    //set user
    //user = scene.user;

    //add user to new scene 
    objScene.add(user);
    user.translateZ(-20);

    //switch scene 
    scene = objScene;
    
    user.setBoundingBox();
    
    hasSwitched = true;
});

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
            user.bodyMesh.material.shininess = 1000;
            user.bodyMesh.material.specular = new THREE.Color(0xffd700);
            user.bodyMesh.material.color = new THREE.Color(0xffd700);
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
        //move forwards 
        case "w":
        case "ArrowUp":
            if (!hasSwitched) {
                return;
            }

            user.translateX(-jumpSize); 
            
            //only move camera forward when player is at a new farest x
            if (user.position.x - jumpSize < farest) {
                objScene.camera.position.x -= jumpSize
                farest = user.position.x - jumpSize;
            }

            break;
        //move backwards
        case "s":
        case "ArrowDown":
            if (!hasSwitched) {
                return;
            }

            user.translateX(jumpSize);
            break;
        
        //switch scenes - note we will probably replace this key with a button later
        case "Enter": 
            // if (hasSwitched) {
            //     return;
            // }

            // console.log("Going to next scene ");

            // // Hide CSS elements
            // document.getElementById("container").style.display = "none";
            // //set user
            // //user = scene.user;

            // //add user to new scene 
            // objScene.add(user);
            // user.translateZ(-20);

            // //switch scene 
            // scene = objScene;
            
            // user.setBoundingBox();
            
            // hasSwitched = true;
            break;
        case 'r':
            userControls.autoRotate = !userControls.autoRotate;
            break;
    }
});