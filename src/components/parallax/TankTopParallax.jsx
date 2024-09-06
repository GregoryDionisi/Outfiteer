import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';

export default function TankTopParallax(props) {
  const ref = useRef();
  const { scene } = useGLTF('tank_top/parallax.gltf');

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Adjust rotation speed
    }
  });

  

  return (
    <group
      ref={ref}
      {...props}
      scale={[0.007, 0.007, 0.007]}
      position={[0, -9, 0]} // Adjust this to change the initial position
      rotation={[0, 0, 0]} // Adjust this to change the initial rotation
    >
      <primitive object={scene} dispose={null} />
    </group>
  );
}

useGLTF.preload('tank_top/parallax.gltf');
