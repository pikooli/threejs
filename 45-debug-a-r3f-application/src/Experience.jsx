import { OrbitControls } from "@react-three/drei";
import { useControls, button } from "leva";
import { Perf } from "r3f-perf";

export default function Experience() {
  const controlPerf = useControls({ prefVisible: true });
  const controls = useControls("sphere", {
    // position: { value: -2, min: -4, max: 4, step: 0.01 },
    // position: { value: { x: -2, y: 0, z: 0 }, step: 0.01 },
    position: { value: { x: -2, y: 0 }, step: 0.01, joystick: "invertY" },
    color: "#ff0000",
    visible: true,
    myInterval: { value: [4, 5], min: 0, max: 10 },
    clickMe: button(() => {
      console.log("ok");
    }),
    choice: { options: ["a", "b", "c"] },
  });
  const controlCube = useControls("cube", {
    scale: { value: 1.5, min: 0, max: 5, step: 1 },
  });

  return (
    <>
      {controlPerf.prefVisible ? <Perf position="top-left" /> : null}
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position={[controls.position.x, controls.position.y, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color={controls.color} />
      </mesh>

      <mesh position-x={2} scale={controlCube.scale} visible={controls.visible}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
