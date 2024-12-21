## Refactoring code

### Introduction

The objective of this lesson is to make the canvas use the whole browser client area. When the window resizes, so does the canvas and the content drawn on the surface. We also like to make it fullcreen like video player.

### Refacotring

We won't write the perfect code in the first go. We will refactor the code to make it better. We will make the code more readable and maintainable. Let's try to make the code we've written so far more readable and maintainable.

#### Module in nodejs

First we need put the relavant code in a module. We've already moved some repeated code into a function, but we can do better. We can put the code in a module and export the functions we need. This will make the code more readable and maintainable. Most of the function we've written so far are related to create geometry, scene and camera. Those functions are responsible for "creating" objects. We will notice it is a kind of pattern used so often in programming. This kind of pattern is called "Factory Pattern". We will create a module called "factory" and put all the functions related to creating objects in that module.

In NodeJS, a seperate file is a module, it can export function, object, variables for other module to use as long as you export it. We can export a function, object, variable, etc. by using `module.exports` object. We can import the exported object in another module by using `require` or `import` function.

factory.js

```javascript
import * as THREE from 'three';

type Vector3 = {
  x: number,
  y: number,
  z: number,
};

type Size2D = {
  width: number,
  height: number,
};

type Size3D = Size2D & {
  depth: number,
};

export const createScene = (options: { axisHelper?: Boolean }): THREE.Scene => {
  const scene = new THREE.Scene();
  if (options.axisHelper) {
    const axesHelper = new THREE.AxesHelper(2);
    scene.add(axesHelper);
  }
  return scene;
};

export const createBox = (options: { size?: Size3D, position?: Vector3, color?: number, wireFrame?: boolean }) => {
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

export const createPlane = (options: { size: Size2D, color: number, rotation?: Vector3 }) => {
  const { size = { width: 1, height: 1 }, color = 0xffffff, rotation = { x: 0, y: 0, z: 0 } } = options;

  const geometry = new THREE.PlaneGeometry(size.width, size.height);
  const material = new THREE.MeshBasicMaterial({ color });
  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.set(rotation.x, rotation.y, rotation.z);
  return plane;
};

export const createPerspectiveCamera = (options: { initialPosition?: Vector3, fov?: number, aspectRatio: number }) => {
  const { initialPosition = { x: 0, y: 0, z: 0 }, fov = 75, aspectRatio } = options;
  const camera = new THREE.PerspectiveCamera(fov, aspectRatio);
  camera.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
  return camera;
};
```

#### Type annotation helps your IDE and compiler to find the errors in earlier stage

In the code you'll notice that we've created few types. This will give the compiler and IDE to find the errors in the earlier stage. This will help you to write the code faster and with less errors. This will also help you to understand the code better.

For example, instead of defining type for position, rotation, scale etc, we can simply define a type called 'Vector3' and use it for describel position, rotation, scale etc. The is so called 'abstraction' 抽象化. We can use the same type for different purpose. This will make the code more readable and maintainable.

```javascript
type Vector3 = {
  x: number,
  y: number,
  z: number,
};
```

##### Node don't have named arguments, but we can use object to pass the arguments

In the code you'll notice that we've used object to pass the arguments. This will make the code more readable and maintainable. We can pass the arguments in any order. We can also pass the default value for the arguments. This will make the code more readable and maintainable.

```javascript

const createPlane = (options: { size: Size2D, color: number, rotation?: Vector3 }) => {...}
createPlane({ size: { width: 1, height: 1 }, color: 0xffffff, rotation: { x: 0, y: 0, z: 0 } });

//instead of

const createPlane = (size: Size2D, color: number, rotation?: Vector3) => {...}
createPlane({ width: 1, height: 1 }, 0xffffff, { x: 0, y: 0, z: 0 });

```

### Styles Sheet

### Fit the viewport

### Full screen mode

```

```
