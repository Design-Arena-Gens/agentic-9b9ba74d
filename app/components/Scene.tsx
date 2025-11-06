'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Stars } from '@react-three/drei'
import Monument3D from './Monument3D'
import { Monument } from '../data/monuments'

interface SceneProps {
  monument: Monument
}

export default function Scene({ monument }: SceneProps) {
  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <color attach="background" args={['#000000']} />

      <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={60} />

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2}
        target={[0, 2, 0]}
      />

      <ambientLight intensity={0.3} color="#0066ff" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, 5, -10]} intensity={0.8} color="#ff00ff" />
      <pointLight position={[0, 15, 0]} intensity={0.5} color="#ffff00" />

      <spotLight
        position={[0, 20, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1.5}
        color="#00ffff"
        castShadow
      />

      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <Monument3D monument={monument} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#000510"
          metalness={0.9}
          roughness={0.1}
          emissive="#001a33"
          emissiveIntensity={0.3}
        />
      </mesh>

      <gridHelper args={[100, 50, '#00ffff', '#004444']} position={[0, 0, 0]} />

      <Environment preset="night" />
    </Canvas>
  )
}
