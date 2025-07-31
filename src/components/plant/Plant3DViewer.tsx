import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Text } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

interface PlantModelProps {
  url?: string;
  plantName: string;
}

const PlantModel = ({ url, plantName }: PlantModelProps) => {
  const meshRef = useRef<THREE.Group>(null);
  
  // Simple floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  // For demo purposes, show a simple placeholder since we don't have actual models yet
  if (!url) {
    return (
      <group ref={meshRef} position={[0, 0, 0]}>
        {/* Simple plant representation */}
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[0.1, 0.15, 0.5]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.8]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>
        <mesh position={[-0.5, 0.8, 0.2]} rotation={[0, 0, 0.3]}>
          <coneGeometry args={[0.3, 0.6]} />
          <meshStandardMaterial color="#32CD32" />
        </mesh>
        <mesh position={[0.4, 0.7, -0.3]} rotation={[0, 0, -0.2]}>
          <coneGeometry args={[0.25, 0.5]} />
          <meshStandardMaterial color="#32CD32" />
        </mesh>
        <Text
          position={[0, -2, 0]}
          fontSize={0.3}
          color="#3A7D44"
          anchorX="center"
          anchorY="middle"
        >
          {plantName}
        </Text>
      </group>
    );
  }

  // When we have actual models, use this:
  const { scene } = useGLTF(url);
  return <primitive ref={meshRef} object={scene} scale={[1.5, 1.5, 1.5]} />;
};

const Plant3DViewer = ({ modelUrl, plantName }: { modelUrl?: string; plantName: string }) => {
  return (
    <motion.div 
      className="w-full h-[500px] bg-gradient-nature rounded-lg shadow-elevated overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#88B04B" />
        
        <Suspense fallback={
          <Text
            position={[0, 0, 0]}
            fontSize={0.5}
            color="#3A7D44"
            anchorX="center"
            anchorY="middle"
          >
            Loading {plantName}...
          </Text>
        }>
          <PlantModel url={modelUrl} plantName={plantName} />
          <Environment preset="forest" />
        </Suspense>
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          enableRotate={true}
          maxDistance={10}
          minDistance={2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm rounded-lg p-3">
        <p className="text-sm text-muted-foreground">
          🖱️ Drag to rotate • 🔍 Scroll to zoom
        </p>
      </div>
    </motion.div>
  );
};

export default Plant3DViewer;