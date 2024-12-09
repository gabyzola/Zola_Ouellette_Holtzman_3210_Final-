import * as THREE from 'three';

export default class Exhaust extends THREE.Group {
    constructor() {
        super();

        let texture = new THREE.TextureLoader().load("/textures/Metal053C_1K-PNG_Color.png");
        let metalMap = new THREE.TextureLoader().load("/textures/Metal053C_1K-PNG_Metalness.png")
        
        //add exhaust body
        this.body = new THREE.CylinderGeometry(0.5, 1, 4, 32);
        let bodyMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xa4ad97, reflectivity: 10, shininess: 10, map: texture, bumpMap: metalMap
        });
        this.bodyMesh = new THREE.Mesh(this.body, bodyMaterial);

        this.bodyMesh.castShadow = true;
        this.bodyMesh.receiveShadow = true;
        this.rotateX(Math.PI/2);

        this.add(this.bodyMesh);

        this.particles = [];
    }

    start() {
        for (let i = 0; i < 10; i++){
            let p1 = new particle(this);

            this.add(p1.mesh);
            p1.mesh.position.x = this.bodyMesh.position.x;
            p1.mesh.position.y = this.bodyMesh.position.y;
            p1.mesh.position.z = this.bodyMesh.position.z;

            this.particles.push(p1);
        }
    }

    update(deltaTime) {
        for (let part of this.particles) {
            part.update(deltaTime);

            if (part.mesh.position.distanceTo(this.position) > 38) {
                part.mesh.position.x = this.bodyMesh.position.x;
                part.mesh.position.y = this.bodyMesh.position.y + 2;
                part.mesh.position.z = this.bodyMesh.position.z;
                part.mat.opacity = 1
            }
        }
    }
}

class particle {
    constructor(group) {
        this.geom = new THREE.SphereGeometry( 1, 32, 16 ); 
        this.mat = new THREE.MeshPhongMaterial( { 
            transparent: true,
            opacity: 1, // Adjust to make it look like smoke
            depthWrite: false, // Prevent depth issues
            side: THREE.DoubleSide, // Make the smoke visible from both sides
            color: 0xaaaaaa, // Light gray color for smoke
        } ); 

        this.mesh = new THREE.Mesh( this.geom, this.mat ); 

        group.add( this.mesh );

        this.velocity = new THREE.Vector3(
            THREE.MathUtils.randFloatSpread(10),THREE.MathUtils.randFloatSpread(10) + 5, THREE.MathUtils.randFloatSpread(10) - 5)
    }

    update(deltaTime) {
        let h = deltaTime ;
        this.mesh.translateX(this.velocity.x * h)
        this.mesh.translateY(this.velocity.y * h)
        this.mesh.translateZ(this.velocity.z * h);

        this.mat.opacity -= 0.2 * h;
    }
}