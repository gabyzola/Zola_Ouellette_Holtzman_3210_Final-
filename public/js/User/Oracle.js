import * as THREE from 'three';
import User from './User.js';

export default class Oracle extends User {
    /**
     * This is the oracle class that will be used to create the oracle
     */
    constructor() {
        super();
        super.setHead(this.createHead());
        super.setBody(this.createBody());
    }

    /**
     * This function creates the head of the oracle
     * 
     * @returns {THREE.Group} the group containing the head
     */
    createHead() {
        // Create the head
        const texture1 = new THREE.TextureLoader().load('/textures/Oracle.png');
        const geometry1 = new THREE.CylinderGeometry(1.6, 1.6, 3.2, 32);
        const material1 = [];
        material1.push(new THREE.MeshPhongMaterial({ color: 0xffe2c6 }));
        material1.push(new THREE.MeshPhongMaterial({ map: texture1 }));
        material1.push(new THREE.MeshPhongMaterial({ color: 0xffe2c6 }));
        const mesh1 = new THREE.Mesh(geometry1, material1);
        mesh1.rotation.y = Math.PI * 1.5 / 3;
        mesh1.rotation.x = Math.PI / 2;
        mesh1.position.z = .6;
        mesh1.position.y = 3.5;
        mesh1.castShadow = true;
        mesh1.receiveShadow = true;

        // Create the hat
        const texture2 = new THREE.TextureLoader().load('/textures/WizardHat.png');
        const geometry2 = new THREE.ConeGeometry(2.5, 6, 32);
        const material2 = [];
        material2.push(new THREE.MeshPhongMaterial({ map: texture2 }));
        material2.push(new THREE.MeshPhongMaterial({ color: 0x000000}));
        material2.push(new THREE.MeshPhongMaterial({ color: 0x000000}));
        const mesh2 = new THREE.Mesh(geometry2, material2);
        mesh2.position.z = -1.6;
        mesh2.position.y = 5.8;
        mesh2.rotation.x = -Math.PI / 5;
        mesh2.castShadow = true;
        mesh2.receiveShadow = true;

        // Create the brim of the hat
        const geometry3 = new THREE.CylinderGeometry(3, 3, 0.5, 32);
        const material3 = new THREE.MeshPhongMaterial({ map: texture2 });
        const mesh3 = new THREE.Mesh(geometry3, material3);
        mesh3.position.y = 3.5;
        mesh3.rotation.x = -Math.PI / 5;
        mesh3.castShadow = true;
        mesh3.receiveShadow = true;

        // Create the staff
        const geometry4 = new THREE.CylinderGeometry(0.2, 0.2, 12, 32);
        const material4 = new THREE.MeshPhongMaterial({ color: 0xd1b449 });
        const mesh4 = new THREE.Mesh(geometry4, material4);
        mesh4.position.x = 2.8;
        mesh4.position.y = -0.6;
        mesh4.position.z = 1;
        mesh4.rotation.x = Math.PI / 7;
        mesh4.rotation.y = Math.PI / 6;
        mesh4.castShadow = true;
        mesh4.receiveShadow = true;

        // Create the crystal ball
        const geometry5 = new THREE.SphereGeometry(0.5, 10, 10);
        const material5 = new THREE.MeshPhongMaterial({ color: 0xffffff });
        const mesh5 = new THREE.Mesh(geometry5, material5);
        mesh5.position.z = 3.6;
        mesh5.position.y = 4.8;
        mesh5.position.x = 2.82;
        mesh5.material.emissive.set(new THREE.Color(0xffffff));
        mesh5.material.emissiveIntensity = 0.5;
        mesh5.castShadow = true;
        mesh5.receiveShadow = true;


        const group = new THREE.Group();
        group.add(mesh1);
        group.add(mesh2);
        group.add(mesh3);
        group.add(mesh4);
        group.add(mesh5);

        return group;
    }

    /**
     * This function creates the body of the oracle
     * 
     * @returns {THREE.Mesh} the mesh containing the body
     */
    createBody() {
        const geometry = new THREE.CylinderGeometry(2.5, 2.5, 8, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0x3c4ec7 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -2;
        return mesh;
    }

}
