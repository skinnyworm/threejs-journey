## 8. Texture

Textures, as you probably know, are images that will cover the surface of your geometries. They are used to give a more realistic look to your models, and can be used to simulate a wide range of materials, from wood to metal, from fabric to glass.

But since we've just learned materials, you might be wondering: what's the difference between a material and a texture? Well, the material is the set of properties that define how light interacts with the surface of an object. The properties that affects the color of the object includes normal, color, reflectness, roughness, metalness etc. However, when rendering on a face, those properties are the same for the **whole face**. Textures, on the other hand can be think of as a way to define different properties on the **pixel level**. For example, a **color-map** is the color of each pixel on the face, a **normal-map** is the normal of each pixel on the face, etc.

#### Color (or Albedo)

The albedo texture is the most simple one. Each pixel is in RGB format, and will be used as the color of the corresponding pixel on the geometry.

<img src="https://github.com/skinnyworm/threejs-journey/blob/main/packages/lesson8-texture/public/textures/door/color.jpg" width="300" alt="color-map">

#### Alpha

The alpha texture is a grayscale image in a scale between transparent and opaque. It will be used to define the transparency of the corresponding pixel on the geometry. The following example should be white, which is fully opaque. (0 - 255)

<img src="https://github.com/skinnyworm/threejs-journey/blob/main/packages/lesson8-texture/public/textures/door/alpha.jpg" width="300" alt="alpha-map">

#### Height (or Displacement)

The height texture is a grayscale image, each pixel is 8 bits (0 - 255). It will be used to define the height of the corresponding pixel on the geometry. Given 0 is flat, 255 should have the higest scale of height at that pixel. eg. a bump map or displacement map that will raise the surface of the geometry. It is used to simulate the landscape with uneven surface.

<img src="https://github.com/skinnyworm/threejs-journey/blob/main/packages/lesson8-texture/public/textures/door/height.jpg" width="300" alt="height-map">

#### Normal

We have discussed normal a lot in previous lessons. Each pixel of the normal texture represent the normal vector at that pixel. Since a normal vector is a 3D unit vector, it requires 3 vaule to represent the scale of x, y, z. For example (0, 0, 1) is the normal vector that points upwards alone to the z-axis. Given each pixel of the texture has 3 values, it is very common to use RGB format to represent the normal vector. With blue is pointing to the z-axis, red is pointing to the x-axis, and green is pointing to the y-axis.

<img src="https://github.com/skinnyworm/threejs-journey/blob/main/packages/lesson8-texture/public/textures/door/normal.jpg" width="300" alt="normal-map">

#### Ambient Occlusion

The normal texture can be used to reflect light to different direction on the surface. However, in case the ambient light the normal won't have that effect. The ambient occlusion texture is a grayscale image, each pixel is 8 bits (0 - 255). It will be used to define the occlusion of the corresponding pixel on the geometry. The darker the pixel, the more occluded it is. It is used to simulate the shadow effect on the surface in diffusing light.

<img src="https://github.com/skinnyworm/threejs-journey/blob/main/packages/lesson8-texture/public/textures/door/ambientOcclusion.jpg" width="300" alt="ambient-occlusion-map">

#### Metalness

The metalness texture is a grayscale image, each pixel is 8 bits (0 - 255). It will be used to define the metalness of the corresponding pixel on the geometry. The darker the pixel, the more metallic it is. It is used to simulate the metal effect on the surface.

<img src="https://github.com/skinnyworm/threejs-journey/blob/main/packages/lesson8-texture/public/textures/door/metalness.jpg" width="300" alt="metalness-map">

#### Roughness

The roughness texture is a grayscale image, each pixel is 8 bits (0 - 255). It will be used to define the roughness of the corresponding pixel on the geometry. The darker the pixel, the rougher it is. It is used to simulate the roughness effect on the surface.

<img src="https://github.com/skinnyworm/threejs-journey/blob/main/packages/lesson8-texture/public/textures/door/roughness.jpg" width="300" alt="roughness-map">
