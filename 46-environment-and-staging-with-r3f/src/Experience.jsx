import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import {
  OrbitControls,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
  Stage,
} from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";

export default function Experience() {
  const directionalLight = useRef();
  const cube = useRef();
  const { envMapIntensity } = useControls("environnement map", {
    envMapIntensity: { value: 3.5, min: 0, max: 12 },
  });

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  return (
    <>
      <Stage
        shadows={{
          type: "contact",
          opacity: 0.2,
          blur: 3,
        }}
        environment="sunset"
        preset="portrait"
        intensity={2}
      >
        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <mesh position-x={-2} position-y={1} castShadow>
          <sphereGeometry />
          <meshStandardMaterial
            color="orange"
            envMapIntensity={envMapIntensity}
          />
        </mesh>

        <mesh ref={cube} castShadow position-x={2} position-y={1} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial
            color="mediumpurple"
            envMapIntensity={envMapIntensity}
          />
        </mesh>
      </Stage>
    </>
  );
}
