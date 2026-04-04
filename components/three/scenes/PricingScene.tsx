'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Pedestal({ position, height, color, isPopular }: {
  position: [number, number, number]
  height: number
  color: string
  isPopular: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  const particleData = useMemo(() => {
    const count = 30
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = 0.2 + Math.random() * 0.3
      positions[i * 3] = Math.cos(angle) * r
      positions[i * 3 + 1] = Math.random() * height
      positions[i * 3 + 2] = Math.sin(angle) * r
    }
    return positions
  }, [height])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ringRef.current && isPopular) {
      ringRef.current.rotation.z = t * 0.5
      ringRef.current.position.y = position[1] + height / 2 + Math.sin(t) * 0.1
    }
    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position
      const arr = posAttr.array as Float32Array
      for (let i = 0; i < arr.length / 3; i++) {
        arr[i * 3 + 1] += 0.005
        if (arr[i * 3 + 1] > height + 0.5) {
          arr[i * 3 + 1] = 0
        }
      }
      posAttr.needsUpdate = true
    }
  })

  return (
    <group position={position}>
      {/* Pillar */}
      <mesh ref={meshRef} position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.3, 0.35, height, 6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isPopular ? 0.4 : 0.2}
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>

      {/* Solid inner pillar */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.15, 0.18, height, 6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Glow ring for popular */}
      {isPopular && (
        <mesh ref={ringRef} position={[0, height / 2, 0]}>
          <torusGeometry args={[0.5, 0.015, 16, 50]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={1.5}
          />
        </mesh>
      )}

      {/* Rising particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particleData, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color={color}
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Base */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.5, 6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

export function PricingScene() {
  const { viewport } = useThree()
  const gridRef = useRef<THREE.GridHelper>(null)

  return (
    <group position={[0, -viewport.height * 4, 0]}>
      <Pedestal
        position={[-2, -1.5, 0]}
        height={2}
        color="#3b82f6"
        isPopular={false}
      />
      <Pedestal
        position={[0, -1.5, 0]}
        height={3}
        color="#8b5cf6"
        isPopular={true}
      />
      <Pedestal
        position={[2, -1.5, 0]}
        height={2.5}
        color="#06b6d4"
        isPopular={false}
      />

      {/* Grid base */}
      <gridHelper
        ref={gridRef}
        args={[12, 24, '#8b5cf620', '#8b5cf610']}
        position={[0, -1.5, 0]}
      />
    </group>
  )
}
