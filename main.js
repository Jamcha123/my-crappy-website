import * as THREE from 'three';
import oc from 'three-orbit-controls';
import './style.css';

const orbit = oc(THREE);
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.setZ(30);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.render(scene, camera);

const controls = new orbit(camera, renderer.domElement);
const vertices = [];
for(let i = 0; i < 20000; i++){
    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);
        
    vertices.push(x, y, z);
}
const stargeomtry = new THREE.BufferGeometry();
stargeomtry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
const starmaterial = new THREE.PointsMaterial({color: 0xaaaaaa, size: 2.5});
    
const stars = new THREE.Points(stargeomtry, starmaterial);
scene.add(stars);
var starvelocity = 0;
var staraccerlation = 0.5;

var num = 0;

var posx = 0;
var posy = 0;
function animate(){
    requestAnimationFrame(animate);
    num++;
    posx++;
    posy++;

    starvelocity += staraccerlation;

    stars.position.z = starvelocity;
    stars.position.x = posx;
    stars.position.y = posy;
    scene.add(stars);

    if(num >= 200){
        num = 0;
        posx = 0;
        posy = 0;
        starvelocity = 0;
        stars.position.z = starvelocity;
    }

    renderer.render(scene, camera);
}
animate();