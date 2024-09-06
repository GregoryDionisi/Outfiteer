import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function RayBan1(props) {
  const { scene } = useGLTF('ray_ban_glasses/scene.gltf');

  return (
    <>
      <group {...props} scale={[0.24, 0.24, 0.24]} position={[0, 2.22, 0.04]} rotation={[Math.PI / 50, 0, 0]}>
        <primitive object={scene} dispose={null} />
      </group>
    </>
  );
}

useGLTF.preload('ray_ban_glasses/scene.gltf');
