import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { EffectComposer, Glitch, Bloom } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";

export default function Experience() {
  return (
    <>
      <color args={["#ffffff"]} attach="background" />
      <EffectComposer
      // multisampling={0}
      // multisampling={4}
      >
        <Glitch
          delay={[0.5, 1]}
          duration={[0.1, 0.3]}
          strength={[0.2, 0.4]}
          //   mode={GlitchMode.CONSTANT_MILD}
          mode={GlitchMode.CONSTANT_WILD}
        />
        <Bloom />
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
