import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0xffffff)); // hex for white

const loader = new GLTFLoader();

let shiba;
loader.load(
    '/shiba.glb', // Replace with the path to your Shiba model
    function (gltf) {
        shiba = gltf.scene;
        scene.add(shiba);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

camera.position.z = 5;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
  
  animate();

  // const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // enable damping

function onDocumentMouseDown(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const jumpHeight = 1.5;
        const jumpDuration = 0.4;
        gsap.to(shiba.position, { y: jumpHeight, duration: jumpDuration, yoyo: true, repeat: 1, ease: "power1.inOut" });
    }
}

document.addEventListener('mousedown', onDocumentMouseDown, false);

