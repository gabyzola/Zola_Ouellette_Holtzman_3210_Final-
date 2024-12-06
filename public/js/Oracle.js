import * as THREE from 'three';
import User from './User.js';

export default class Oracle extends User {
    constructor() {
        super();
        super.setHead(this.createHead());
        super.setBody(this.createBody());
    }

    createHead() {
        const texture1 = new THREE.TextureLoader().load('./public/texture/Oracle.png');
        const geometry1 = new THREE.CylinderGeometry(0.8,0.8,1.6, 32);
        const material1 = [];
        material1.push(new THREE.MeshPhongMaterial({ color: 0xffe2c6 }));
        material1.push(new THREE.MeshPhongMaterial({ map: texture1 }));
        material1.push(new THREE.MeshPhongMaterial({ color: 0xffe2c6 }));
        const mesh1 = new THREE.Mesh(geometry1, material1);
        mesh1.rotation.y = Math.PI * 1.5 / 3;
        mesh1.rotation.x = Math.PI / 2;
        mesh1.position.z = .3;
        mesh1.position.y = 1.75;

        const texture2 = new THREE.TextureLoader().load('./public/texture/WizardHat.png');
        const geometry2 = new THREE.ConeGeometry(1.25, 3, 32);
        const material2 = [];
        material2.push(new THREE.MeshPhongMaterial({ map: texture2 }));
        material2.push(new THREE.MeshPhongMaterial({ color: 0x000000}));
        material2.push(new THREE.MeshPhongMaterial({ color: 0x000000}));
        const mesh2 = new THREE.Mesh(geometry2, material2);
        mesh2.position.z = -0.8;
        mesh2.position.y = 2.9;
        mesh2.rotation.x = -Math.PI / 5;

        const geometry3 = new THREE.CylinderGeometry(1.5,1.5,0.25, 32);
        const material3 = new THREE.MeshPhongMaterial({ map: texture2 });
        const mesh3 = new THREE.Mesh(geometry3, material3);
        mesh3.position.z = 0;
        mesh3.position.y = 1.75;
        mesh3.rotation.x = -Math.PI / 5;

        const geometry4 = new THREE.CylinderGeometry(0.1,0.1,6, 32);
        const material4 = new THREE.MeshPhongMaterial({ color: 0xd1b449 });
        const mesh4 = new THREE.Mesh(geometry4, material4);
        mesh4.position.x = 1.4;
        mesh4.position.y = -0.3;
        mesh4.position.z = 0.5;
        mesh4.rotation.x = Math.PI / 7;
        mesh4.rotation.y = Math.PI / 6;

        const geometry5 = new THREE.SphereGeometry(0.25, 32, 32);
        const material5 = new THREE.MeshPhongMaterial({ color: 0xffffff });
        const mesh5 = new THREE.Mesh(geometry5, material5);
        mesh5.position.z = 1.8;
        mesh5.position.y = 2.4;
        mesh5.position.x = 1.41;
        mesh5.material.emissive.set(new THREE.Color(0xffffff));
        mesh5.material.emissiveIntensity = 0.5;


        const group = new THREE.Group();
        group.add(mesh1);
        group.add(mesh2);
        group.add(mesh3);
        group.add(mesh4);
        group.add(mesh5);

        return group;
    }

    createBody() {
        const geometry = new THREE.CylinderGeometry(1.25, 1.5, 4, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0x3c4ec7 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -1;
        return mesh;
    }

}
