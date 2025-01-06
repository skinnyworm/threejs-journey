import './style.css';

import * as THREE from 'three';
import { initScene, tickTok } from './initScene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import GUI from 'lil-gui';

const { renderer, scene, camera, canvas } = initScene({ axisHelper: true });

// Light - From now on, we will use the AmbientLight and PointLight
// 环境光源 没有位置的概念，所有的物体接受的光强一致
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// 点光源 有一个位置的概念，物体接受辐射的能量与距离光源的距离成平方反比，即光强随距离的平方衰减
const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Material
const material = new THREE.MeshToonMaterial();
material.color = new THREE.Color(0x2194ce);

// Mesh
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
sphere.position.x = -1.5;
scene.add(sphere);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
scene.add(plane);

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32), material);
torus.position.x = 1.5;
scene.add(torus);

// controller and animation
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

// debug ui
const gui = new GUI();
gui.add(material, 'wireframe').name('wireframe');
gui.add(animSpeed, 'x').min(-1).max(1).step(0.1).name('rotation x speed');
gui.add(animSpeed, 'y').min(-1).max(1).step(0.1).name('rotation y speed');
