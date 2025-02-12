import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

function ThreeCanvas() {
  useEffect(() => {
    console.log("Three.js loaded");
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[20, 32, 32]} />
        <meshStandardMaterial color="royalblue" />
      </mesh>

      <OrbitControls />
      <Environment preset="night" />
    </Canvas>
  );
}

export default ThreeCanvas;
