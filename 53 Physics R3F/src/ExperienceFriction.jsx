import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  Physics,
  RigidBody,
  BallCollider,
  CuboidCollider,
} from "@react-three/rapier";
import { useRef } from "react";

export default function Experience() {
  const cubeRef = useRef();

  const cubeJump = () => {
    // addForce, is a permanent apply the force, like controlling the wind
    // applyImpulse is a one time apply, lile a pistolet bullet
    cubeRef.current.applyImpulse({ x: 0, y: 5, z: 0 });
    // addForce, is a permanent apply the force, like controlling the wind
    // applyTorqueImpulse is a one time apply, lile a pistolet bullet
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
          <mesh castShadow position={[-1.5, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>
        <RigidBody
          position={[1.5, 2, 0]}
          ref={cubeRef}
          restitution={0}
          // friction control how it slide on the floor
          // friction is 0.7 by default
          // if you put it a 0, It still stop because the floor have a friction
          friction={0}
        >
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
