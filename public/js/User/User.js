import * as THREE from 'three';

export default class User extends THREE.Group {
    /**
     * This is the constructor for the Users character
     */
    constructor() {
        super();
        this.headMesh = null;
        this.bodyMesh = null;

        this.jumpsize = 30; 

        this.mixer = null;
    }

    /**
     * Sets the head of the user
     * 
     * @param {THREE.Mesh or THREE.Group} headMesh 
     */
    setHead(headMesh) {
        this.headMesh = headMesh;
        this.headMesh.castShadow = true;
        this.headMesh.receiveShadow = true;
        
        this.add(this.headMesh);

        this.receiveShadow = true;
        this.castShadow = true;
    }

    /**
     * Sets the body of the user
     * 
     * @param {THREE.Mesh or THREE.Group} bodyMesh 
     */
    setBody(bodyMesh) {
        this.bodyMesh = bodyMesh;
        bodyMesh.receiveShadow = true;
        bodyMesh.castShadow = true;
        this.add(this.bodyMesh);
    }

    /**
     * Sets the bounding box of the user
     */
    setBoundingBox() {
        this.boundingBox = new THREE.Box3().setFromObject(this);
    }

    addAnimations() {
        this.mixer = new THREE.AnimationMixer(this);
        //Create Axis for Quaternion angle 

        let yAxis = new THREE.Vector3(0, 1, 0);
        //create final rotation quaternion 
        let qFinal = new THREE.Quaternion().setFromAxisAngle(yAxis, Math.PI * 2);
        
        let clip = this._createAnimationClip(
            [
                this.position.x, this.position.y, this.position.z,
                this.position.x - this.jumpsize/2, this.position.y + 10 , this.position.z,
                this.position.x - this.jumpsize, this.position.y, this.position.z,

            ],
            [
                0, 0, 0, 1,
                0, -1, 0, 0,
                qFinal.x, qFinal.y, qFinal.z, qFinal.w
            ]
        )
        
        //add clip to create clip
        this.moveForwardAnimation = this.mixer.clipAction(clip);

        //only loop once 
        this.moveForwardAnimation.loop = THREE.LoopOnce;
        this.moveForwardAnimation.clampWhenFinished = true;

        clip = this._createAnimationClip(
            [
                this.position.x, this.position.y, this.position.z,
                this.position.x + this.jumpsize/2, this.position.y + 10 , this.position.z,
                this.position.x + this.jumpsize, this.position.y, this.position.z,

            ],
            [
                0, 0, 0, 1,
                0, 1, 0, 0,
                qFinal.x, -qFinal.y, qFinal.z, qFinal.w       
            ]
        )

        this.moveBackwardAnimation = this.mixer.clipAction(clip);
        this.moveBackwardAnimation.loop = THREE.LoopOnce;
        this.moveBackwardAnimation.clampWhenFinished = true;
    }
    
    kill() {
        this.moveForwardAnimation.stop();
        this.moveBackwardAnimation.stop();

        //Create Axis for Quaternion angle 
        let yAxis = new THREE.Vector3(-1, 0, 0);
        //create final rotation quaternion 
        let qFinal = new THREE.Quaternion().setFromAxisAngle(yAxis, Math.PI/2);
        
        let clip = this._createAnimationClip(
            [
                this.position.x - this.jumpsize , this.position.y, this.position.z,
                this.position.x - this.jumpsize/2, this.position.y + 20 , this.position.z - 20,
                this.position.x - this.jumpsize/4, this.position.y, this.position.z - 40,

            ],
            [
                0, 0, 0, 1,
                -qFinal.x, -qFinal.y, -qFinal.z, qFinal.w,
                qFinal.x, qFinal.y, qFinal.z, qFinal.w,
            ]
        )
        
        //add clip to create clip
        this.deathClip = this.mixer.clipAction(clip);

        //only loop once 
        this.deathClip.timeScale = 0.8;
        this.deathClip.loop = THREE.LoopOnce;
        this.deathClip.clampWhenFinished = true;
        this.deathClip.play();
    }

    update(delta) {
        if (!this.mixer) {
            return;
        }

        this.setBoundingBox();
        this.mixer.update(delta);
    }

    

    /**
     * Creates new animation clip 
     * 
     * @param {Array} positionArray Array of lenght 9 with positions for animation
     * @param {Array} quaternionArray Array of legnth 9 with rotations as Quaternions
     * @returns {THREE.AnimationClip} a new animation clip
     */
    _createAnimationClip(positionArray, quaternionArray) {
        let quaternionKF = new THREE.QuaternionKeyframeTrack('.quaternion', [0, 0.35, 0.70], quaternionArray);
        let position = new THREE.VectorKeyframeTrack('.position', [0, 0.35, 0.70], positionArray)

        return new THREE.AnimationClip('action', 3, [position, quaternionKF])
    }
    
}