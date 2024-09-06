//Tappeto.js
import React, { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll } from '@react-three/drei';
import gsap from 'gsap';

function Mannequin({ position, rotation }) {
  return (
    <mesh position={position} rotation={rotation}>
      {/* Placeholder per il manichino */}
      <boxGeometry args={[1, 2, 0.5]} />
     </mesh>
  );
}

// Scena del Tappeto Rosso
function RedCarpetScene() {
  const scroll = useScroll();
  const carpetRef = useRef();

  useFrame(() => {
    const scrollPosition = scroll.offset * 100;
    gsap.to(carpetRef.current.position, { z: -scrollPosition });
  });

  return (
    <>
      <group ref={carpetRef}>
        <Mannequin position={[-2, 1, 0]} />
        <Mannequin position={[2, 1, 0]} />
        <Mannequin position={[-2, 1, -10]} />
        <Mannequin position={[2, 1, -10]} />
      </group>
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 500]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
}

export default function Tappeto() {
    return (
        <Canvas style={{ background: 'black', width: '100vw', height:'100vh' }}>
          <ambientLight intensity={0.5} />
          <ScrollControls pages={5}>
            <RedCarpetScene />
          </ScrollControls>
        </Canvas>
    );
  }
  
