import * as THREE from 'three';
import './style.css';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

const geomtry = new THREE.SphereGeometry(15, 32, 16);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const sphere = new THREE.Mesh(geomtry, material);

const light = new THREE.PointLight(0xffffff)
light.position.set(5, 5, 5)

scene.add(sphere, light)

function animate(){
  requestAnimationFrame(animate);

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.05;
  sphere.rotation.z += 0.01;

  renderer.render(scene, camera);
}
animate();