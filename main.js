import * as THREE from 'three';
import './style.css';

const scene1 = new THREE.Scene();

const scene2 = new THREE.Scene();

const camera1 = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / -2, window.innerHeight / 2, 1, 1000);
camera1.position.z = 1;
camera1.position.x = Math.PI / 2;

const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera2.position.setZ(30);

const renderer1 = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg1'), 
});
renderer1.setPixelRatio(window.devicePixelRatio);
renderer1.setSize(window.innerWidth / 2, window.innerHeight);
renderer1.shadowMap.enabled = true;
renderer1.shadowMap.type = THREE.PCFSoftShadowMap;
renderer1.outputEncoding = THREE.sRGBEncoding;
renderer1.physicallyCorrectLights = true;
renderer1.render(scene1, camera2);

const spheregeometry = new THREE.SphereGeometry(13, 13, 13);
const spherematerial = new THREE.MeshBasicMaterial({color:0x0000ff, wireframe: true});
const sphere = new THREE.Mesh(spheregeometry, spherematerial);
scene1.add(sphere);

const lights = new THREE.AmbientLight(0xaaaaaa);
scene1.add(lights);

function animate(){
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.006;
    sphere.rotation.y += 0.008;
    sphere.rotation.z += 0.006;

    renderer1.render(scene1, camera2)
}
animate();
const renderer2 = new THREE.WebGLRenderer({
    canvas:document.querySelector('#bg2'),
});
renderer2.setPixelRatio(window.devicePixelRatio);
renderer2.setSize(window.innerWidth, window.innerHeight);
renderer2.shadowMap.enabled = true;
renderer2.shadowMap.type = THREE.PCFSoftShadowMap;
renderer2.physicallyCorrectLights = true;
renderer2.outputEncoding = THREE.sRGBEncoding;
renderer2.render(scene2, camera1);

const vertices = [];
for(let i = 0; i < 10000; i++){
    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);

    vertices.push(x, y, z);
}
const stargeomtry = new THREE.BufferGeometry();
stargeomtry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

const starmaterial = new THREE.PointsMaterial({color: 0xaaaaaa, size: 1.5});
const stars = new THREE.Points(stargeomtry, starmaterial);

scene2.add(stars);

renderer2.render(scene2, camera1);