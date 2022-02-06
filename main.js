import * as THREE from 'three';
import './style.css';

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / -2, window.innerHeight / 2, 1, 1000);
camera.rotation.z = 1;
camera.rotation.x = Math.PI / 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

const loader = new THREE.TextureLoader().load('th (2).jpg');
const geomtry = new THREE.TorusGeometry(100, 200, 300);

const torusmaterial = new THREE.MeshStandardMaterial({map: loader});

const torus = new THREE.Mesh(geomtry, torusmaterial);

scene.add(torus);

const lights = new THREE.AmbientLight({color: 0xFFFFFF32});

scene.add(lights);

const vertices = [];
for(let i = 0; i < 10000; i++){
  const x = THREE.MathUtils.randFloatSpread(2000);
  const y = THREE.MathUtils.randFloatSpread(2000);
  const z = THREE.MathUtils.randFloatSpread(2000);

  vertices.push(x, y, z);
}
const pointgeo = new THREE.BufferGeometry();
pointgeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const pointmaterial = new THREE.PointsMaterial({color: 0xaaaaaa, size: 2});

const points = new THREE.Points(pointgeo, pointmaterial);

scene.add(points);

function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.02;
  torus.rotation.z += 0.01;

  points.position.x = Math.random() * 600 - 300;
  points.position.y = Math.random() * 600 - 300;
  points.position.z = Math.random() * 600 - 300;

  renderer.render(scene, camera);
}
animate();
