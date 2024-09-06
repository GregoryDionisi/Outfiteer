import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function CargoJeans(props) {
  const { scene } = useGLTF('vetements_cargo_jeans__wide-leg_track_pants/scene.gltf');

  return (
    <>
      <group {...props} scale={[3.8, 2.35, 4.5]} position={[0, -2.85, 0.15]}>
        <primitive object={scene} dispose={null} />
      </group>
    </>
  );
}

useGLTF.preload('vetements_cargo_jeans__wide-leg_track_pants/scene.gltf');
