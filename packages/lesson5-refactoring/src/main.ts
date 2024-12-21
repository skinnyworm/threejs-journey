import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createScene, createBox, createPlane, createPerspectiveCamera } from './factory';
// canvas size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const canvas = document.querySelector('canvas#webgl') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

const scene = createScene({ axisHelper: true });

const box = createBox({
  size: { width: 1, height: 1, depth: 1 },
  position: { x: 0, y: 0.5, z: 0 },
  color: 0xff0000,
  wireFrame: true,
});

const plane = createPlane({
  size: { width: 10, height: 10 },
  color: 0x333333,
  rotation: { x: -Math.PI / 2, y: 0, z: 0 },
});

const camera = createPerspectiveCamera({
  aspectRatio: sizes.width / sizes.height,
  initialPosition: { x: 0, y: 1, z: 2 },
});

scene.add(box);
scene.add(plane);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  box.rotation.y = elapsedTime;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();

// fit the window size
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);

  // pixel ratio
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// full screen
window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
