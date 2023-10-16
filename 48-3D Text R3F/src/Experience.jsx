import {
  useMatcapTexture,
  Center,
  Text3D,
  OrbitControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Implementation 3 ============
const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);
  const donuts = useRef([]);

  const tempArray = Array(100).fill();

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;
    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    for (const donut of donuts.current) {
      donut.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          material={material}
        >
          HELLO R3F
        </Text3D>
      </Center>
      {tempArray.map((_, idx) => (
        <mesh
          ref={(el) => (donuts.current[idx] = el)}
          key={idx}
          geometry={torusGeometry}
          material={material}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        />
      ))}
    </>
  );
}

// // Implementation 2 ============
// const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
// const material = new THREE.MeshMatcapMaterial();

// export default function Experience() {
//   const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);
//   const donutGroupRef = useRef();

//   const tempArray = Array(100).fill();
//   useEffect(() => {
//     matcapTexture.colorSpace = THREE.SRGBColorSpace;
//     matcapTexture.needsUpdate = true;
//     material.matcap = matcapTexture;
//     material.needsUpdate = true;
//   }, []);

//   useFrame((state, delta) => {
//     for (const donut of donutGroupRef.current.children) {
//       donut.rotation.y += delta * 0.2;
//     }
//   });

//   return (
//     <>
//       <Perf position="top-left" />

//       <OrbitControls makeDefault />

//       <Center>
//         <Text3D
//           font="./fonts/helvetiker_regular.typeface.json"
//           size={0.75}
//           height={0.2}
//           curveSegments={12}
//           bevelEnabled
//           bevelThickness={0.02}
//           bevelSize={0.02}
//           bevelOffset={0}
//           bevelSegments={5}
//           material={material}
//         >
//           HELLO R3F
//         </Text3D>
//       </Center>
//       <group ref={donutGroupRef}>
//         {tempArray.map((_, idx) => (
//           <mesh
//             key={idx}
//             geometry={torusGeometry}
//             material={material}
//             position={[
//               (Math.random() - 0.5) * 10,
//               (Math.random() - 0.5) * 10,
//               (Math.random() - 0.5) * 10,
//             ]}
//             scale={0.2 + Math.random() * 0.2}
//             rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
//           />
//         ))}
//       </group>
//     </>
//   );
// }

// Implementation 1 ============
// export default function Experience() {
//   const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);

//   const tempArray = Array(100).fill();

//   const [torusGeometry, setTorusGeometry] = useState();
//   const [material, setMaterial] = useState();

//   return (
//     <>
//       <Perf position="top-left" />

//       <OrbitControls makeDefault />

//       <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
//       <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} />

//       <Center>
//         <Text3D
//           font="./fonts/helvetiker_regular.typeface.json"
//           size={0.75}
//           height={0.2}
//           curveSegments={12}
//           bevelEnabled
//           bevelThickness={0.02}
//           bevelSize={0.02}
//           bevelOffset={0}
//           bevelSegments={5}
//           material={material}
//         >
//           HELLO R3F
//         </Text3D>
//       </Center>

//       {tempArray.map((_, idx) => (
//         <mesh
//           key={idx}
//           geometry={torusGeometry}
//           material={material}
//           position={[
//             (Math.random() - 0.5) * 10,
//             (Math.random() - 0.5) * 10,
//             (Math.random() - 0.5) * 10,
//           ]}
//           scale={0.2 + Math.random() * 0.2}
//           rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
//         />
//       ))}
//     </>
//   );
// }
