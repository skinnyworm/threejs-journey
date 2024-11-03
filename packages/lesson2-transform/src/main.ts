import './style.css';
import * as THREE from 'three';

const sizes = {
  width: 800,
  height: 600,
};

const canvas = document.querySelector('canvas#webgl') as HTMLCanvasElement;
const render = new THREE.WebGLRenderer({ canvas });
render.setSize(sizes.width, sizes.height);

const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// // transformation;
// mesh.position.x += 0.7;
// mesh.position.y -= 0.6;
// mesh.position.z += 1;

// // scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.25;
// mesh.scale.z = 0.5;

// // rotation
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.y = Math.PI * 0.25;

// group
const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
cube1.position.x = -1.5;
group.add(cube1);

const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
cube2.position.x = 0;
group.add(cube2);

const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
cube3.position.x = 1.5;
group.add(cube3);

camera.position.z = 5;
camera.position.y = 1;
camera.lookAt(cube2.position);

console.log(mesh.position);
console.log(mesh.position.length()); // 1.3601470508735443
console.log(mesh.position.distanceTo(camera.position)); // 4.364630568559039
console.log(mesh.position.normalize()); // Vector3 {x: 0.5146502354656655, y: -0.4411287732562847, z: 0.7352146220938078}

render.render(scene, camera);
