import * as THREE from 'three';
import './style.css';

const scene1 = new THREE.Scene();

const scene2 = new THREE.Scene();

const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera1.position.setZ(30);

const camera2 = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 500);
camera1.position.set(0, 0, 100);
camera1.lookAt(0, 0, 0);

const camera3 = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / -2, window.innerHeight / 2, 1, 1000);
camera3.rotation.z = 1;
camera3.rotation.x = Math.PI / 2;

const renderer1 = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg1'),
});
renderer1.setPixelRatio(window.devicePixelRatio);
renderer1.setSize(window.innerWidth / 2, window.innerHeight);
renderer1.shadowMap.enabled = true;
renderer1.shadowMap.type = THREE.PCFSoftShadowMap;
renderer1.physicallyCorrectLights = true;
renderer1.outputEncoding = THREE.sRGBEncoding;
renderer1.render(scene1, camera1);

const text = new THREE.TextureLoader().load('http://images2.fanpop.com/images/photos/4100000/Rainbow-rainbows-4128014-1600-1200.jpg');

const Torusgeomtry = new THREE.TorusGeometry(25, 20, 20);
const TorusMaterial = new THREE.MeshStandardMaterial({map: text});

const torus = new THREE.Mesh(Torusgeomtry, TorusMaterial);
scene1.add(torus);

const lights1 = new THREE.AmbientLight(0xaaaaaa);

scene1.add(lights1);

function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x += 0.006;
    torus.rotation.y += 0.008;
    torus.rotation.z += 0.006;

    renderer1.render(scene1, camera1);
}
animate();
const vertices1 = [];
for(let i = 0; i < 100; i++){
    vertices1.push(new THREE.Vector3(
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight
    ));
    vertices1.push(new THREE.Vector3(
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight
    ));
    vertices1.push(new THREE.Vector3(
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight
    ));
}
const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight
    ),
    new THREE.Vector3(
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight
    ),
    new THREE.Vector3(
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight
    )
);
const points = curve.getPoints(50);
const linegeomtry = new THREE.BufferGeometry();
linegeomtry.setFromPoints(vertices1, points);

const linematerial = new THREE.LineBasicMaterial({color: 0xff3213});
const lines = new THREE.Line(linegeomtry, linematerial);
scene1.add(lines);

renderer1.render(scene1, camera2);
window.addEventListener('mousemove', (e) => {
    lines.rotation.x += 0.006;
    lines.rotation.y += 0.008;
    lines.rotation.z += 0.006;

    renderer1.render(scene1, camera2);
});
const renderer2 = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg2'),
});
renderer2.setPixelRatio(window.devicePixelRatio);
renderer2.setSize(window.innerWidth / 2, window.innerHeight);
renderer2.shadowMap.enabled = true;
renderer2.shadowMap.type = THREE.PCFSoftShadowMap;
renderer2.outputEncoding = THREE.sRGBEncoding;
renderer2.physicallyCorrectLights = true;
renderer2.render(scene2, camera1);

const vertices2 = [];
for(let j = 0; j < 10000; j++){
    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);

    vertices2.push(x, y, z);
}
const stargeomtry = new THREE.BufferGeometry();
stargeomtry.setAttribute('position', new THREE.Float32BufferAttribute(vertices2, 3));

const starmaterial = new THREE.PointsMaterial({color: 0xaaaaaa, size: 1.5});
const stars = new THREE.Points(stargeomtry, starmaterial);
scene2.add(stars);

renderer2.render(scene2, camera3);
window.addEventListener('mousemove', (e) => {
    stars.rotation.x += 0.008;
    stars.rotation.y += 0.006;
    stars.rotation.z += 0.008;

    renderer2.render(scene2, camera3);
});
