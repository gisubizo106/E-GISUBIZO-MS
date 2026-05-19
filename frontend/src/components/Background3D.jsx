import React from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere, Stars } from "@react-three/drei";

const Background3D = () => {
  return (
    <Canvas className="absolute inset-0">
      {/* Smooth camera feel */}
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 2]} />

      {/* Space stars */}
      <Stars radius={100} depth={50} count={2000} factor={4} fade />

      {/* Floating sphere 1 */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 64, 64]} position={[-2, 0, 0]}>
          <meshStandardMaterial color="#3b82f6" wireframe />
        </Sphere>
      </Float>

      {/* Floating sphere 2 */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 64, 64]} position={[2, 1, 0]}>
          <meshStandardMaterial color="#60a5fa" wireframe />
        </Sphere>
      </Float>
    </Canvas>
  );
};

export default Background3D;