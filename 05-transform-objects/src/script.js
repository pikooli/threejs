import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

//  Position ==========
// camera.position.x = 1;
// camera.position.y = 1;
// camera.position.z = 3;
camera.position.set(1, 1, 3);
camera.position.set(1, 1, 5);
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.x = 1;
mesh.position.set(0.7, -0.6, 1);

//  AxesHelper ==========
const axesHelper = new THREE.AxesHelper(2);

//  Scale ==========
// mesh.scale.x = 2;
// mesh.scale.y = 2;
// mesh.scale.z = 1;
mesh.scale.set(2, 2, 1);

//  Rotation ==========
// mesh.rotation.y = 2;
// mesh.rotation.y = Math.PI;
mesh.rotation.reorder("YXZ");
mesh.rotation.y = Math.PI * 0.25;
mesh.rotation.x = Math.PI * 0.25;

//  LookAt ==========
camera.lookAt(mesh.position);

//  Group ==========

const group = new THREE.Group();
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ffff })
);

cube2.position.x = 2;
cube3.position.x = -2;

group.position.y = 2;
group.scale.y = 2;

group.add(cube1);
group.add(cube2);
group.add(cube3);
scene.add(group);
scene.add(axesHelper);
scene.add(camera);
// scene.add(mesh);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
