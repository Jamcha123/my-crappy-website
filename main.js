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
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding; 
renderer.render(scene, camera);

const controls = new orbit(camera, renderer.domElement);

function init(){
    let y = 20000;
    const vertices = [];
    for(let i = 0; i < y; i++){
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

    var starvelocity = 0;
    var staracceraltion = 0.5;
    
    var num = 0;

    const lights = new THREE.AmbientLight(0xaaaaaa);
    scene.add(lights);

    function animate(){
        requestAnimationFrame(animate);
        num++;
    
        starvelocity += staracceraltion;
        stars.position.z = starvelocity;
    
        if(num >= 500){
            num = 0;
            starvelocity = 0;
        }
    
        renderer.render(scene, camera);
    }
    animate();
}
init();
