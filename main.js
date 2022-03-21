import * as THREE from 'three';
import './style.css';

const scene1 = new THREE.Scene();

const scene2 = new THREE.Scene();
scene2.background = new THREE.Color(0xcccccc);

const camera1 = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / -2, window.innerHeight / 2, 1, 1000);
camera1.rotation.z = 1;
camera1.rotation.x = Math.PI / 2;

const camera2 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 500);
camera2.position.set(0, 0, 100);
camera2.lookAt(0, 0, 0);

const renderer1 = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg1'),
});
renderer1.setPixelRatio(window.devicePixelRatio);
renderer1.setSize(window.innerWidth, window.innerHeight);
renderer1.shadowMap.enabled = true;
renderer1.shadowMap.type = THREE.PCFSoftShadowMap;
renderer1.outputEncoding = THREE.sRGBEncoding;
renderer1.render(scene1, camera1);
const renderer2 = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg2'),
});
renderer2.setPixelRatio(window.devicePixelRatio);
renderer2.setSize(window.innerWidth, window.innerHeight);
renderer2.shadowMap.enabled = true;
renderer2.shadowMap.type = THREE.PCFSoftShadowMap;
renderer2.outputEncoding = THREE.sRGBEncoding;
renderer2.render(scene2, camera2);

const vertices = [];
for(let i = 0; i < 10000; i++){
    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);

    vertices.push(x, y, z);
}
const stargeomtry = new THREE.BufferGeometry();
stargeomtry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

const starmaterial = new THREE.PointsMaterial({color:0xff3221, size: 3});
const stars = new THREE.Points(stargeomtry, starmaterial);
stars.castShadow = false;
stars.receiveShadow = true;
scene1.add(stars);

renderer1.render(scene1, camera1);

function tostars(){
    requestAnimationFrame(tostars);

    stars.rotation.x += 0.008;
    stars.rotation.y += 0.006;
    stars.rotation.z += 0.008;

    renderer1.render(scene1, camera1);
}
tostars();
const linematerial = new THREE.LineBasicMaterial({color: 0x0000ff});
const points = [];
for(let i = 0; i < 1000; i++){
    points.push(new THREE.Vector3(
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight,
    ));
    points.push(new THREE.Vector3(
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight
    ));
    points.push(new THREE.Vector3(
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight
    ));
}
const linegeomtry = new THREE.BufferGeometry();
linegeomtry.setFromPoints(points);

const lines = new THREE.Line(linegeomtry, linematerial);
lines.castShadow = false;
lines.receiveShadow = true;

scene2.add(lines);

function animate(){
    requestAnimationFrame(animate);

    lines.rotation.x += 0.006;
    lines.rotation.y += 0.008;
    lines.rotation.z += 0.006;

    renderer2.render(scene2, camera2);
}
animate();