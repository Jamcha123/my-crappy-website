import * as THREE from 'three';
import './style.css';
import oc from 'three-orbit-controls';

const orbit = oc(THREE);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.setZ(30);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg1'),
});
renderer.setPixelRatio(window.setPixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.render(scene, camera);

const controls = new orbit(camera, renderer.domElement);

const vertices = [];
for(let i = 0; i < 200; i++){
    const x = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
    );
    const y = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
    );
    const z = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
    );
    vertices.push(x, y, z);
}
const linegeomtry = new THREE.BufferGeometry().setFromPoints(vertices);

const linematerial = new THREE.LineBasicMaterial({color: 0x0000ff});
const lines = new THREE.Line(linegeomtry, linematerial);
scene.add(lines);

var linevelocity = 0;
var lineaccelaration = 0.2;

var posx = 0;
var posy = 0;
var num = 0;
function animate(){
    requestAnimationFrame(animate);
    num++;

    linevelocity += lineaccelaration;
    lines.position.z = linevelocity;
    posx += 0.005;
    lines.rotation.x = posx;
    posy += 0.005;
    lines.rotation.y = posy;

    if(num >= 200){
        num = 0;
        posx = 0;
        posy = 0;
        linevelocity = 0;
    }
    renderer.render(scene, camera);
}
animate();