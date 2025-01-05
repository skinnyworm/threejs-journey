import * as THREE from 'three';
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';
import skin from './assets/skin.png';
import green from './assets/green.png';
import red from './assets/red.png';

export const loadMapcapTexture = () => {
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
};

export const createVertexNormals = (mesh: THREE.Mesh) => {
  return new VertexNormalsHelper(mesh, 0.1, 0xffffff);
};
