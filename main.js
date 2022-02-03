import { doc } from 'firebase/firestore';
import * as THREE from 'three';
import { Float32Attribute } from 'three';
import { MathUtils } from 'three';
import './style.css';

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / -2, window.innerHeight / 2, 1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

const vertices = [];

for(let i = 0; i < 10000; i++)
{
  const x = THREE.MathUtils.randFloatSpread(2000);
  const y = THREE.MathUtils.randFloatSpread(2000);
  const z = THREE.MathUtils.randFloatSpread(2000);

  vertices.push(x, y, z);
}
const stargeomtry = new THREE.BufferGeometry();
stargeomtry.setAttribute('position', new THREE.Float32Attribute(vertices, 3));

const starmaterial = new THREE.PointsMaterial({color: 0xaaaaaa, size: 2});
const stars = new THREE.Points(stargeomtry, starmaterial);
scene.add(stars);

function animate()
{
  requestAnimationFrame(animate);

  stars.rotation.x += 0.01;
  stars.rotation.y += 0.05;
  stars.rotation.z += 0.01;

  renderer.render(scene, camera);
}
animate();