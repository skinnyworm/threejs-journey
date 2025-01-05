## 7. Material

This probably is the most important part of the 3D world. Material is what makes the object look like what it is.

Material determines the color of each pixel on each face of a geometry. The algorithm that calculate the color of the pixel is called `shader`. The shader is a **program** that runs on the GPU (Graphics Processing Unit). The language you use to write the shader is called `GLSL` (OpenGL Shading Language).

Three.js provides a lot of built-in materials (pre-programed shader). In many cases, you can also write your own shader and run it in Three.js.

We are going to introduce some of the build-in materials in this lesson. And we will cover more about the materials when we talk about light and texture.

There are few things you need to think about how the color of the pixel is calculated.

- The default color of the material.
- The strength of the light that hit the object. The color should be calculated based on the reflection of the light and the nature of the object material. Like coal reflects nothing and mirror reflects everything.
- The angle between the camera and the object. This is because the light reflect different from different angle.
- The distance between the camera of the object, with the assumption of that the pixel emit stronger when close to the camera and it become weaker when it is far from the camera. If it exceed a certain distance, it will not be visible.

### Material that don't need light

For the easy of calculation, some of the material determines the color of the pixel without the need of light. This is called `unlit material`. The color of the pixel is determined by the material itself. The color of the pixel is not affected by the light. They are normally the fastest and easiest to calculate.

#### MeshBasicMaterial

- **color** - The color of the material. Default is white.
- **wireframe** - A boolean that determine if the object is rendered as wireframe. Default is false.
- **opacity** - The opacity of the material. Default is 1.
- **map** - The texture of the material that is used to determine the color of the pixel.
- **alphaMap** - The texture of the material that is used to determine the opacity of the pixel.
- **side** - Render single side or both side of the face. Default is THREE.FrontSide, where is the upper direction of the normal of the face.

The color of the pixel is determined by the color of the material. The color of the pixel is not affected by the light. You can optional supply a color map (texture) to determine the color of each pixel. You can also supply an alpha map (texture) to determine the opacity of each pixel.

```javascript
const material = new THREE.MeshBasicMaterial();
material.color = new THREE.Color('#f00');
material.wireframe = false;
material.transparent = true;
material.opacity = 0.5;
```

#### MeshNormalMaterial

This material is used to visualize the normal of the face. The color of the pixel is determined by the angle between the normal of the face and the camera.

To better understand the normal of a face, we can use flat shadding to see the solid color of each face.

If the normal is direct toward the camera, the color of the pixel is blue. If the normal is perpendicular downwards the camera, the color of the pixel is red. If the normal is perpendicular upwards to the camera, the color of the pixel is green.

```javascript
const material = new THREE.MeshNormalMaterial();
material.wireframe = false;
material.flatShading = true;
material.side = THREE.FrontSide;
```

#### MeshMatcapMaterial

MeshMatcapMaterial is a material that use a special texture to determine the color of the pixel. The texture is called `matcap` or `lit sphere`. The color of the pixel is first determined by the angle between the normal of the face and the camera, it then uses the `matcap` texture as a lookup table to determine the color of the pixel.

![skin mapcap texture](https://www.alecjacobson.com/weblog/media/skin.png)
![red mapcap texture](https://www.alecjacobson.com/weblog/media/red.png)

You can use this simple material to create realistic looking object without the need of light. And the performance is way better than the material that need light.

Think about the `MeshMatcapMaterial` is just like a `MeshNOrmalMaterial` with a lookup table. Instead of renderring the color in reddish, bluish or greenish, it uses the `matcap` texture to determine the color of the pixel.

```javascript
import skin from './assets/skin.png';
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load(skin);

const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapTexture;
```

#### MeshDepthMaterial

### Material that need light to reflect its color

#### MeshLambertMaterial

#### MeshPhongMaterial

#### MeshToonMaterial

#### MeshStandardMaterial

#### MeshPhysicalMaterial

```

```
