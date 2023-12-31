import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { EffectComposer, SSR } from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import { useControls } from "leva";
import Drunk from "./Drunk";
import { useRef } from "react";

export default function Experience() {
  // ref is not mandatory, it for in case we want to make change from outside
  const drunkRef = useRef();
  const controls = useControls("Drunk Effect", {
    frequency: { value: 2, min: 1, max: 20 },
    amplitude: { value: 0.1, min: 0, max: 1 },
  });
  return (
    <>
      <color args={["#ffffff"]} attach="background" />
      <EffectComposer>
        <Drunk
          ref={drunkRef}
          drufrequency={controls.frequency}
          amplitude={controls.amplitude}
          blendFunction={BlendFunction.DARKEN}
        />
      </EffectComposer>

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" roughness={0} metalness={0} />
      </mesh>
    </>
  );
}
