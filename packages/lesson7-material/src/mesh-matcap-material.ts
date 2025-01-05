import './style.css';

import * as THREE from 'three';
import { initScene, tickTok } from './initScene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { loadMapcapTexture } from './helpers';

const { renderer, scene, camera, canvas } = initScene({ axisHelper: true });

const matcapTextures = loadMapcapTexture();
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapTextures['skin'];
material.flatShading = false;

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
sphere.position.x = -1.5;
scene.add(sphere);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
scene.add(plane);

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32), material);
torus.position.x = 1.5;
scene.add(torus);

const controller = new OrbitControls(camera, canvas);
const clock = new THREE.Clock();
const animSpeed = {
  y: 0,
  x: 0,
};
tickTok(() => {
  controller.update();
  const elapsedTime = clock.getElapsedTime();
  sphere.rotation.y = animSpeed.y * elapsedTime;
  plane.rotation.y = animSpeed.y * elapsedTime;
  torus.rotation.y = animSpeed.y * elapsedTime;

  sphere.rotation.x = animSpeed.x * elapsedTime;
  plane.rotation.x = animSpeed.x * elapsedTime;
  torus.rotation.x = animSpeed.x * elapsedTime;

  renderer.render(scene, camera);
});

const gui = new GUI();
gui.add(plane.position, 'y').min(-5).max(5).step(0.1).name('plane y position');
gui.add(animSpeed, 'x').min(-1).max(1).step(0.1).name('rotation x speed');
gui.add(animSpeed, 'y').min(-1).max(1).step(0.1).name('rotation y speed');
gui.add(material, 'matcap', matcapTextures).name('matcap textures');
