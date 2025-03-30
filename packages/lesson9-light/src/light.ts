import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { initScene } from './initScene';

const gui = new GUI();
const { renderer, scene, camera, canvas } = initScene({ axisHelper: true });

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, 'metalness').min(0).max(1).step(0.001);
gui.add(material, 'roughness').min(0).max(1).step(0.001);

/**
 * Objects
 */

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;
plane.receiveShadow = true;

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1;
sphere.castShadow = true;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), material);
cube.position.x = 0.3;
scene.add(sphere, plane, cube);
cube.castShadow = true;

/**
 * Lights
 */

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0x00fffc, 2);
directionalLight.position.set(0, 0.5, 1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(directionalLightHelper);

// Hemisphere light
// const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9);
// scene.add(hemisphereLight);

// Point light
// const pointLight = new THREE.PointLight(0xff9000, 2, 0, 2);
// pointLight.position.set(1, 0, 1);
// scene.add(pointLight);
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1);
// scene.add(pointLightHelper);

// Spot light
// const spotLight = new THREE.SpotLight(0xffffff, 4.5, 10, Math.PI * 0.1, 0.25, 1);
// spotLight.position.set(0, 2, 3);
// spotLight.castShadow = true;
// scene.add(spotLight);

// spotLight.target.position.x = -0.75;
// scene.add(spotLight.target);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update the sphere
  // sphere.position.x = Math.cos(elapsedTime) * 1.5;
  // sphere.position.z = Math.sin(elapsedTime) * 1.5;
  // sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

  // // Update the shadow
  // sphereShadow.position.x = sphere.position.x;
  // sphereShadow.position.z = sphere.position.z;
  // sphereShadow.material.opacity = (1 - sphere.position.y) * 0.3;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
