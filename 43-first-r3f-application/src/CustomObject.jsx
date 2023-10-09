import { DoubleSide } from "three";
import { useMemo, useRef, useEffect } from "react";

export const CustomObject = () => {
  const ref = useRef(null);
  const verticesCount = 10 * 3;

  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }
    return positions;
  }, []);

  useEffect(() => {
    ref.current.computeVertexNormals();
  }, []);

  return (
    <mesh>
      <bufferGeometry ref={ref}>
        <bufferAttribute
          attach="attributes-position"
          count={verticesCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <meshStandardMaterial color="red" side={DoubleSide} />
    </mesh>
  );
};
