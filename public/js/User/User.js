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

        this.boundingBox = new THREE.Box3().setFromObject(this);
        console.log(this.boundingBox);

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
         let xAxis = new THREE.Vector3(1, 0, 0);
         //create final rotation quaternion 
         let qFinal = new THREE.Quaternion().setFromAxisAngle(xAxis, Math.PI * 2);
         //add animations clips p1 move to center
         let clip = this._createAnimationClip(
             [
                 this.position.x, this.position.y, this.position.z,
                 this.position.x - this.jumpsize/2, this.position.y + 5 , this.position.z,
                 this.position.x - this.jumpsize, this.position.y, this.position.z,

             ],
             [
                 this.quaternion.x, this.quaternion.y, this.quaternion.z, this.quaternion.w,
                 qFinal.x, qFinal.y, qFinal.z, qFinal.w,
                 this.quaternion.x, this.quaternion.y, this.quaternion.z, this.quaternion.w
             ]
         )
         //add clip to create clip
         this.moveAnimation = this.mixer.clipAction(clip)
         //only loop once 
         //this.moveAnimation.loop = THREE.LoopOnce
         //this.moveAnimation.clampWhenFinished = true;
    }

    /**
     * Creates new animation clip 
     * 
     * @param {Array} positionArray Array of lenght 9 with positions for animation
     * @param {Array} quaternionArray Array of legnth 9 with rotations as Quaternions
     * @returns {THREE.AnimationClip} a new animation clip
     */
    _createAnimationClip(positionArray, quaternionArray) {
        let quaternionKF = new THREE.QuaternionKeyframeTrack('.quaternion', [0, 1, 2], quaternionArray);
        let position = new THREE.VectorKeyframeTrack('.position', [0, 1, 2], positionArray)

        return new THREE.AnimationClip('action', 3, [position, quaternionKF])
    }

    
}