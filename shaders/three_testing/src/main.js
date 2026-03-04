import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene();
let renderWidth, renderHeight, renderAspectRatio, stats, controls

renderWidth = window.innerWidth
renderHeight = window.innerHeight

renderAspectRatio = renderWidth / renderHeight
const camera = new THREE.PerspectiveCamera(75, renderAspectRatio, 0.1, 100)
camera.position.set(2, 2, 2)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const dirLight = new THREE.DirectionalLight('#ffffff', 1.0)
dirLight.position.set(1, 1.5, 2)

const ambientLight = new THREE.AmbientLight('#ffffff', 1.0)
scene.add(dirLight, ambientLight)

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

function animate() {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener(
  'resize',
  () => {
    renderWidth = window.innerWidth
    renderHeight = window.innerHeight
    renderAspectRatio = renderWidth / renderHeight

    renderer.setPixelRatio(window.devicePixelRatio * 1.5)

    camera.aspect = renderAspectRatio
    camera.updateProjectionMatrix()

    renderer.setSize(renderWidth, renderHeight)
    composer.setSize(renderWidth, renderHeight)
  },
  false
)