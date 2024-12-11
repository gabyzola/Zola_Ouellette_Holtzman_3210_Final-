import * as THREE from 'three';

export default class UserScene extends THREE.Scene{
    /**
     * This is the scene for the user selections and being able to access the user afters
     * 
     * @param {THREE.WebGLRenderer} renderer is the renderer that will be used to render the scene
     */
    constructor(renderer) {
        super();

        // Create a camera, which determines what we'll see when we render the scene
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 20 * Math.sqrt(2) / 2;
        this.camera.position.y = 8;
        this.camera.position.x = 20 * Math.sqrt(2) / 2;
        this.camera.lookAt(0, -2, 0);

        // Add the directional light to the scene
        this.add(this.addLight(24, 30/2 - 7, 0));
        this.add(this.addLight(0, 30/2 - 7, 24));

        // Add the ambient light to the scene
        var a = new THREE.AmbientLight(0x909090, 1);
        this.add(a);

        // Adding the surroundings
        const surroundings = this.createSurroundings();
        this.add(surroundings);
    }
    
    /**
     * This function creates the surroundings for the user scene
     * 
     * @returns {THREE.Group} the group containing the surroundings
     */
    createSurroundings() {
        const group = new THREE.Group();
        const loader = new THREE.TextureLoader();

        // Create the pedestal
        const pedestalGeometry = new THREE.CylinderGeometry(4, 4, 1, 32);
        const pedestalMaterial = new THREE.MeshPhongMaterial({ map: loader.load('public/textures/MarbleTexture.png') });
        const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
        pedestal.material.shininess = 1000;
        pedestal.receiveShadow = true;
        pedestal.castShadow = true;
        pedestal.position.y = -6.5;
        group.add(pedestal);

        // Create the ground around the pedestal
        const groundGeometry = new THREE.PlaneGeometry(50, 50);
        const groundMaterial = new THREE.MeshPhongMaterial({ map: loader.load('public/textures/WoodTexture.png') });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.receiveShadow = true;
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -7;
        group.add(ground);

        // Create the Scene
        group.add(this.createWall(0,25));
        group.add(this.createWall(-25,0).rotateY(Math.PI/2));
        group.add(this.createWall(0,-25).rotateY(Math.PI));
        group.add(this.createWall(25,0).rotateY(-Math.PI/2));
        group.add(this.createCeiling());

        var window1 = this.createWindow(10,-25);
        var window2 = this.createWindow(-10,-25);
        var window3 = this.createWindow(0,25);
        group.add(window1.rotateY(-Math.PI/2));
        group.add(window2.rotateY(-Math.PI/2));
        group.add(window3);

        const ceilingLightGeometry = new THREE.BoxGeometry(5,0.1,5);
        const ceilingLightMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0xffffff });
        const ceilingLightMesh = new THREE.Mesh(ceilingLightGeometry, ceilingLightMaterial);
        ceilingLightMesh.position.set(0,30 - 7,0);
        ceilingLightMesh.rotateX(Math.PI);
        group.add(ceilingLightMesh);

        const ceilingLight = new THREE.SpotLight(0xffffff, 0.5);
        ceilingLight.position.set(0,30 - 7,0);
        ceilingLight.target.position.set(0,0,0);
        ceilingLight.angle = Math.PI/2;
        ceilingLight.penumbra = 0.5;
        ceilingLight.castShadow = true;
        ceilingLight.shadow.mapSize.width = 512;
        ceilingLight.shadow.mapSize.height = 512;
        ceilingLight.shadow.camera.near = 0.5;
        ceilingLight.shadow.camera.far = 500;
        ceilingLight.shadow.camera.top = 10;
        ceilingLight.shadow.camera.bottom = -10;
        ceilingLight.shadow.camera.left = -10;
        ceilingLight.shadow.camera.right = 10;
        group.add(ceilingLight);

        return group;
    }

    /**
     * Creates a wall mesh
     * 
     * @param {Number} x position of the wall
     * @param {Number} z position of the wall
     * @returns {THREE.Mesh} wall mesh
     */
    createWall(x,z) {
        const loader = new THREE.TextureLoader();
        const wallGeometry = new THREE.BoxGeometry(50,30,1);
        const wallMaterial = new THREE.MeshPhongMaterial({ 
            map: loader.load('public/textures/Bricks054_1K-JPG_Color.jpg'),
            bumpMap: loader.load('public/textures/Bricks054_1K-JPG_Roughness.jpg'),
            normalMap: loader.load('public/textures/Bricks054_1K-JPG_NormalGL.jpg') 
        });
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.receiveShadow = true;
        wall.position.set(x,30/2 - 7,z);
        return wall;
    }

    /**
     * Creates a window group
     * 
     * @param {Number} x 
     * @param {Number} z 
     * @returns {THREE.Group} window group
     */
    createWindow(x,z) {
        const loader = new THREE.TextureLoader();
        const frameGroup = new THREE.Group();

        const windowFrameMaterial = new THREE.MeshPhongMaterial({
            map: loader.load('public/textures/Wood033_1K-JPG_Color.jpg'),
            bumpMap: loader.load('public/textures/Wood033_1K-JPG_Roughness.jpg'),
            normalMap: loader.load('public/textures/Wood033_1K-JPG_NormalGL.jpg'),
            color: 0xffffff
        });

        const windowFrameTopGeometry = new THREE.BoxGeometry(12,1,1.2);
        const windowFrameTop = new THREE.Mesh(windowFrameTopGeometry, windowFrameMaterial);
        windowFrameTop.position.set(x,30/2 - 7 + 7.5,z);
        frameGroup.add(windowFrameTop);

        const windowFrameBottomGeometry = new THREE.BoxGeometry(12,1,1.2);
        const windowFrameBottom = new THREE.Mesh(windowFrameBottomGeometry, windowFrameMaterial);
        windowFrameBottom.position.set(x,30/2 - 7 - 7.5,z);
        frameGroup.add(windowFrameBottom);

        const windowFrameLeftGeometry = new THREE.BoxGeometry(1,15,1.2);
        const windowFrameLeft = new THREE.Mesh(windowFrameLeftGeometry, windowFrameMaterial);
        windowFrameLeft.position.set(x - 5.5,30/2 - 7,z);
        frameGroup.add(windowFrameLeft);

        const windowFrameRightGeometry = new THREE.BoxGeometry(1,15,1.2);
        const windowFrameRight = new THREE.Mesh(windowFrameRightGeometry, windowFrameMaterial);
        windowFrameRight.position.set(x + 5.5,30/2 - 7,z);
        frameGroup.add(windowFrameRight);

        const windowFrameMiddleGeometry = new THREE.BoxGeometry(1,15,1.2);
        const windowFrameMiddle = new THREE.Mesh(windowFrameMiddleGeometry, windowFrameMaterial);
        windowFrameMiddle.position.set(x,30/2 - 7,z);
        frameGroup.add(windowFrameMiddle);

        const windowFrameMiddle2Geometry = new THREE.BoxGeometry(12,1,1.2);
        const windowFrameMiddle2 = new THREE.Mesh(windowFrameMiddle2Geometry, windowFrameMaterial);
        windowFrameMiddle2.position.set(x,30/2 - 7,z);
        frameGroup.add(windowFrameMiddle2);

        const windowGlassMaterial = new THREE.MeshPhongMaterial({
            color: 0x87CEEB
        });

        const windowGlassGeometry = new THREE.BoxGeometry(10,14,1.01);
        const windowGlass = new THREE.Mesh(windowGlassGeometry, windowGlassMaterial);
        windowGlass.position.set(x,30/2 - 7,z);
        frameGroup.add(windowGlass);

        return frameGroup;
    }

    /**
     * Creates the light for the scene
     * 
     * @param {Number} x position of the light
     * @param {Number} y positon of the light
     * @param {Number} z postion of the light
     * @returns {THREE.DirectionalLight} light
     */
    addLight(x,y,z) {
        // Add the directional light to the scene
        const light = new THREE.DirectionalLight(0xffffff, 0.25);
        light.position.set(x, y, z);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;
        light.shadow.mapSize.width = 512;
        light.shadow.mapSize.height = 512;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 500;
        light.shadow.camera.top = 10;
        light.shadow.camera.bottom = -10;
        light.shadow.camera.left = -10;
        light.shadow.camera.right = 10;

        return light;
    }

    /**
     * Creates the ceiling mesh
     * 
     * @returns {THREE.Mesh} the mesh of the ceiling
     */
    createCeiling() {
        const loader = new THREE.TextureLoader();
        const ceilingGeometry = new THREE.PlaneGeometry(50,50);
        const ceilingMaterial = new THREE.MeshPhongMaterial({ 
            map: loader.load('public/textures/Concrete044D_1K-JPG_Color.jpg'),
            bumpMap: loader.load('public/textures/Concrete044D_1K-JPG_Roughness.jpg'),
            normalMap: loader.load('public/textures/Concrete044D_1K-JPG_NormalGL.jpg')
        });
        const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
        ceiling.receiveShadow = true;
        ceiling.position.y = 30 - 7;
        ceiling.rotation.x = Math.PI/2;

        return ceiling;
    }

}
