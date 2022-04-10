import * as THREE from 'three';
import './style.css';
import oc from 'three-orbit-controls';

const orbit = oc(THREE);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100000);
camera.position.setZ(30);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg1'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights = true;
renderer.render(scene, camera);

const controls = new orbit(camera, renderer.domElement);

const torusgeomtry = new THREE.TorusGeometry(7, 5, 4);
const torusmaterial = new THREE.MeshStandardMaterial({color: 0x0000ff});

const torus = new THREE.Mesh(torusgeomtry, torusmaterial);
scene.add(torus);

const pointlights = new THREE.PointLight(0x0000ff);
pointlights.position.set(20, 20, 20);

const ambientlights = new THREE.AmbientLight(0x0000ff);
scene.add(ambientlights, pointlights);

const pointlighthelper = new THREE.PointLightHelper(pointlights);

scene.add(pointlighthelper);

function addstars(){
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
    scene.add(stars);

    renderer.render(scene, camera);
}
addstars();
function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.02;
    torus.rotation.z += 0.01;

    renderer.render(scene, camera);
}
animate();