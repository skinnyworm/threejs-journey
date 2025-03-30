import * as THREE from 'three';
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';
import skin from './assets/skin.png';
import green from './assets/green.png';
import red from './assets/red.png';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

export function loadMapcapTexture() {
  const allImages: Record<string, string> = {
    skin,
    green,
    red,
  };

  const textureLoader = new THREE.TextureLoader();
  return Object.keys(allImages).reduce<Record<string, THREE.Texture>>((acc, key) => {
    const matcapTexture = textureLoader.load(allImages[key]);
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    return { ...acc, [key]: matcapTexture };
  }, {});
}

export function loadEnvironmentMap(scene: THREE.Scene, path: string) {
  const rgbeLoader = new RGBELoader();
  rgbeLoader.load(path, (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = environmentMap;
    scene.background = environmentMap;
  });
}

export function addExampleLights(scene: THREE.Scene) {
  // 环境光源 没有位置的概念，所有的物体接受的光强一致
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  // 点光源 有一个位置的概念，物体接受辐射的能量与距离光源的距离成平方反比，即光强随距离的平方衰减
  const pointLight = new THREE.PointLight(0xffffff, 30);
  pointLight.position.x = 2;
  pointLight.position.y = 3;
  pointLight.position.z = 4;

  const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1, 0xffffff);
  scene.add(pointLightHelper);
  scene.add(pointLight);
}

export const createVertexNormals = (mesh: THREE.Mesh) => {
  return new VertexNormalsHelper(mesh, 0.1, 0xffffff);
};
