import "./style.css";
import * as THREE from "three";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

const root = ReactDOM.createRoot(document.querySelector("#root"));
const camera = {
  fov: 45,
  // zoom: 100,
  near: 0.1,
  far: 200,
  position: [3, 2, 6],
};

root.render(
  <Canvas
    // dpr={1}
    dpr={[1, 2]}
    // orthographic
    gl={{
      antialias: false,
      toneMapping: THREE.CineonToneMapping,
      // outputColorSpace: THREE.LinearSRGBColorSpace,
      outputColorSpace: THREE.SRGBColorSpace,
    }}
    // flat
    camera={camera}
  >
    <Experience />
  </Canvas>
);
