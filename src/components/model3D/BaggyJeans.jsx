import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function BaggyJeans(props) {
  const { scene } = useGLTF('jeans/scene.gltf');

  return (
    <>
      <group {...props} scale={[2.3, 1.7, 3.1]} position={[-0.002, -2.7, -0.001]}>
        <primitive object={scene} dispose={null} />
      </group>
    </>
  );
}

useGLTF.preload('jeans/scene.gltf');
