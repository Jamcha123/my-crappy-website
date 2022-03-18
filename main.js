import * as THREE from 'three';
import './style.css';

const scene = new THREE.Scene(); 

const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / -2, window.innerHeight / 2, 1, 1000);
camera.rotation.z = 1;
camera.rotation.x = Math.PI / 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);
camera.position.setZ(30);
renderer.render(scene, camera);

const lights = new THREE.DirectionalLight(0xffff32);
lights.castShadow = true;
lights.shadow.mapSize.width = 512;
lights.shadow.mapSize.height = 512;
lights.shadow.camera.near = 0.1;
lights.shadow.camera.far = 1000;

scene.add(lights);

const vertices = [];
for(let i = 0; i < 20000; i++){
    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);

    vertices.push(x, y, z);
}
const stargeomtry = new THREE.BufferGeometry();
stargeomtry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

const starmaterial = new THREE.PointsMaterial({color: 0xaaaaaa, size: 1.5});
const stars = new THREE.Points(stargeomtry, starmaterial);
stars.castShadow = true;
stars.receiveShadow = true;

scene.add(stars);

renderer.render(scene, camera);

window.addEventListener('mousemove', (e) => {
    stars.rotation.x += Math.random() * window.innerWidth - window.innerHeight;
    stars.rotation.y += Math.random() * window.innerWidth - window.innerHeight;
    stars.rotation.z += Math.random() * window.innerWidth - window.innerHeight;

    renderer.render(scene, camera);
});

const texture = new THREE.TextureLoader()
