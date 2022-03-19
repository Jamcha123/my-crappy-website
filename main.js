import * as THREE from 'three';
import './style.css';

const scene = new THREE.Scene(); 

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 500);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
camera.position.set(0, 0, 100);
camera.lookAt(0,0,0);
renderer.render(scene, camera);

const material = new THREE.LineBasicMaterial({color:0x2214ff});

const points = [];
for(let i = 0; i < 1000; i++){
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
    points.push(new THREE.Vector3(
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight,
        Math.random() * window.innerWidth - window.innerHeight
    ));
}

const geomtry = new THREE.BufferGeometry().setFromPoints(points);

const lines = new THREE.Line(geomtry, material);

scene.add(lines);

function animate(){
    requestAnimationFrame(animate);

    lines.rotation.x += 0.01;
    lines.rotation.y += 0.01;
    lines.rotation.z += 0.01;

    renderer.render(scene, camera);
}
animate();