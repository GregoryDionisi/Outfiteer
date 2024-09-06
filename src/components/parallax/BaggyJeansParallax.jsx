import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';

export default function BaggyJeansParallax(props) {
  const ref = useRef();
  const { scene } = useGLTF('jeans/parallax.gltf');
  
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Adjust rotation speed
    }
  });

  return (
    <group
      ref={ref}
      {...props}
      scale={[2.5, 2.5, 2.5]}
      position={[4, -2.5, 0]} // Adjust this to change the initial position
      rotation={[0, 0, 0]} // Adjust this to change the initial rotation
    >
      <primitive object={scene} dispose={null} />
    </group>
  );
}

useGLTF.preload('jeans/parallax.gltf');
