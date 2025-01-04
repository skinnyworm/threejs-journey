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

#### MeshNormalMaterial

#### MeshMatcapMaterial

#### MeshDepthMaterial

### Material that need light to reflect its color

#### MeshLambertMaterial

#### MeshPhongMaterial

#### MeshToonMaterial

#### MeshStandardMaterial

#### MeshPhysicalMaterial
