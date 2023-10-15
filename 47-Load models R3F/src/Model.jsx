import { useLoader } from "@react-three/fiber";
import { Clone, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export function Model() {
  //   const model = useLoader(
  //     GLTFLoader,
  //     // "./FlightHelmet/glTF/FlightHelmet.gltf",
  //     "./hamburger.glb",
  //     (loader) => {
  //       const dracoLoader = new DRACOLoader();
  //       dracoLoader.setDecoderPath("./draco/");
  //       loader.setDRACOLoader(dracoLoader);
  //     }
  //   );
  //   const model = useGLTF("./hamburger.glb");
  const model = useGLTF("./hamburger-draco.glb");

  //   return <primitive object={model.scene} scale={5} position-y={-1} />;
  //   return <primitive object={model.scene} scale={0.35} position-y={-1} />;
  return (
    <>
      <Clone object={model.scene} scale={0.35} position-x={-4} />
      <Clone object={model.scene} scale={0.35} />
      <Clone object={model.scene} scale={0.35} position-x={4} />
    </>
  );
}

useGLTF.preload("./hamburger-draco.glb");
