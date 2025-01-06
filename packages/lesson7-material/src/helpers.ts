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

export const createVertexNormals = (mesh: THREE.Mesh) => {
  return new VertexNormalsHelper(mesh, 0.1, 0xffffff);
};
