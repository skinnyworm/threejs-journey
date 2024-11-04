import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

// canvas size
const sizes = {
  width: 800,
  height: 600,
};

// cusor position
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

const createPlaneMesh = (width: number, height: number, color: number) => {
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshBasicMaterial({ color });
  const plane = new THREE.Mesh(geometry, material);
  return plane;
};

const createBoxMesh = (width: number, height: number, depth: number, color: number) => {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshBasicMaterial({ color });
  const box = new THREE.Mesh(geometry, material);
  return box;
};

const canvas = document.querySelector('canvas#webgl') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const plane = createPlaneMesh(10, 10, 0x333333);
scene.add(plane);
plane.rotation.x = -Math.PI / 2;

const box = createBoxMesh(1, 1, 1, 0xffffff);
scene.add(box);
box.position.y = 0.5;
box.material.wireframe = true;

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0, 100);
scene.add(camera);
camera.position.z = 2;
camera.position.y = 1;
// camera.lookAt(new THREE.Vector3(0, 0, 0));

// render.render(scene, camera);
// const controls = new OrbitControls(camera, canvas);
const fpsControl = new FirstPersonControls(camera, canvas);
// fpsControl.activeLook = true;

const tick = () => {
  // camera.position.x = cursor.x * 5;
  // camera.position.y = cursor.y * 5;

  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 4;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 4;
  // camera.position.y = cursor.y * 3;
  // camera.lookAt(new THREE.Vector3(0, 0, 0));

  // controls.update();
  fpsControl.update(0.01);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
