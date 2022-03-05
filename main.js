import * as THREE from 'three';
import './style.css';

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / -2, window.innerHeight / 2, 1, 1000);
camera.rotation.z = 1;
camera.rotation.x = Math.PI / 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights = true;
document.body.appendChild(renderer.domElement);
camera.position.setZ(30);
renderer.render(scene, camera);

const lights = new THREE.DirectionalLight(0xaaaaaa);
lights.position.set(0, 1, 0);
lights.castShadow = true;

lights.shadow.mapSize.width = 512;
lights.shadow.mapSize.height = 512;
lights.shadow.camera.near = 0.1;
lights.shadow.camera.far = 1000;

scene.add(lights);
for(let i = 0; i < 100; i++){
    
    const dountgeomtry = new THREE.TorusGeometry(40, 40, 40);
    const dountmaterial = new THREE.MeshStandardMaterial({color:0xffffff32});
    const dount = new THREE.Mesh(dountgeomtry, dountmaterial);
    dount.castShadow = true;
    dount.receiveShadow = true;

    dount.position.x = Math.random() * window.innerWidth - window.innerHeight;
    dount.position.y = Math.random() * window.innerWidth - window.innerHeight;
    dount.position.z = Math.random() * window.innerWidth - window.innerHeight;

    scene.add(dount);
    renderer.render(scene, camera);
    if(i >= 100){
        continue;
    }
}
function animate(){
    requestAnimationFrame(animate);

    dount.rotation.x += 0.01;
    dount.rotation.y += 0.02;
    dount.rotation.z += 0.01;

    renderer.render(scene, camera);
}
animate();