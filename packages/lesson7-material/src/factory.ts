import * as THREE from 'three';

type Vector3 = {
  x: number;
  y: number;
  z: number;
};

type Size2D = {
  width: number;
  height: number;
};

type Size3D = Size2D & {
  depth: number;
};

export const createScene = (options: { axisHelper?: Boolean }): THREE.Scene => {
  const scene = new THREE.Scene();
  if (options.axisHelper) {
    const axesHelper = new THREE.AxesHelper(2);
    scene.add(axesHelper);
  }
  return scene;
};

export const createPerspectiveCamera = (options: { initialPosition?: Vector3; fov?: number; aspectRatio: number }) => {
  const { initialPosition = { x: 0, y: 0, z: 0 }, fov = 75, aspectRatio } = options;
  const camera = new THREE.PerspectiveCamera(fov, aspectRatio);
  camera.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
  return camera;
};

export const createBox = (options: { size?: Size3D; position?: Vector3; color?: number; wireFrame?: boolean }) => {
  const {
    size = {
      width: 1,
      height: 1,
      depth: 1,
    },
    position = {
      x: 0,
      y: 0,
      z: 0,
    },
    color = 0xff0000,
    wireFrame = false,
  } = options;

  const geometry = new THREE.BoxGeometry(size.width, size.height, size.depth);
  const material = new THREE.MeshBasicMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.material.wireframe = wireFrame;
  mesh.position.set(position.x, position.y, position.z);
  return mesh;
};

export const createPlane = (options: { size: Size2D; color: number; rotation?: Vector3 }) => {
  const { size = { width: 1, height: 1 }, color = 0xffffff, rotation = { x: 0, y: 0, z: 0 } } = options;

  const geometry = new THREE.PlaneGeometry(size.width, size.height);
  const material = new THREE.MeshBasicMaterial({ color });
  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.set(rotation.x, rotation.y, rotation.z);
  return plane;
};
