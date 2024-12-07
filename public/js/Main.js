import * as THREE from 'three';
import UserScene from './UserScene';
import ObjectViewerScene from "./ObjectViewerScene";
import Car from './vehicles/car';

const renderer = new THREE.WebGLRenderer({ canvas: myCanvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

const clock = new THREE.Clock();

let hasSwitched = false;

// Create a new UserScene
let scene = new UserScene(renderer);

let objScene =  new ObjectViewerScene(renderer);

let user;
let farest = 0;
let jumpSize = 30;

// hold objects to update, all object MUST have an update function 
let objToUpdate = [];

/*
let testObj = new Exhaust();
scene.add(testObj);
testObj.start();
objToUpdate.push(testObj);
*/

for (let i = 0; i < 50; i++) {
    let car = new Car( new THREE.Color(Math.random(), Math.random(), Math.random()));
    objScene.add(car);
    car.position.x = -i * jumpSize;
    car.position.z = THREE.MathUtils.randFloat(0, 100);
    car.start();
    objToUpdate.push(car);
}


let lastSpotLight = new THREE.SpotLight();

// Add the scene to the document
function animate() {
    requestAnimationFrame(animate);
    if (!hasSwitched) {
        scene.controls.update();
    }
    renderer.render(scene, scene.camera);
    
    let delta = clock.getDelta();
    for (let obj of objToUpdate) {
        obj.update(delta);

        if (obj.isCar) {
            if (!hasSwitched) {
                return;
            }

           if (obj.position.x - user.position.x === 0 && obj.spotLight.id != lastSpotLight.id) {
            console.log("Turning on car light at pos: ", obj.position, " player pos", user.position);

            lastSpotLight.castShadow = false;
            obj.spotLight.castShadow = true;

            lastSpotLight = obj.spotLight;
            }
        }
    }
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
        case "w":
        case "ArrowUp":
            if (!hasSwitched) {
                return;
            }

            user.translateX(-jumpSize); 

            if (user.position.x - jumpSize < farest) {
                objScene.camera.position.x -= jumpSize
                farest = user.position.x - jumpSize;
            }

            break;
        case "s":
        case "ArrowDown":
            if (!hasSwitched) {
                return;
            }

            user.translateX(jumpSize);
            break;

        case "Enter": 
            if (hasSwitched) {
                return;
            }

            console.log("Going to next scene ");

            // Hide CSS elements
            document.getElementById("container").style.display = "none";
            user = scene.user;

            scene = objScene;

            //switch scene
            //below is my scene to test objects created 
            user.translateZ(-20);
            objScene.add(user);

            hasSwitched = true;
            break;
    }
});