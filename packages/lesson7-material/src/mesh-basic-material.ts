import './style.css';

import * as THREE from 'three';
import { initScene, tickTok } from './initScene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

const { renderer, scene, camera, canvas } = initScene({ axisHelper: true });

const material = new THREE.MeshBasicMaterial();
material.color = new THREE.Color('#f00');
material.wireframe = false;
material.transparent = true;
material.opacity = 0.9;

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
tickTok(() => {
  controller.update();
  const elapsedTime = clock.getElapsedTime();
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = -0.15 * elapsedTime;
  plane.rotation.x = -0.15 * elapsedTime;
  torus.rotation.x = -0.15 * elapsedTime;

  renderer.render(scene, camera);
});

const gui = new GUI();
gui.add(plane.position, 'y').min(-5).max(5).step(0.1).name('plane y position');
