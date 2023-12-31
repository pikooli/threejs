import * as dat from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import firefliesVertexShader from "./shaders/fireflies/vertex.glsl";
import firefliesFragmentShader from "./shaders/fireflies/fragment.glsl";
import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";

/**
 * Base
 */
// Debug
const debugObj = {};
const gui = new dat.GUI({
  width: 400,
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader();

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

// GLTF loader
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Textures
 */
const bakedTexture = textureLoader.load("baked.jpg");
bakedTexture.flipY = false;
bakedTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Materials
 */
// Baked material
const bakedMaterial = new THREE.MeshBasicMaterial({
  map: bakedTexture,
  side: THREE.DoubleSide,
});

// Pole light material
const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 });

debugObj.portalColorStart = "#97e3f2";
debugObj.portalColorEnd = "#d4f7f5";
gui.addColor(debugObj, "portalColorStart").onFinishChange(() => {
  portalLightMaterial.uniforms.uColorStart.value.set(debugObj.portalColorStart);
});
gui.addColor(debugObj, "portalColorEnd").onFinishChange(() => {
  portalLightMaterial.uniforms.uColorEnd.value.set(debugObj.portalColorEnd);
});

// Portal light material
const portalLightMaterial = new THREE.ShaderMaterial({
  vertexShader: portalVertexShader,
  fragmentShader: portalFragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: { value: 0 },
    uColorStart: { value: new THREE.Color(debugObj.portalColorStart) },
    uColorEnd: { value: new THREE.Color(debugObj.portalColorEnd) },
  },
});

/**
 * Model
 */
gltfLoader.load("portal.glb", (gltf) => {
  const scale = 0.25;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.rotateY(1.6);
  scene.add(gltf.scene);

  // Get each object
  const bakedMesh = gltf.scene.children.find(
    (child) => child.name === "Cube022"
  );
  const portalLightMesh = gltf.scene.children.find(
    (child) => child.name === "PortalCircle"
  );
  const poleLightAMesh = gltf.scene.children.find(
    (child) => child.name === "lantern_1"
  );
  const poleLightBMesh = gltf.scene.children.find(
    (child) => child.name === "lantern_2"
  );

  // Apply materials
  bakedMesh.material = bakedMaterial;
  portalLightMesh.material = portalLightMaterial;
  poleLightAMesh.material = poleLightMaterial;
  poleLightBMesh.material = poleLightMaterial;
});
/**
 * Fireflies
 */
const firefliesGeometry = new THREE.BufferGeometry();
const firefliesCount = 100;
const postitionArray = new Float32Array(firefliesCount * 3);
const scaleArray = new Float32Array(firefliesCount);

for (let i = 0; i < firefliesCount; i++) {
  postitionArray[i * 3 + 0] = (Math.random() - 0.5) * 4; // x
  postitionArray[i * 3 + 1] = Math.random() * 2; // y
  postitionArray[i * 3 + 2] = (Math.random() - 0.5) * 4; // z
  scaleArray[i] = Math.random() * 6;
}
firefliesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(postitionArray, 3)
);
firefliesGeometry.setAttribute(
  "aScale",
  new THREE.BufferAttribute(scaleArray, 1)
);

// Material
const fireFliesMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uSize: { value: 100 },
  },
  vertexShader: firefliesVertexShader,
  fragmentShader: firefliesFragmentShader,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});

//  Points
const fireflies = new THREE.Points(firefliesGeometry, fireFliesMaterial);
scene.add(fireflies);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  fireFliesMaterial.uniforms.uPixelRatio.value = Math.min(
    window.devicePixelRatio,
    2
  );
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 4;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

debugObj.clearColor = "#201919";
renderer.setClearColor(debugObj.clearColor);
gui
  .addColor(debugObj, "clearColor")
  .onFinishChange(() => renderer.setClearColor(debugObj.clearColor));

gui
  .add(fireFliesMaterial.uniforms.uSize, "value")
  .min(0)
  .max(500)
  .step(1)
  .name("firefliesSize");

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  fireFliesMaterial.uniforms.uTime.value = elapsedTime;
  portalLightMaterial.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
