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

This material is used to visualize the depth of the object. The color of the pixel is determined by the distance between the camera and the object. The closer the object is to the camera, the brighter the color of the pixel.

The rendered image is in grayscale. It can be used as **depth map** for **post-processing** and **composition**.

```javascript
const material = new THREE.MeshLambertMaterial();
```

### Material that need light to reflect its color

To create a more realistic looking object, we need to consider the light that hit the object. The color of the pixel is determined by the reflection of the light and the nature of the object material.

From this section, we are going to introduce few materials that need light to reflect its color. To prepare for the scene, we need to add two lights to the scene.

- AmbientLight - 环境光源，可以想象成是一团雾，光在微小的粒子中相互漫反射，最终形成一个均匀的光照。
- PointLight - 点光源，光源是一个点，光线是从这个点向四面八方发射的。太阳就是一个典型的点光源。

we will disccuss more about the light in the next lesson.

```javascript
// 环境光源 没有位置的概念，所有的物体接受的光强一致
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// 点光源 有一个位置的概念，物体接受辐射的能量与距离光源的距离成平方反比，即光强随距离的平方衰减
const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);
```

#### MeshLambertMaterial

This material is not physical based. The color of the pixel is determined by the angle between the normal of the face and the light. The color of the pixel is calculated by the **Lambertian reflectance** model.

The Lambertian reflectance model is a simple model that assumes the light is reflected equally in all directions. The color of the pixel is determined by the angle between the normal of the face and the light. The color of the pixel is brighter when the angle is closer to 0 degree and darker when the angle is closer to 90 degree.

[朗伯余弦定律](https://zh.wikipedia.org/wiki/%E6%9C%97%E4%BC%AF%E4%BD%99%E5%BC%A6%E5%AE%9A%E5%BE%8B)是光学中的一个基本定律，描述了光线照射到物体表面上时，光线与法线的夹角与反射光线的强度之间的关系。朗伯余弦定律表明，光线照射到物体表面上时，光线与法线的夹角越小，反射光线的强度越大。这是一个简化了的反射模型，仅适合漫反射的情况，即物体表面比较粗糙，反射光线在各个方向上都有可能。对镜子和金属等光滑表面，朗伯余弦定律不再适用，因为反射角可以是平行的而非在每个方向。

However, this model consider the angle between the normal and the light only. It doesn't consider the angle between the normal and the camera. The color of the pixel is the same no matter how you rotate the camera.

```javascript
const material = new THREE.MeshLambertMaterial();
material.color = new THREE.Color(0x2194ce);
```

If you look closely, you can see the color at the edge of the object is darker than the color at the center of the object. This is because the angle between the normal of the face and the light is larger at the edge of the object.

#### MeshPhongMaterial

This material is also not physical based. The color of the pixel is determined by the angle between the normal and the light. The color of the pixel is calculated by the **Phong reflectance model**.

Compare to the Lambertian reflectance model, the Phong reflectance model **also consider the angle between the normal and the camera**.

In Three.js, the `MeshPhongMaterial` is using **Blinn-Phong** reflectance model. An optimized version of the original Phong reflectance model. [局部光照模型(Blinn-Phong 反射模型)与着色方法(Phong Shading)](https://blog.csdn.net/qq_38065509/article/details/105691559)

- **shininess** - The shininess of the material. The higher the value, the smaller the highlight. Default is 30.
- **specular** - The color of the highlight. Default is white.

```javascript
const material = new THREE.MeshPhongMaterial();
material.color = new THREE.Color(0x2194ce);
material.specular = new THREE.Color(0x1188ff);
material.shininess = 100;
```

You should notice that the highlight is smaller when the shininess is larger. Can the color will change along with the camera.

#### MeshToonMaterial

This material is simlar to the `MeshLambertMaterial`. The color between 'Light' and 'Dark' is not continuous. The color is divided into several levels. Like you drawing a cartoon, you are very likely using solid color to fill the object, instead of using gradient color.

Unlike the `MeshLambertMaterial`, the `MeshToonMaterial` do consider the angle between the normal and the camera. You can observe that the color changed when the object/camera relative angle are changed.

```javascript
const material = new THREE.MeshToonMaterial();
material.color = new THREE.Color(0x2194ce);
```

#### MeshStandardMaterial

The MeshStandardMaterial in Three.js uses **[physically based rendering](https://marmoset.co/posts/basic-theory-of-physically-based-rendering)** principles short for **PBR**, which means that the color of the pixel is determined by the reflection of the light and the nature of the object material. Many of this material's properties are based on the **metallic-roughness** workflow.

- **roughness** : How rough the material appears. 0.0 means a smooth mirror reflection, 1.0 means fully diffuse.
- **metalness** : How much the material is like a metal. Non-metallic materials such as wood or stone use 0.0, metallic use 1.0, with nothing (usually) in between.

```javascript
const material = new THREE.MeshStandardMaterial();
material.color = new THREE.Color('#f00');
material.metalness = 0.45;
material.roughness = 0;
```

##### Enivronment Map

The reflection of the light are quite complicated. We will add an environment map to the scene to simulate the reflection of the light.

```javascript
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

export function loadEnvironmentMap(scene: THREE.Scene, path: string) {
  const rgbeLoader = new RGBELoader();
  rgbeLoader.load(path, (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = environmentMap;
    scene.background = environmentMap;
  });
}

loadEnvironmentMap(scene, './assets/venice_sunset_1k.hdr');
```

Once we've added the environment map, the object will reflect the light from the environment.

#### MeshPhysicalMaterial

The MeshPhysicalMaterial is an extension of the MeshStandardMaterial. It is a physically based rendering material that is based on the **metallic-roughness** workflow. It also includes properties for **transparency**, **emissive**, **clearcoat**, **clearcoatRoughness**, **reflectivity**, **refractionRatio**, **ior**

We will cover more about the material in the next lesson, when we talk about light and texture.
