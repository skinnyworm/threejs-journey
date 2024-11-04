## Camera and Control

### Type of cameras in Three.js

- **Array Camera** - It is a camera that is used to render a scene from multiple perspectives.
- **Stereo Camera** - It renders a scene throw two camera to simulate human eyes. It is used in VR to create stero image.
- **Cube Camera** - It is used to render a scene from the center of a cube. It is used to create environment map.
- **Orthographic Camera** - It is used to render a scene without perspective. It is used in board game, architectural rendering.
- **Perspective Camera** - It is used to render a scene with perspective. It is used in 3D games, 3D modeling.

### Perspective camera

A perspective camera is the most common camera in 3D graphics. It is used to render a scene with perspective. To create
a perspective camera, you need to provide the

- Field of view
- Aspect ratio
- Near and far plane.

```javascript
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100);
```

### OrthographicCamera

It different to the perspective camera. Object will have the same size regardless of the distance to the camera. There
is no FOV in orthographic camera. Instead, your specify left, right, top, bottom, that the camera can see. Also you need
to specify near and far plane.

```javascript
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
```

### Control camera by mouse move

#### Event handler

Javascript is running on a single thread within a event loop in the browser window. When you move the mouse, the browser will fire an event to your javascript code. It will start to execute the code until it is finished, then it will pick up the next event and execute the code in that event handler. If you have a long running code, it will block the event loop and the browser will be unresponsive.

We are going to listen to the mouse move event and update the camera position based on the mouse move.

```javascript
window.addEventListener('mousemove', (event) => {
  console.log(event.clientX, event.clientY);
});
```

**Remember** the event handler is a callback function provided to the addEventListener function. The event handler will be executed when the mouse move event is fired.

This code will register a move move event listener function to the windows sytesm and get executed when the mouse move. The event object contains the clientX and clientY properties that represent the mouse position in the window.

#### Normalize the mouse position

The `clientX` and `clientY` are actual postion on the screen. We want to use a size independent position and between -0.5 and 0.5. We can use the following code to calculate the normalized position.

```javascript
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
  console.log(cursor.x, cursor.y);
});
```

**Think about** why we need to invert the y position? What is the range of the cursor.x and cursor.y?

Now the cursor.x and cursor.y are values between -0.5 and 0.5, which represent the normalized position of the mouse.

#### Update the camera position

Finally we can update the camera position based on the mouse move by
using the current custor position.

```javascript
const tick = () => {
  camera.position.x = cursor.x * 5;
  camera.position.y = cursor.y * 5;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
```

Above code move the camera on an XY plane.

**DIY:** How to move the camera around the origin on the XZ plane?

```javascript
camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 4;
camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 4;
```

### Three.js build in controls

Write a control could be tedious and error prone. Three.js provides a set of build in controls to help you control the camera.

- **OrbitControls** - It allows you to orbit around a target point.
- **FlyControls** - It is control the camera like a flight simulator. allow camera to rotate on 3 axis and move forward and backward.
- **FirstPersonControls** - It is control the camera like a first person game. It allow camera to rotate on 2 axis and move forward and backward.
- **PointerLockControls** - In FPS game, there are two set of controls. One is move the camera, another is lock the target while moving. This is the second type of control, lock the target and move.

and many more.

#### OrbitControls

All the controls are in the `examples/jsm/controls`. You need to import the control you want to use.

#### OrbitControls Example

Move and drag the mouse to orbit around the target.

```javascript
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const controls = new OrbitControls(camera, canvas);

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
```

#### FirstPersonControls Example

Move the camera like a first person game using A,S,D,W keys.

```javascript
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

const controls = new FirstPersonControls(camera, canvas);

const tick = () => {
  controls.update(0.01);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
```
