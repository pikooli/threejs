import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Vignette, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function Experience() {
  return (
    <>
      {/* We add color to allow vignette to work on upper left and right of screen */}
      <color args={["#ffffff"]} attach="background" />
      <EffectComposer
      // multisampling={0}
      // multisampling={4}
      >
        {/* Add dark area on bottom corner of screen */}
        <Vignette
          offset={0.3}
          darkness={0.9}
          //   blendFunction={BlendFunction.COLOR_BURN}
          blendFunction={BlendFunction.NORMAL}
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
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
