import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useCursor,
  useGLTF,
  meshBounds,
} from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function Experience() {
  const [pointer, setPointer] = useState(false);
  const cube = useRef();
  useCursor(pointer);

  const hamburger = useGLTF("./hamburger.glb");

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const eventHandler = (event) => {
    event.stopPropagation();
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
    console.log("event occured");
  };

  const shpereEventHandler = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh
        position-x={-2}
        // to create a sphere that react to mouse interaction, it give better performance.
        raycast={meshBounds}
        onClick={shpereEventHandler}
        // onPointerEnter={() => {
        //   document.body.style.cursor = "pointer";
        // }}
        // onPointerLeave={() => {
        //   document.body.style.cursor = "default";
        // }}
        onPointerEnter={() => {
          setPointer(true);
        }}
        onPointerLeave={() => {
          setPointer(false);
        }}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        ref={cube}
        position-x={2}
        scale={1.5}
        onClick={eventHandler}
        // onContextMenu is the right click
        // onContextMenu={eventHandler}
        // onDoubleClick={eventHandler}
        // onPointerUp={eventHandler}
        // onPointerDown={eventHandler}
        // onPointerOver={eventHandler}
        // onPointerEnter={eventHandler}
        // onPointerOut={eventHandler}
        // onPointerLeave={eventHandler}
        // onPointerMove={eventHandler}
        // onPointerMissed={eventHandler}
        // onPointerEnter={() => {
        //   document.body.style.cursor = "pointer";
        // }}
        // onPointerLeave={() => {
        //   document.body.style.cursor = "default";
        // }}
        onPointerEnter={() => {
          setPointer(true);
        }}
        onPointerLeave={() => {
          setPointer(false);
        }}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" side={THREE.DoubleSide} />
      </mesh>

      <primitive
        object={hamburger.scene}
        scale={0.25}
        position-y={0.5}
        onClick={(e) => {
          e.stopPropagation();
          console.log(e.object.name);
          console.log("lcikc");
        }}
      />
    </>
  );
}
