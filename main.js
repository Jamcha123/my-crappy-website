import * as THREE from 'three';
import './style.css';

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / -2, window.innerHeight / 2, 1, 1000);
camera.rotation.z = 1;
camera.rotation.x = Math.PI / 2;

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
camera.position.setZ(30);
renderer.render(scene, camera);

const lights = new THREE.DirectionalLight(0xffff32);
lights.position.set(0, 1, 0);
lights.shadow.mapSize.width = 512;
lights.shadow.mapSize.height = 512;
lights.shadow.camera.near = 0.1;
lights.shadow.camera.far = 1000;

scene.add(lights);

const vertices = [];
for(let i = 0; i < 10000; i++){
    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);

    vertices.push(x, y, z);
}
const stargeomtry = new THREE.BufferGeometry();
stargeomtry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

const starmaterial = new THREE.PointsMaterial({color: 0xfffff, size: 1.5});
const stars = new THREE.Points(stargeomtry, starmaterial);
stars.castShadow = true;
stars.receiveShadow = false;

scene.add(stars);

renderer.render(scene, camera);

window.addEventListener('mousemove', (e) => {
    stars.rotation.x += 0.01;
    stars.rotation.y += 0.02;
    stars.rotation.z += 0.01;

    renderer.render(scene, camera);
})