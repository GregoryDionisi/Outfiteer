import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function Jordan4(props) {
  const { scene } = useGLTF('jordan_4_retro_university_blue/scene.gltf');

  return (
    <>
      {/* Scarpa destra */}
      <group {...props} scale={[2.3, 2.3, 2.5]} rotation={[0, (Math.PI / 2) * 3, 0]} position={[-0.25, -3.02, 0.25]}>
        <primitive object={scene} dispose={null} />
      </group>

      {/* Scarpa sinistra, clonata e specchiata rispetto all'asse X */}
      <group {...props} scale={[2.3, 2.3, -2.5]} rotation={[0, (Math.PI / 2) * 3, 0]} position={[0.25, -3.02, 0.25]}>
        <primitive object={scene.clone()} dispose={null} />
      </group>
    </>
  );
}

useGLTF.preload('jordan_4_retro_university_blue/scene.gltf');
