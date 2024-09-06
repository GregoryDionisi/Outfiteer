import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';

export default function CapParallax(props) {
  const ref = useRef();
  const { scene } = useGLTF('new_york_yankees_59fifty_fitted_cap/parallax.gltf');

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Adjust rotation speed
    }
  });

  return (
    <group
      ref={ref}
      {...props}
      scale={[14, 14, 14]}
      position={[0, 0, 0]} // Adjust this to change the initial position
      rotation={[Math.PI / 4, 0, 0]} // Adjust this to change the initial rotation
    >
      <primitive object={scene} dispose={null} />
    </group>
  );
}

useGLTF.preload('new_york_yankees_59fifty_fitted_cap/parallax.gltf');
