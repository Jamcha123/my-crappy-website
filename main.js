import * as THREE from 'three';
import oc from 'three-orbit-controls';
import './style.css';

const orbit = oc(THREE);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.setZ(30);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg1'),
});
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const controls = new orbit(camera, renderer.domElement);

const texture = new THREE.TextureLoader();
const loader = texture.load('https://4kwallpapers.com/images/walls/thumbs_3t/1765.jpg');

const spheregeomtry = new THREE.TorusGeometry(10, 4, 12);
const spherematerial = new THREE.MeshNormalMaterial({map: loader});

const sphere = new THREE.Mesh(spheregeomtry, spherematerial);

scene.add(sphere);

const pointlights = new THREE.PointLight(0x0000ff);
pointlights.position.set(5, 5, 5);
const ambientlight = new THREE.AmbientLight(0xffff32);

scene.add(pointlights, ambientlight);

const pointlightshelper = new THREE.PointLightHelper(pointlights);

scene.add(pointlightshelper);

const video = document.getElementById('rick');
const cubetexture = new THREE.TextureLoader().load('https://tse2.mm.bing.net/th?id=OIP.BPzWTd9QJK1HrgJjcFI8gAHaEK&pid=Api');
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(6, 6, 10),
    new THREE.MeshStandardMaterial({map: cubetexture})
);
scene.add(cube);
renderer.render(scene, camera);
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

    const starmaterial = new THREE.PointsMaterial({color: 0xffff32, size: 2.5});
    const stars = new THREE.Points(stargeomtry, starmaterial);
    scene.add(stars);

    function animate1(){
        requestAnimationFrame(animate1);

        stars.rotation.x += 0.008;
        stars.rotation.y += 0.008;
        stars.rotation.z += 0.008;

        renderer.render(scene, camera);
    }
    animate1();
}
addstars();
function animate(){
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.008;
    sphere.rotation.y += 0.006;
    sphere.rotation.z += 0.008;

    renderer.render(scene, camera);
}
animate();