import * as THREE from 'three';
import { OrbitControls } from
    'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Sets orbit control to move the camera around
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(6, 8, 14);
orbit.update();

const uniforms = {
    u_time: { type: 'f', value: 0.0 },
    u_resolution: {
        type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight)
            .multiplyScalar(window.devicePixelRatio)
    },
    u_mouse: { type: 'v2', value: new THREE.Vector2(0.0, 0.0) },
    image: {type: 't', value: new THREE.TextureLoader().load('image.png')}
}

window.addEventListener('mousemove', function (e) {
    uniforms.u_mouse.value.set(e.screenX / window.innerWidth, 1 - e.screenY / window.innerHeight)
})

const planeGeometry = new THREE.PlaneGeometry(10, 10, 30, 30);
const planeCustomMaterial = new THREE.ShaderMaterial({
    vertexShader: document.getElementById('vertexshader').textContent,
    fragmentShader: document.getElementById('fragmentshader').textContent,
    wireframe: false,
    uniforms
});
const planeMesh = new THREE.Mesh(
    planeGeometry,
    planeCustomMaterial
);
scene.add(planeMesh);

const clock = new THREE.Clock();
function animate() {
    uniforms.u_time.value = clock.getElapsedTime();
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});