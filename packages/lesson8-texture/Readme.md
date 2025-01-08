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
