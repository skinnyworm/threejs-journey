import GUI from 'lil-gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { addExampleLights } from './helpers';
import { initScene, tickTok } from './initScene';
import './style.css';

const { renderer, scene, camera, canvas } = initScene({ axisHelper: true });

addExampleLights(scene);

// Texture
const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load('/textures/door/color.jpg');
colorTexture.colorSpace = THREE.SRGBColorSpace;
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

// Material
const material = new THREE.MeshStandardMaterial();
material.wireframe = false;

// color map
material.map = colorTexture;
material.alphaMap = alphaTexture;

// metalness map
material.metalnessMap = metalnessTexture;
material.metalness = 0.7;

// roughness map
material.roughnessMap = roughnessTexture;
material.roughness = 0.2;

// normal map
material.normalMap = normalTexture;
material.normalScale.x = 1;
material.normalScale.y = 1;

// displacement map
material.displacementMap = heightTexture;
material.displacementScale = 0.04;

// ambient occlusion map
material.aoMap = ambientOcclusionTexture;
material.aoMapIntensity = 1;

// Mesh
const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1, 32, 32, 32), material);
console.log(cube.geometry.attributes.uv);
scene.add(cube);

// controller and animation
const controller = new OrbitControls(camera, canvas);
const clock = new THREE.Clock();
const animSpeed = {
  y: 0.0,
  x: 0.0,
};
tickTok(() => {
  controller.update();
  const elapsedTime = clock.getElapsedTime();
  cube.rotation.y = animSpeed.y * elapsedTime;
  cube.rotation.x = animSpeed.x * elapsedTime;
  renderer.render(scene, camera);
});

// debug ui
const gui = new GUI();
gui.add(material, 'wireframe').name('wireframe');
gui.add(animSpeed, 'x').min(-1).max(1).step(0.1).name('rotation x speed');
gui.add(animSpeed, 'y').min(-1).max(1).step(0.1).name('rotation y speed');

gui.add(material, 'metalness').min(0).max(1).step(0.0001).name('material metalness');
gui.add(material, 'roughness').min(0).max(1).step(0.0001).name('material roughness');
gui.add(material, 'displacementScale').min(0).max(0.2).step(0.0001).name('material displacement scale');
gui.add(material, 'aoMapIntensity').min(0).max(1).step(0.0001).name('material ambient occlusion intensity');
gui.add(material.normalScale, 'x').min(0).max(1).step(0.0001).name('material normal scale x');
gui.add(material.normalScale, 'y').min(0).max(1).step(0.0001).name('material normal scale y');
