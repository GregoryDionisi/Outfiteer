import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function RayBan(props) {
  const { scene } = useGLTF('new_wayfarer__rayban/scene.gltf');

  return (
    <>
      <group {...props} scale={[0.04, 0.04, 0.04]} position={[0, 2.23, 0.05]} rotation={[Math.PI / 20, 0, 0]}>
        <primitive object={scene} dispose={null} />
      </group>
    </>
  );
}

useGLTF.preload('new_wayfarer__rayban/scene.gltf');
