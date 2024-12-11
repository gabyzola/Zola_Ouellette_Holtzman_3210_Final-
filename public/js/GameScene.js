import * as THREE from 'three';
import Lane from './Lane.js';
import LaneObjectPool from './LaneObjectPool.js';


export default class Game extends THREE.Scene {

    /**
     * This is the scene for the user selections and being able to access the user afters
     * 
     * @param {THREE.WebGLRenderer} renderer 
     */
    constructor(renderer) {
        super();

        // Create a camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 300);

        this.camera.position.z = -20; //move camera right 

        this.camera.position.x = 55;

        this.camera.position.y = 25; //move up

        this.camera.rotateY(Math.PI / 2);
        this.camera.rotateX(-Math.PI / 8)

        var a = new THREE.AmbientLight(0x707070, 10);
        this.add(a);

        this.laneObjectPool= new LaneObjectPool(8, this); 
        //adds all lanes to scene by unpacking each element in array 
        this.add(...this.laneObjectPool.activeLanes)
        
        this.hasCrashed = false;

        this.jumpsize = 30;
        this.updateCameraAnimations();
    }

    /**
     * Updates scene - camera animations and lanes 
     * @param {float} delta Time since last frame
     * @param {User} user User in the game needed for lanes to update cars correctly
     */
    update(delta, user) {
        this.mixer.update(delta);
        this.laneObjectPool.update(delta,user);

        if (this.laneObjectPool.hasCrashed) {
            this.hasCrashed = true;
            this.playDeathAnimation();
        }
    }

    updateCameraAnimations() {
        this.mixer = new THREE.AnimationMixer(this.camera);

        let clip = this._createAnimationClip(
            [
                this.camera.position.x, this.camera.position.y, this.camera.position.z,
                this.camera.position.x - this.jumpsize / 2, this.camera.position.y, this.camera.position.z,
                this.camera.position.x - this.jumpsize, this.camera.position.y, this.camera.position.z,
            ]
        )

        //add clip to create clip
        this.moveForwardAnimation = this.mixer.clipAction(clip);

        //only loop once 
        this.moveForwardAnimation.loop = THREE.LoopOnce;
        this.moveForwardAnimation.clampWhenFinished = true;
    }

    playDeathAnimation() {
        this.moveForwardAnimation.stop();

        let clip = this._createAnimationClip(
            [
                this.camera.position.x, this.camera.position.y, this.camera.position.z,
                this.camera.position.x - 15, this.camera.position.y - 2, this.camera.position.z - 4,
                this.camera.position.x - 30, this.camera.position.y - 5, this.camera.position.z - 8,
            ],
            [
                this.camera.quaternion.x, this.camera.quaternion.y, this.camera.quaternion.z, this.camera.quaternion.w,
                this.camera.quaternion.x, -this.camera.quaternion.y / 8, -this.camera.quaternion.z / 4, this.camera.quaternion.w,
                this.camera.quaternion.x, -this.camera.quaternion.y / 4, -this.camera.quaternion.z / 8, this.camera.quaternion.w,
            ]
        )

        this.deathClip = this.mixer.clipAction(clip);
        this.deathClip.timeScale = 0.3;
        this.deathClip.loop = THREE.LoopOnce;
        this.deathClip.clampWhenFinished = true;
        this.deathClip.play();
    }

    /**
     * Creates new animation clip 
     * 
     * @param {Array} positionArray Array of lenght 9 with positions for animation
     * @param {Array} quaternionArray Array of legnth 9 with rotations as Quaternions
     * @returns {THREE.AnimationClip} a new animation clip
     */
    _createAnimationClip(positionArray, quaternionArray = null) {
        let position = new THREE.VectorKeyframeTrack('.position', [0, 0.35, 0.70], positionArray)

        if (!quaternionArray) {
            return new THREE.AnimationClip('action', 3, [position])

        }
        let quaternionKF = new THREE.QuaternionKeyframeTrack('.quaternion', [0, 0.35, 0.70], quaternionArray);

        return new THREE.AnimationClip('action', 3, [position, quaternionKF])
    }
}
