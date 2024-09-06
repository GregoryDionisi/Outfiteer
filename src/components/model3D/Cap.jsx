import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function Cap(props) {
  const { scene } = useGLTF('new_york_yankees_59fifty_fitted_cap/scene.gltf');

  return (
    <>
      <group {...props} scale={[3.1, 2.7, 3.4]} position={[0, 2.3, 0.05]}>
        <primitive object={scene} dispose={null} />
      </group>
    </>
  );
}

useGLTF.preload('new_york_yankees_59fifty_fitted_cap/scene.gltf');
