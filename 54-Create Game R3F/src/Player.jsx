import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import useGame, { PHASE } from "./stores/useGame";

export default function Player() {
  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  const playerRef = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();
  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);
  const blocksCount = useGame((state) => state.blocksCount);

  const jump = (value) => {
    if (value) {
      const origin = playerRef.current.translation();
      origin.y -= 0.31;
      const direction = { x: 0, y: -1, z: 0 };
      const ray = new rapier.Ray(origin, direction);
      const hit = world.castRay(ray, 10, true);
      if (hit.toi < 0.15) {
        playerRef.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
      }
    }
  };

  const reset = () => {
    playerRef.current.setTranslation({ x: 0, y: 1, z: 0 });
    playerRef.current.setLinvel({ x: 0, y: 1, z: 0 });
    playerRef.current.setAngvel({ x: 0, y: 1, z: 0 });
  };

  useEffect(() => {
    const unsubscribeJump = subscribeKeys((state) => {
      return state.jump;
    }, jump);

    const unsubscribeAny = subscribeKeys(() => {
      start();
    });

    const unsubscribeReset = useGame.subscribe(
      (state) => {
        return state.phase;
      },
      (phase) => {
        if (phase === PHASE.READY) {
          reset();
        }
      }
    );

    return () => {
      unsubscribeJump();
      unsubscribeAny();
      unsubscribeReset();
    };
  }, []);

  useFrame((state, delta) => {
    const keys = getKeys();
    const { forward, backward, leftward, rightward } = keys;
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    playerRef.current.applyImpulse(impulse);
    playerRef.current.applyTorqueImpulse(torque);
  });

  useFrame((state, delta) => {
    const bodyPosition = playerRef.current.translation();
    const cameraPosition = new THREE.Vector3();
    const cameraTarget = new THREE.Vector3();

    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);
  });

  useFrame(() => {
    const bodyPosition = playerRef.current.translation();
    if (bodyPosition.z < -(blocksCount * 4 + 2)) {
      end();
    }
    if (bodyPosition.y < -4) {
      restart();
    }
  });

  return (
    <RigidBody
      colliders="ball"
      restitution={0.2}
      friction={1}
      position={[0, 1, 0]}
      canSleep={false}
      ref={playerRef}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh>
    </RigidBody>
  );
}
