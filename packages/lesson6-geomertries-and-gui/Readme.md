## 6. Geometries and GUI

In this lesson, we are going to explore different geometries and how to use GUI to change the properties of the geometries.

### Geometries

In Three.js, geomertries represent the **vertices** and **faces**. It also stores the **normals**, **UV coordinates**, and other attributes related to the geometry.

- **Vertices** are the points in the 3D space. 是 Vertex 的复数形式，表示 3D 空间中的点,数据类型为 Vector3D, 即三维向量。
- **Faces** are the triangles that connect the vertices. It is important to note that the faces are always triangles.
- **Normals** are the vectors that are perpendicular to the faces. 法线是垂直于面的向量, 用于计算光照。
- **UV coordinates** are the coordinates that map the texture to the geometry. UV 坐标是将纹理映射到几何体的坐标。

#### Create geometries by using pre-defined geometry functions

Three.js provides a set of pre-defined geometries. We can use these geometries to create 3D objects. You don't need to specify the vertices and faces of the geometry. For example, to create a cube, you can use `THREE.BoxGeometry`. By specifying the width, height, and depth of the cube, you can create a cube.

```javascript
const geometry = new THREE.BoxGeometry(2, 2, 1); // Create a cube with width 2, height 2, and depth 1
```

The pre-defined geometry functions are:

- [BoxGeometry](https://threejs.org/docs/#api/en/geometries/BoxGeometry) To create a box.
- [PlaneGeometry](https://threejs.org/docs/#api/en/geometries/PlaneGeometry) To create a rectangle plane.
- [CircleGeometry](https://threejs.org/docs/#api/en/geometries/CircleGeometry) To create a disc or a portion of a disc (like a pie chart).
- [ConeGeometry](https://threejs.org/docs/#api/en/geometries/ConeGeometry) To create a cone or a portion of a cone. You can open or close the base of the cone.
- [CylinderGeometry](https://threejs.org/docs/#api/en/geometries/CylinderGeometry) To create a cylinder. You can open or close the ends of the cylinder and you can change the radius of each end.
- [RingGeometry](https://threejs.org/docs/#api/en/geometries/RingGeometry) To create a flat ring or portion of a flat circle.
- [TorusGeometry](https://threejs.org/docs/#api/en/geometries/TorusGeometry) To create a ring that has a thickness (like a donut) or portion of a ring.
- [TorusKnotGeometry](https://threejs.org/docs/#api/en/geometries/TorusKnotGeometry) To create some sort of knot geometry.
- [DodecahedronGeometry](https://threejs.org/docs/#api/en/geometries/DodecahedronGeometry) To create a 12 faces sphere. You can add details for a rounder sphere.
- [OctahedronGeometry](https://threejs.org/docs/#api/en/geometries/OctahedronGeometry) To create a 8 faces sphere. You can add details for a rounder sphere.
- [TetrahedronGeometry](https://threejs.org/docs/#api/en/geometries/TetrahedronGeometry) To create a 4 faces sphere (it won't be much of a sphere if you don't increase details). You can add details for a rounder sphere.
- [IcosahedronGeometry](https://threejs.org/docs/#api/en/geometries/IcosahedronGeometry) To create a sphere composed of triangles that have roughly the same size.
- [SphereGeometry](https://threejs.org/docs/#api/en/geometries/SphereGeometry) To create the most popular type of sphere where faces looks like quads (quads are just a combination of two triangles).
- [ShapeGeometry](https://threejs.org/docs/#api/en/geometries/ShapeGeometry) To create a shape based on a path.
- [TubeGeometry](https://threejs.org/docs/#api/en/geometries/TubeGeometry) To create a tube following a path.
- [ExtrudeGeometry](https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry) To create an extrusion based on a path. You can add and control the bevel.
- [LatheGeometry](https://threejs.org/docs/#api/en/geometries/LatheGeometry) To create a vase or portion of a vase (more like a revolution).
- [TextGeometry](https://threejs.org/docs/?q=textge#examples/en/geometries/TextGeometry) To create a 3D text. You'll have to provide the font in typeface json format.

All those geomerty functions are using mathematical formulas to calculate the vertices and faces based on the parameters you provide. You can also create your own geometry by specifying the vertices and faces manually.

#### Create geometries with vertices by using `BufferGeometry`

When create your own geometry, you can use `BufferGeometry`. `BufferGeometry` is more efficient than `Geometry` because it uses `Float32Array` to store the vertices and faces. You can create a `BufferGeometry` by specifying the vertices and faces manually.

```javascript
// Create an empty BufferGeometry

const positionsArray = new Float32Array([
  0,
  0,
  0, // First vertex (0,0,0)
  0,
  1,
  0, // Second vertex (0,1,0)
  1,
  0,
  0, // Third vertex (1,0,0)
]);

const geometry = new THREE.BufferGeometry();
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute('position', positionsAttribute);
```

#### Create geometries with modleing software

You can also create geometries with 3D modeling software like Blender, Maya, 3ds Max, etc. You can export the geometries in the format that Three.js can read. For example, you can export the geometries in the `glTF` format and load the geometries with `GLTFLoader`.

### GUI

There are some many moving parts in a 3D scene. It is hard to control the properties of the objects in the scene. To find the best properties for the objects, you need to change the properties and see the result. To make this process easier, you can use debug GUI (Graphical User Interface) to change the properties of the objects in the scene.

We will use (lil-gui)[https://lil-gui.georgealways.com] in this lesson. It is a simple GUI library that allows you to create a GUI to change the properties of the objects in the scene.

to instlal the library, run the following command:

```bash
yarn add lil-gui
```

#### Create the debug GUI

To create the debug GUI, you need to create a GUI object and add the properties you want to change. You can add the properties of the object in the scene to the GUI. For example, you can add the position, rotation, and scale of the object to the GUI.

```javascript
import { GUI } from 'lil-gui';

...

const gui = new GUI();
gui.add(box.position, 'x', -10, 10).name('Box position x');
```

#### debug GUI let you change the properties of the any object

You can add properties of any object to the GUI to be changed via the GUI.

- You can change x,y,z valules or Vector3 object which is used to represent the position, rotation, and scale of the object.
- You can change properties of the objects like material color, wireframe, opacity, etc.
- You can also change the properties of your custom object like animation properties, etc.

```javascript
// ---------------
// debug gui
// ---------------
const gui = new GUI();

// box position is vector3D, has `x`, `y`, `z` properties
gui.add(box.position, 'x').min(-1).max(1).step(0.01).name('box x position');
gui.add(box.position, 'y').min(-1).max(1).step(0.01).name('box y position');
gui.add(box.position, 'z').min(-1).max(1).step(0.01).name('box z position');

// box material has `wireframe` and `color` property
gui.add(box.material, 'wireframe').name('box wireframe');
gui.addColor(box.material, 'color').name('box color`');

// anim is a custom object with `speed` property
gui.add(anim, 'speed').min(0).max(5).step(0.1).name('animation speed');
```
