import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';

export default function AirForceParallax(props) {
  const ref = useRef();
  const { scene } = useGLTF('nike_air_force_1/parallax.gltf');


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
      position={[-3, -1, 0]} // Adjust this to change the initial position
      rotation={[0, 0, 0]} // Adjust this to change the initial rotation
    >
      <primitive object={scene} dispose={null} />
    </group>
  );
}

useGLTF.preload('nike_air_force_1/parallax.gltf');
