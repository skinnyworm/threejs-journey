import * as THREE from 'three';

import { createScene, createPerspectiveCamera } from './factory';

type InitSceneOptions = {
  axisHelper?: boolean;
};

export function initScene(options: InitSceneOptions) {
  // canvas size
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // camera
  const camera = createPerspectiveCamera({
    aspectRatio: sizes.width / sizes.height,
    initialPosition: { x: 0, y: 1, z: 2 },
  });

  // scene
  const scene = createScene(options);
  scene.add(camera);

  // canvas renderer
  const canvas = document.querySelector('canvas#webgl') as HTMLCanvasElement;
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);

  // fit the window size
  window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
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

  return { scene, camera, renderer, canvas };
}

export const tickTok = (fn: () => void) => {
  const tick = () => {
    fn();
    window.requestAnimationFrame(tick);
  };
  tick();
};
