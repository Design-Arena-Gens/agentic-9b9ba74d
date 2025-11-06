'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Monument } from '../data/monuments'
import { Text } from '@react-three/drei'

interface Monument3DProps {
  monument: Monument
}

export default function Monument3D({ monument }: Monument3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const mainStructureRef = useRef<THREE.Mesh>(null)
  const holoRingsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1
    }

    if (holoRingsRef.current) {
      holoRingsRef.current.rotation.y = t * 0.3
      holoRingsRef.current.children.forEach((child, i) => {
        child.rotation.x = t * (0.5 + i * 0.2)
      })
    }

    if (mainStructureRef.current) {
      const material = mainStructureRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.3 + Math.sin(t * 2) * 0.1
    }
  })

  const particles = useMemo(() => {
    const positions = []
    const colors = []
    for (let i = 0; i < 500; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const radius = 3 + Math.random() * 2

      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi) + 2,
        radius * Math.sin(phi) * Math.sin(theta)
      )

      const color = new THREE.Color()
      color.setHSL(0.5 + Math.random() * 0.2, 1, 0.5)
      colors.push(color.r, color.g, color.b)
    }
    return { positions: new Float32Array(positions), colors: new Float32Array(colors) }
  }, [monument.id])

  const renderStructure = () => {
    switch (monument.shape) {
      case 'tower':
        return (
          <>
            <mesh ref={mainStructureRef} position={[0, 2.5, 0]} castShadow>
              <boxGeometry args={[1, 5, 1]} />
              <meshStandardMaterial
                color={monument.color}
                emissive={monument.color}
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
                wireframe={false}
              />
            </mesh>
            <mesh position={[0, 5.5, 0]} castShadow>
              <coneGeometry args={[0.8, 1, 4]} />
              <meshStandardMaterial
                color="#ffff00"
                emissive="#ffff00"
                emissiveIntensity={0.5}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            {/* Tech details */}
            <mesh position={[0, 1, 0.51]}>
              <boxGeometry args={[0.8, 0.3, 0.05]} />
              <meshStandardMaterial
                color="#00ffff"
                emissive="#00ffff"
                emissiveIntensity={0.8}
              />
            </mesh>
          </>
        )

      case 'pyramid':
        return (
          <>
            <mesh ref={mainStructureRef} position={[0, 2, 0]} castShadow>
              <coneGeometry args={[3, 4, 4]} />
              <meshStandardMaterial
                color={monument.color}
                emissive={monument.color}
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            {/* Energy core */}
            <mesh position={[0, 3, 0]}>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial
                color="#ff00ff"
                emissive="#ff00ff"
                emissiveIntensity={1}
                transparent
                opacity={0.6}
              />
            </mesh>
          </>
        )

      case 'dome':
        return (
          <>
            <mesh ref={mainStructureRef} position={[0, 1.5, 0]} castShadow>
              <sphereGeometry args={[2, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial
                color={monument.color}
                emissive={monument.color}
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[2, 2.2, 1, 32]} />
              <meshStandardMaterial
                color="#004444"
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </>
        )

      case 'arch':
        return (
          <>
            {/* Left pillar */}
            <mesh position={[-1.5, 2, 0]} castShadow>
              <boxGeometry args={[0.6, 4, 0.6]} />
              <meshStandardMaterial
                color={monument.color}
                emissive={monument.color}
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            {/* Right pillar */}
            <mesh position={[1.5, 2, 0]} castShadow>
              <boxGeometry args={[0.6, 4, 0.6]} />
              <meshStandardMaterial
                color={monument.color}
                emissive={monument.color}
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            {/* Top arch */}
            <mesh ref={mainStructureRef} position={[0, 4, 0]} castShadow>
              <torusGeometry args={[1.8, 0.3, 16, 32, Math.PI]} />
              <meshStandardMaterial
                color={monument.color}
                emissive={monument.color}
                emissiveIntensity={0.4}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </>
        )

      case 'statue':
        return (
          <>
            {/* Base */}
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[1.2, 1.5, 1, 8]} />
              <meshStandardMaterial
                color="#003333"
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
            {/* Body */}
            <mesh position={[0, 2.5, 0]} castShadow>
              <capsuleGeometry args={[0.6, 2, 8, 16]} />
              <meshStandardMaterial
                color={monument.color}
                emissive={monument.color}
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            {/* Head */}
            <mesh ref={mainStructureRef} position={[0, 4.2, 0]} castShadow>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial
                color="#00ffff"
                emissive="#00ffff"
                emissiveIntensity={0.6}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </>
        )

      default:
        return (
          <mesh ref={mainStructureRef} position={[0, 2, 0]} castShadow>
            <boxGeometry args={[2, 4, 2]} />
            <meshStandardMaterial
              color={monument.color}
              emissive={monument.color}
              emissiveIntensity={0.3}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        )
    }
  }

  return (
    <group ref={groupRef}>
      {renderStructure()}

      {/* Holographic rings */}
      <group ref={holoRingsRef}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0, 2 + i * 1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[2 + i * 0.5, 0.02, 16, 100]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#00ffff' : '#ff00ff'}
              emissive={i % 2 === 0 ? '#00ffff' : '#ff00ff'}
              emissiveIntensity={1}
              transparent
              opacity={0.4}
            />
          </mesh>
        ))}
      </group>

      {/* Particle system */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.colors.length / 3}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Floating label */}
      <Text
        position={[0, 6, 0]}
        fontSize={0.3}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {monument.name.toUpperCase()}
      </Text>
    </group>
  )
}
