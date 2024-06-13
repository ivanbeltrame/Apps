import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

export const run=(event)=>{
    // Removing UI
    document.getElementById("mainUI").remove();


    // Adding basic components
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 20);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Checking compatibility
    if (WebGL.isWebGLAvailable()) {
        // Initiate function or other initializations here
        renderer.setAnimationLoop(animate);
    } else {
        const warning = WebGL.getWebGLErrorMessage();
        document.getElementById('error-container').appendChild(warning);
    }

    // Adding a cube
    const cubeLoader = new THREE.TextureLoader();
    const cubeTexture = cubeLoader.load(URL.createObjectURL(event.target.files[0]));
    cubeTexture.colorSpace = THREE.SRGBColorSpace;
    const cubeMaterial = new THREE.MeshBasicMaterial({map: cubeTexture});

    const cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    // Rendering
    function animate() {
        // Animating the cube
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;

        renderer.render(scene, camera);
    }
}