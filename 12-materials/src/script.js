import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as lil from "lil-gui";

THREE.ColorManagement.enabled = false;

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");
const gui = new lil.GUI();

// Scene
const scene = new THREE.Scene();

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/door/color.jpg");
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const ambientTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const metalTexture = textureLoader.load("/textures/door/metalness.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const roughTexture = textureLoader.load("/textures/door/roughness.jpg");
const matcapTexture = textureLoader.load("/textures/matcaps/1.png");
const gradientsTexture = textureLoader.load("/textures/gradients/5.jpg");

// const material = new THREE.MeshBasicMaterial();
// material.map = matcapTexture;
// material.color = new THREE.Color("green");
//  ======== when doing opacity alway put transparent to true
// material.opacity = 0.5;
// material.transparent = true;

//  ======== when doing alphaMap alway put transparent to true
// material.alphaMap = alphaTexture;
// material.transparent = true;

// const material = new THREE.MeshNormalMaterial();

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// const material = new THREE.MeshDepthMaterial();

// MeshLambertMaterial && MeshPhongMaterial work with light
// const material = new THREE.MeshLambertMaterial();
// const material = new THREE.MeshPhongMaterial();
// control the shininess of elements
// material.shininess = 100;
// control the color of reflexion
// material.specular = new THREE.Color("red");

// const material = new THREE.MeshToonMaterial();
// gradientsTexture.minFilter = THREE.NearestFilter;
// gradientsTexture.magFilter = THREE.NearestFilter;
// gradientsTexture.generateMipmaps = false;
// material.gradientMap = gradientsTexture;

const cubeTextureLoader = new THREE.CubeTextureLoader();
const environemmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.jpg",
  "/textures/environmentMaps/0/nx.jpg",
  "/textures/environmentMaps/0/py.jpg",
  "/textures/environmentMaps/0/ny.jpg",
  "/textures/environmentMaps/0/pz.jpg",
  "/textures/environmentMaps/0/nz.jpg",
]);
const material = new THREE.MeshStandardMaterial();
// material.metalness = 0.65;
// material.roughness = 0.15;
// material.map = colorTexture;
// material.aoMapp = ambientTexture;
// material.displacementMap = heightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = metalTexture;
// material.roughnessMap = roughTexture;
// material.normalMap = normalTexture;
// material.normalScale.set(0.5, 0.5);
// material.alphaMap = alphaTexture;
// material.transparent = true;

material.metalness = 0.7;
material.roughness = 0.2;
material.envMap = environemmentMapTexture;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "aoMapIntensity").min(0).max(10).step(1);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
gui.add(material, "displacementScale").min(0).max(1).step(0.01);

const ambienLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambienLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
);

torus.position.x = 1.5;

sphere.position.x = -1.5;
scene.add(sphere, plane, torus);

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
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  sphere.rotation.y = elapsedTime * 0.1;
  plane.rotation.y = elapsedTime * 0.1;
  torus.rotation.y = elapsedTime * 0.1;

  sphere.rotation.x = elapsedTime * 0.15;
  plane.rotation.x = elapsedTime * 0.15;
  torus.rotation.x = elapsedTime * 0.15;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
