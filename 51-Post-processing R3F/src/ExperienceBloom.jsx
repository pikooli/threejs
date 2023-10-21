import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";

export default function Experience() {
  return (
    <>
      <color args={["#000000"]} attach="background" />
      <EffectComposer>
        <Bloom mipmapBlur intensity={0.1} luminanceThreshold={0} />
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
        <meshBasicMaterial
          //   color={[1.5 * 10, 1 * 10, 4 * 10]}
          color={[1.5 * 30, 1 * 30, 4 * 30]}
          toneMapped={false}
        />
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

// export default function Experience() {
//   return (
//     <>
//       <color args={["#000000"]} attach="background" />
//       <EffectComposer
//       // multisampling={0}
//       // multisampling={4}
//       >
//         <Bloom mipmapBlur
//         intensity={0.5}
//         luminanceThreshold={0} />
//       </EffectComposer>

//       <Perf position="top-left" />

//       <OrbitControls makeDefault />

//       <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
//       <ambientLight intensity={0.5} />

//       <mesh castShadow position-x={-2}>
//         <sphereGeometry />
//         <meshStandardMaterial color="orange" />
//       </mesh>

//       <mesh castShadow position-x={2} scale={1.5}>
//         <boxGeometry />
//         {/* <meshStandardMaterial color={[1.5, 1, 4]} toneMapped={false} /> */}
//         {/* <meshStandardMaterial color={[10.5, 1, 4]} toneMapped={false} /> */}
//         {/* <meshStandardMaterial color={[1.5, 2, 4]} toneMapped={false} /> */}
//         {/* <meshStandardMaterial color={[1.5, 2, 1]} toneMapped={false} /> */}
//         {/* <meshStandardMaterial color={[5, 2, 1]} toneMapped={false} /> */}
//         {/* <meshStandardMaterial
//           color="orange"
//           toneMapped={false}
//           emissive="orange"
//           emissiveIntensity={10}
//         /> */}
//         {/* <meshStandardMaterial
//           color="white"
//           toneMapped={false}
//           emissive="orange"
//           emissiveIntensity={10}
//         />
//          */}
//         {/* <meshStandardMaterial
//           color="white"
//           toneMapped={false}
//           emissive="red"
//           emissiveIntensity={10}
//         /> */}
//         {/* switch to meshBasicMaterial because  */}
//         {/* <meshBasicMaterial color={[1.5 , 1, 4]} toneMapped={false} /> */}
//         <meshBasicMaterial color={[1.5 * 10, 1, 4]} toneMapped={false} />
//       </mesh>

//       <mesh
//         receiveShadow
//         position-y={-1}
//         rotation-x={-Math.PI * 0.5}
//         scale={10}
//       >
//         <planeGeometry />
//         <meshStandardMaterial color="greenyellow" />
//       </mesh>
//     </>
//   );
// }
