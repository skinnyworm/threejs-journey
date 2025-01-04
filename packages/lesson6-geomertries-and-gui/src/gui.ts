import './style.css';

import * as THREE from 'three';
import { initScene, tickTok } from './initScene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createBox, createPlane } from './factory';
import GUI from 'lil-gui';

const { renderer, scene, camera, canvas } = initScene({ axisHelper: true });

// ---------------
// build the scene
// ---------------
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

scene.add(box);
scene.add(plane);

// ---------------
// animation loop
// ---------------
let anim = {
  speed: 0.5,
};
const controls = new OrbitControls(camera, canvas);
const clock = new THREE.Clock();
tickTok(() => {
  controls.update();
  const elapsedTime = clock.getElapsedTime() * anim.speed;
  box.rotation.y = elapsedTime;
  renderer.render(scene, camera);
});

// ---------------
// debug gui
// ---------------
const gui = new GUI();

// box position is vector3D, has `x`, `y`, `z` properties
gui.add(box.position, 'x').min(-1).max(1).step(0.01).name('box x position');
gui.add(box.position, 'y').min(-1).max(1).step(0.01).name('box y position');
gui.add(box.position, 'z').min(-1).max(1).step(0.01).name('box z position');

// box material has `wireframe` and `color` property
gui.add(box.material, 'wireframe').name('box wireframe');
gui.addColor(box.material, 'color').name('box color`');

// anim is a custom object with `speed` property
gui.add(anim, 'speed').min(0).max(5).step(0.1).name('animation speed');
