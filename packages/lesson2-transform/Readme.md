## Transform

### Introduction

Transform means three things in computer graphics:

- **Translation**: Move an object from one place to another.
- **Rotation**: Rotate an object around a point.
- **Scale**: Resize an object.

### Axes Helper

The Axes helper will display the X, Y, and Z axes in the scene. This is useful for debugging purposes. 3 lines
corresponding to x,y and z. X-axis is red, Y-axis is green, and Z-axis is blue.

```javascript
const axesHelper = new THREE.AxesHelper(2); // 2 is the size of the axes;
scene.add(axesHelper);
```

### Translate

Set position of an object in 3D space. Add offset to the position.

```javascript
mesh.position.x += 0.7;
mesh.position.y -= 0.6;
mesh.position.z += 1;

camera.position.z = 5;
camera.lookAt(mesh.position); // Camera will look at the mesh.
console.log(mesh.position);
console.log(mesh.position.length()); // 1.3601470508735443
console.log(mesh.position.distanceTo(camera.position)); // 4.364630568559039
console.log(mesh.position.normalize()); // Vector3 {x: 0.5146502354656655, y: -0.4411287732562847, z: 0.7352146220938078}
```

- **length** is the distance from the origin.
- **distanceTo** is the distance between two points.
- **normalize** is the unit vector. (eg. length = 1)

### Scale

Scale an object in 3D space. Scale on a **mesh** is a vector3 object. The default scale is (1,1,1). Each scale component should be positive value.

```javascript
mesh.scale.x = 2;
mesh.scale.y = 0.25;
mesh.scale.z = 0.5;
```

### Rotate

Rotation is a bit tricky. It is done in radians. 360 degrees = 2 \* Math.PI. The rotation is done on the object's local axis.

```javascript
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;
```

### Grouping

You might want to group objects together. This is useful when you want to move, rotate, or scale multiple objects together.

```javascript
const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
cube1.position.x = -1.5;
group.add(cube1);

const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
cube2.position.x = 0;
group.add(cube2);

const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
cube3.position.x = 1.5;
group.add(cube3);
```
