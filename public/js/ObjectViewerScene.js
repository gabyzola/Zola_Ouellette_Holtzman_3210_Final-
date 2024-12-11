import * as THREE from 'three';
import Lane from './Lane.js';
import LaneObjectPool from './LaneObjectPool.js';


export default class ObjectViewerScene extends THREE.Scene {

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

        var a = new THREE.AmbientLight(0x707070, 1);
        this.add(a);


        //    this.createLanes();
        this.laneObjectPool= new LaneObjectPool(12); 
        this.activeLanes= [];
        for(var i = 0; i < 13; i ++){
           this.activeLanes.push(this.laneObjectPool.getObject());
           this.activeLanes[i].position.x = i * -30 + 30; 
           this.activeLanes[i].position.y = -3.85;
           this.add(this.activeLanes[i]);
        }

        this.jumpsize = 30;
        this.updateCameraAnimations();
    }
    /**
    * Create alternating lanes of road and grass
    */
    createLanes() {
        const laneWidth = 30;
        const laneLength = 300;
        const numLanes = 10;

        for (let i = 0; i < numLanes; i++) {
            const type = Math.round(Math.random() + 1) % 2 === 0 ? 'road' : 'grass';
            const lane = new Lane(laneWidth, laneLength, type);

            // Position the lane based on its index
            lane.position.x = -laneWidth * i;
            lane.position.y = -3.85

            this.add(lane);
            console.log(lane.road);
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

    update(delta) {
        this.mixer.update(delta);
    }

    playDeathAnimation() {
        this.moveForwardAnimation.stop();

        let clip = this._createAnimationClip(
            [
                this.camera.position.x, this.camera.position.y, this.camera.position.z,
                this.camera.position.x - 20, this.camera.position.y - 2, this.camera.position.z - 4,
                this.camera.position.x - 40, this.camera.position.y - 5, this.camera.position.z - 8,
            ],
            [
                this.camera.quaternion.x, this.camera.quaternion.y, this.camera.quaternion.z, this.camera.quaternion.w,
                this.camera.quaternion.x, this.camera.quaternion.y / 2, this.camera.quaternion.z / 2, this.camera.quaternion.w,
                this.camera.quaternion.x, this.camera.quaternion.y / 4, this.camera.quaternion.z / 4, this.camera.quaternion.w,
            ]
        )

        this.deathClip = this.mixer.clipAction(clip);
        this.deathClip.timeScale = 0.8;
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

    animate(userX) {
        for(var i = 0; i < this.activeLanes.length; i ++){
            if(this.activeLanes[i].position.x >= userX+60){
                this.laneObjectPool.returnObject(this.activeLanes[i]);
                this.activeLanes.splice(1,i);
            }
            if(this.activeLanes.length==11){
                let lane = this.laneObjectPool.getObject();
                lane.position.x = userX - 270; 
                this.activeLanes.push(lane);

            }
        }
    }

}
