## 8. Texture

Textures, as you probably know, are images that will cover the surface of your geometries. They are used to give a more realistic look to your models, and can be used to simulate a wide range of materials, from wood to metal, from fabric to glass.

But since we've just learned materials, you might be wondering: what's the difference between a material and a texture? Well, the material is the set of properties that define how light interacts with the surface of an object. The properties that affects the color of the object includes normal, color, reflectness, roughness, metalness etc. However, when rendering on a face, those properties are the same for the **whole face**. Textures, on the other hand can be think of as a way to define different properties on the **pixel level**. For example, a **color-map** is the color of each pixel on the face, a **normal-map** is the normal of each pixel on the face, etc.

![color-map](https://github.com/skinnyworm/threejs-journey/blob/main/packages/lesson8-texture/public/textures/door/color.jpg)
