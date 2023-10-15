import React, { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useControls } from "leva";

export function Fox(props) {
  const model = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(model.animations, model.scene);
  const controls = useControls("fox", {
    animationName: { options: animations.names },
  });

  //   useEffect(() => {
  //     animations.actions.Run.play();
  //     setTimeout(() => {
  //       animations.actions.Walk.play();
  //       animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1);
  //     }, 2000);
  //   }, []);

  useEffect(() => {
    const action = animations.actions[controls.animationName];
    action.reset().fadeIn(0.5).play();
    return () => {
      action.fadeOut(0.5);
    };
  }, [controls.animationName]);

  return <primitive {...props} object={model.scene}></primitive>;
}

useGLTF.preload("./Fox/glTF/Fox.gltf");
