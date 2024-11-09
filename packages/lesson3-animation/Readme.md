## Animation

### Project skeleton

```javascript
import './style.css';
import * as THREE from 'three';

const sizes = {
  width: 800,
  height: 600,
};

const canvas = document.querySelector('canvas#webgl') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
material.wireframe = true;
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

renderer.render(scene, camera);
```

### requestAnimationFrame

Animation can be viewed as progression of object transformation. We call render at each frame to update the scene. The
function that you request to be called at each frame is `requestAnimationFrame`.

You provide a function to `requestAnimationFrame` as a callback. Then whenever the browser decide to show next frame, your
callback function is invoked.

**Callback** function is a very common pattern in JavaScript. It is a function that is passed as an argument to another
function. The function that receives the callback function will call it at some point. It is commonly used in event handling.
For example, when you click a button, the browser will call the callback function that you provided to handle the application
logic you want to do when the button is clicked. In this case, your code is hooked into the system event loop.

```javascript
const tick = () => {
  console.log('tick');
  window.requestAnimationFrame(tick);
};

tick();
```

We provided a tick function to `requestAnimationFrame`. Within the tick function, we call `requestAnimationFrame` with
tick again. So it will loop at each frame callback until the page is closed.

### Frame rate

Frame rate is the number of frames that are displayed in one second. It is measured in frames per second (fps). It was
a characteristic of the display device. The frame rate is the number of frames that are displayed in one second. The higher
the frame rate, the smoother the animation.

On the display device, it is also called refresh rate. It is the number of times the display is updated per second. The
gaming display can do 144Hz, normal display can do 60Hz, minimum is 30Hz. For example, at 144Hz, a 4K display need to
draw a 4K image 144 times per second.

```javascript
const tick = () => {
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
```

**Caution**: We moved `renderer.render` function call into the tick function.

The above code will rotate the mesh at each frame. The mesh will rotate 0.01 radian at each frame. If the display is 60Hz,
it will rotate 0.6 radian per second. If the display is 144Hz, it will rotate 1.44 radian per second.

### Using clock

There is a problem with the above code. The rotation speed is dependent on the display frame rate. User with different display
will see different animation speed. We need to make the animation based on time, not frame rate.

We can use javascript build in time function to get the time. We can use `Date.now()` to get the current time in milliseconds,
and calcuate the difference between the current time and the last time to know how much time has passed. And then make sure the
how much motion need to be updated during that time.

**BUT** there is a better way to do this. We can use `THREE.Clock` to do this. It is a utility class that can be used to get
time **elapsed** since the start of the clock. It is independent of the frame rate.

```javascript
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  mesh.rotation.y = elapsedTime;
  console.log(elapsedTime);
  window.requestAnimationFrame(tick);
};

tick();
```

Change the position in the tick function could also be fun.

```javascript
mesh.position.x = Math.cos(elapsedTime);
mesh.position.y = Math.sin(elapsedTime);
```

### Tween functions with gsap

Tween is a function that can be used to animate a value from one to another. It is a function that takes a value and a
time than it produce a linear interpolation between the value. The linear interpolation can be seen as a curve, while x
is the time, y is the value.

- [easing function curve](https://easings.net/)

_gsap_ is a library that can be used to do tweening. It is a very powerful library that can be used to do complex animation.

- [gsap](https://greensock.com/gsap/)

First, we need to install the library to our project.

```javascript
yarn add gsap
```

In last section we animated the position values in the tick function. We can use gsap to do the same thing. But as can
make it animate faster in the beginning and slower at the end. We can use easing function to do this.

```javascript
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

const tick = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
```