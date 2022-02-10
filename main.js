import * as THREE from 'three';
import { PointsMaterial } from 'three';
import './style.css';

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / -2, window.innerHeight / 2, 1, 1000);
camera.rotation.z = 1;
camera.rotation.x = Math.PI / 2;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
camera.position.set(5, 5, 5);
renderer.render(scene, camera);

var x = document.querySelector('header');
document.body.appendChild(x);

const lights = new THREE.DirectionalLight(0xffffff);
lights.position.set(0, 1, 0);
lights.castShadow = true;

lights.shadow.mapSize.width = 512;
lights.shadow.mapSize.height = 512;
lights.shadow.camera.near = 0.1;
lights.shadow.camera.far = 100;

const vertices = [];

for(let i = 0; i < 10000; i++){
  const x = THREE.MathUtils.randFloatSpread(2000);
  const y = THREE.MathUtils.randFloatSpread(2000);
  const z = THREE.MathUtils.randFloatSpread(2000);

  vertices.push(x, y, z);
}
const geomtry = new THREE.BufferGeometry();
geomtry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

const material = new PointsMaterial({color: 0xFFFFFF32});

const point = new THREE.Points(geomtry, material);
point.castShadow = true;
point.receiveShadow = false;
scene.add(point);

renderer.render(scene, camera);

window.addEventListener('mousemove', (e) => {
  point.position.x = Math.random() * 600 - 300;
  point.position.y = Math.random() * 600 - 300;
  point.position.z = Math.random() * 600 - 300;

  renderer.render(scene, camera);
});
const spheregeomtry = new THREE.SphereGeometry(200, 300, 400);
const loader = new THREE.TextureLoader().load('https://tse3.mm.bing.net/th?id=OIP.LhXpzQ_6j29qGmfVUIawPAHaHZ&pid=Api');
const spherematerial = new THREE.MeshBasicMaterial({map: loader});
const sphere = new THREE.Mesh(spheregeomtry, spherematerial);
sphere.castShadow = true;
sphere.receiveShadow = false;
scene.add(sphere);

function animate(){
  requestAnimationFrame(animate);

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.02;
  sphere.rotation.z += 0.01;

  renderer.render(scene, camera);
}
animate();

