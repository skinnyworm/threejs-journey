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
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.y = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// transformation
mesh.position.x = 0.7;
mesh.position.y = -0.6;
mesh.position.z = 1;

render.render(scene, camera);
