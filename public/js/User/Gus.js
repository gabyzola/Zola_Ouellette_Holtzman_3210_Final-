import * as THREE from 'three';
import User from './User.js';

export default class Gus extends User {
    /**
     * This is the constructor for the Tutor character
     */
    constructor() {
        super();
        this.setHead(this.createHead());
        this.setBody(this.createBody());


    }

    /**
     * This function creates the head of the character
     * 
     * @returns {THREE.Group} the group of the head
     */
    createHead() {
        const group = new THREE.Group();

        const loader = new THREE.TextureLoader();
        const geometry = new THREE.CylinderGeometry(1.6, 1.6, 1.5, 32);
        const material = [
            new THREE.MeshPhongMaterial({ color: 0x786a66 }),
            new THREE.MeshPhongMaterial({ map: loader.load('public/textures/gus.png') }),
            new THREE.MeshPhongMaterial({ color: 0x786a66 })
        ];
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.y = Math.PI * 1.5 / 3;
        mesh.rotation.x = Math.PI / 2;
        mesh.position.z = .6;
        mesh.position.y = 3.25;

        mesh.rotateZ(-Math.PI/5)
        mesh.translateY(1.5)
        mesh.translateX(-3)
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        group.add(mesh);

        group.add(this.createLegs()); 
        return group;
    }

    /**
     * This function creates the body of the character
     * 
     * @returns {THREE.Mesh} the mesh of the body
     */
    createBody() {
        const geometry = new THREE.CapsuleGeometry( 2.5, 3.5, 4, 8 ); 
        const material = new THREE.MeshPhongMaterial({ color: 0x786a66 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 0;
        mesh.rotateX(-Math.PI/2);
        return mesh;
    }

    createLegs() {
        const group = new THREE.Group();
        const geometry = new THREE.CylinderGeometry( 0.75, 0.5, 3, 32 ); 
        const material = new THREE.MeshPhongMaterial({ color: 0x786a66 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = 1;
        mesh.position.y = -3;
        mesh.position.z = -2;
        //mesh.rotateY(-Math.PI/2);
        group.add(mesh);

        let mesh2 = mesh.clone();
        mesh2.position.x = -1;
        group.add(mesh2);

        let mesh3 = mesh.clone();
        mesh3.position.z = 2;
        group.add(mesh3);

        let mesh4 = mesh2.clone();
        mesh4.position.z = 2;
        group.add(mesh4);

        return group;
    }


}