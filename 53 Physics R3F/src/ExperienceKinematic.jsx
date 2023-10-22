import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  Physics,
  RigidBody,
  BallCollider,
  CuboidCollider,
} from "@react-three/rapier";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Experience() {
  const cubeRef = useRef();
  const twisterRef = useRef();

  useFrame((state) => {
    if (twisterRef.current) {
      const time = state.clock.getElapsedTime();
      const eulerRotation = new THREE.Euler(0, time * 3, 0);
      const quanternionRotation = new THREE.Quaternion();
      quanternionRotation.setFromEuler(eulerRotation);
      twisterRef.current.setNextKinematicRotation(quanternionRotation);
      const angle = time * 0.5;
      const x = Math.cos(angle) * 2;
      const z = Math.sin(angle) * 2;
      twisterRef.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z });
    }
  });

  const cubeJump = () => {
    // jump will have the same height even if mass change
    const mass = cubeRef.current.mass();
    cubeRef.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 });
    cubeRef.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics debug>
        <RigidBody colliders="ball">
          {/* it bad pratice to change position of elements during run time */}
          {/* if you move it, you have to reset the velocity */}
          {/* or you can use kinematicPosition or kinematicVelocity */}
          <mesh castShadow position={[-1.5, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>
        <RigidBody
          // it bad pratice to change position of elements during run time
          //   if you move it, you have to reset the velocity
          //   or you can use kinematicPosition or kinematicVelocity
          position={[1.5, 2, 0]}
          ref={cubeRef}
          restitution={0}
          friction={0.7}
          colliders={false}
        >
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          {/* mass are not impacted by gravity, but force is influenced by */}
          <CuboidCollider args={[0.5, 0.5, 0.5]} mass={2} />
        </RigidBody>

        <RigidBody type="fixed" friction={0.7}>
          {/* it bad pratice to change position of elements during run time */}
          {/* if you move it, you have to reset the velocity */}
          {/* or you can use kinematicPosition or kinematicVelocity */}
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
        <RigidBody
          position={[0, -0.8, 0]}
          friction={0}
          //   kinematicPosition object cannot be moved by other object, only by apply force to it
          type="kinematicPosition"
          ref={twisterRef}
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
