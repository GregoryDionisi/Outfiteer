import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function AirForce(props) {
  const { scene } = useGLTF('nike_air_force_1/scene.gltf');

  return (
    <>
      {/* Scarpa destra */}
      <group {...props} scale={[3.9, 3, 3.2]} rotation={[0, 0, 0]} position={[0.22, -3.02, 0.20]}>
        <primitive object={scene} dispose={null} />
      </group>

      {/* Scarpa sinistra, clonata e specchiata rispetto all'asse X */}
      <group {...props} scale={[-3.9, 3, 3.2]} rotation={[0, 0, 0]} position={[-0.22, -3.02, 0.20]}>
        <primitive object={scene.clone()} dispose={null} />
      </group>
    </>
  );
}

useGLTF.preload('nike_air_force_1/scene.gltf');
