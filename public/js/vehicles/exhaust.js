import * as THREE from 'three';


export default class Exhaust extends THREE.Group {
    constructor(scene) {
        super();

        let texture = new THREE.TextureLoader().load("public/textures/Metal053C_1K-PNG_Color.png");
        let metalMap = new THREE.TextureLoader().load("public/textures/Metal053C_1K-PNG_Metalness.png")

        // Sets the body and head of the character
        this.body = new THREE.CylinderGeometry(2, 3, 8, 32);
        let bodyMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xa4ad97, reflectivity: 10, shininess: 10, map: texture, bumpMap: metalMap
        });
        this.bodyMesh = new THREE.Mesh(this.body, bodyMaterial);

        this.bodyMesh.castShadow = true;
        this.bodyMesh.receiveShadow = true;

        this.add(this.bodyMesh);
        this.scene = scene;
        this.scene.add(this);
        this.particles = [];

        this.rotateX(Math.PI/2);
    }

    start() {
        for (let i = 0; i < 10; i++){
            let p1 = new particle(this);
            this.scene.add(p1.mesh);
            p1.mesh.translateY(this.position.y);
            p1.mesh.translateZ(this.position.z + 5)
            this.particles.push(p1);
        }
    }

    update(deltaTime) {
        for (let part of this.particles) {
            part.update(deltaTime);

            if (part.mesh.position.distanceTo(this.position) > 38) {
                part.mesh.position.x = this.position.x;
                part.mesh.position.y = this.position.y;
                part.mesh.position.z = this.position.z + 5;
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
            THREE.MathUtils.randFloatSpread(10),THREE.MathUtils.randFloatSpread(10) + 9.8, THREE.MathUtils.randFloatSpread(10))
    }

    update(deltaTime) {
        let h = deltaTime ;
        this.mesh.translateX(this.velocity.x * h)
        this.mesh.translateY(this.velocity.y * h)
        this.mesh.translateZ(this.velocity.z * h);

        this.mat.opacity -= 0.2 * h;
    }
}