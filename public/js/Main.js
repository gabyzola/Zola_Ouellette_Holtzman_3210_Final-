import * as THREE from 'three';
import UserScene from './UserScene';
import ObjectViewerScene from "./ObjectViewerScene";
import Car from './vehicles/car';
import Stats from "three/examples/jsm/libs/stats.module.js";


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

//create scene with objects for testing 
let objScene =  new ObjectViewerScene(renderer);

//user
let user;

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
    car.position.z = THREE.MathUtils.randFloat(0, 100);
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
        scene.controls.update();
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

// Resize the renderer when the window is resized
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene.camera.aspect = window.innerWidth / window.innerHeight;
    scene.camera.updateProjectionMatrix();
});

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
            if (hasSwitched) {
                return;
            }

            console.log("Going to next scene ");

            // Hide CSS elements
            document.getElementById("container").style.display = "none";
            //set user
            user = scene.user;

            //add user to new scene 
            objScene.add(user);
            user.translateZ(-20);

            //switch scene 
            scene = objScene;
            
            user.setBoundingBox();
            
            hasSwitched = true;
            break;
    }
});