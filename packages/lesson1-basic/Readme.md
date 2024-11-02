## Lesson 1 - Basic setup

### Node, Typescript, Vite

- Node is a runtime based on Google V8 engine, it allows to run Javascript code outside of the browser.
- Typescript is a superset of Javascript that adds static typing to the language.
- Vite is a build tool that allows to run a development server and build the project for production.

### 1. Initialize a new package with vite

```bash
yarn create vite lesson1-basic

✔ Select a framework: › Vanilla
✔ Select a variant: › TypeScript
```

### 2. Project structure

- `package.json` - Project configuration file
- `index.html` - Entry point of the application
- `tsconfig.json` - Typescript configuration file
- `src/` - Source code of the application
- `node_modules/` - Dependencies of the project

### 3. HTML and styles

insert following code into `index.html`

```html
<body>
  <div id="app">
    <h1>Lesson 1 - Basic</h1>
    <canvas id="webgl"></canvas>
  </div>
</body>
```

### 4. Load code in HTML

We are going to use typescrip for this project.

Typescript source code can be organized as module. Each `.ts` can be considered as a module. Use `import` to import other modules. and use `export` to export code for other modules. Relaated modules can be put into a package and export them in `index.ts` file.

To load code in web browser, we use `script` tag in HTML

```html
<script type="module" src="/src/main.ts"></script>
```

It is now possible to use module in web, but we need to compile typescript to javascript first. To minimize the size of the code loaded into the browser. We only extract code we need from different packages and compile them into a single file. This is called bundling.

The process of compile ts code to js code and extract code from different packages and put it into a single bundle is quite tedious. We can use build tools to automate this process.

`vite` is a build tool that allows to run a development server and build the project for production. It uses `esbuild`, which is written in `rust`, to compile and bundling.

### 5. Code the first 3D scense

The browser is a layout engine that create complex view from HTML/CSS language. HTML describe the structure of the view, CSS describe the style of the view.

#### Canvas

But the browser is not a 3D engine. It can not render 3D objects directly. We need to use WebGL to render 3D objects in the browser. The plase where renderring is happening is called canvas. It is a 2D grid of pixels. We can draw 3D objects on the canvas by using WebGL API.

```typescript
import * as THREE from 'three';
const canvas = document.querySelector('canvas#webgl') as HTMLCanvasElement;
```

#### WEBGL Renderer

Once we have the canvas, we can create a renderer and a scene.

```typescript
const sizes = {
  width: 800,
  height: 600,
};
const render = new THREE.WebGLRenderer({ canvas: canvas });
render.setSize(sizes.width, sizes.height);
```

#### Scene

Any 3D object need to be located in a scene. The scene is a container of 3D objects.

```typescript
const scene = new THREE.Scene();
```

#### Scene

There are many different types of 3D object. Like Camera, Light, Mesh. Mesh is where a actual 3D shape is defined.

To define a 3D shape, we need to define a geometry and a material. The geometry is the shape of the object. The material is the color of the object.

```typescript
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const boxMesh = new THREE.Mesh(geometry, material);
scene.add(boxMesh);
```

#### Camera

We have a box in the scene, but it is not project to any visual surface. We need a camera to project the 3D scene to a 2D surface.

Camera is a 3D object that has a position and a direction. It is like a camera in real world.And it need to be in the scene to project other 3D objects.

- FOV: Field of view, how wide the camera can see
- Aspect ratio: The ratio of the width and height of the camera
- Near and far: The distance of the camera can see

```typescript
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.y = 3;
camera.lookAt(boxMesh.position);
scene.add(camera);
```

#### Render the scene

Now it is time to render the scene. We need to tell the renderer to render the scene from the camera's perspective.

```typescript
render.render(scene, camera);
```

### 6. Run the project

```bash
vite dev
```
