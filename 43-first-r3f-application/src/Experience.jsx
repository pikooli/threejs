import { useRef } from "react";
import { useFrame, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CustomObject } from "./CustomObject";

extend({ OrbitControls });

export default function Experience(props) {
  const ref = useRef(null);
  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    // const { camera, clock } = state;
    // const angle = clock.elapsedTime;

    // camera.position.x = Math.sin(angle) * 10;
    // camera.position.z = Math.cos(angle) * 10;
    // camera.lookAt(0, 0, 0);
    ref.current.rotation.y += delta;
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <CustomObject />
      <mesh position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh ref={ref} rotation-y={Math.PI * 0.23} position-x={2} scale={1.5}>
        <boxGeometry scale={1.5} />
        <meshStandardMaterial wireframe={false} color="green" />
      </mesh>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
    </>
  );
}
