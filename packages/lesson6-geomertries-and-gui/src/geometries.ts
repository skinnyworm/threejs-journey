import './style.css';

import * as THREE from 'three';
import { initScene, tickTok } from './initScene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const { renderer, scene, camera, canvas } = initScene({ axisHelper: true });

// Create buffered geometry
const geometry = new THREE.BufferGeometry();
const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0]);
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute('position', positionsAttribute);

const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const controls = new OrbitControls(camera, canvas);
tickTok(() => {
  controls.update();
  renderer.render(scene, camera);
});
