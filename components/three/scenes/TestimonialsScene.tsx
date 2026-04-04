'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function QuoteSymbol({ position, scale, color, rotationSpeed }: {
  position: [number, number, number]
  scale: number
  color: string
  rotationSpeed: number
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * rotationSpeed
    }
  })

  return (
    <Float speed={1.5} floatIntensity={0.4}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[0.5, 0.15, 8, 20, Math.PI]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.25}
        />
      </mesh>
    </Float>
  )
}

function StarShape({ position, color }: {
  position: [number, number, number]
  color: string
}) {
  return (
    <Float speed={2} floatIntensity={0.3}>
      <mesh position={position}>
        <octahedronGeometry args={[0.08]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
        />
      </mesh>
    </Float>
  )
}

export function TestimonialsScene() {
  const { viewport } = useThree()
  const orbitRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group position={[0, -viewport.height * 5, 0]}>
      {/* Large quote symbols */}
      <QuoteSymbol position={[-3, 0.5, -1]} scale={1.5} color="#8b5cf6" rotationSpeed={0.1} />
      <QuoteSymbol position={[3, -0.3, -0.5]} scale={1} color="#3b82f6" rotationSpeed={-0.08} />
      <QuoteSymbol position={[0, 1, -2]} scale={0.8} color="#06b6d4" rotationSpeed={0.12} />

      {/* Star rating visualizations */}
      {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
        <StarShape
          key={i}
          position={[x, -1.5, 0]}
          color={i < 4 ? '#8b5cf6' : '#3b82f6'}
        />
      ))}

      {/* Orbiting ring of spheres */}
      <group ref={orbitRef}>
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2
          const r = 3.5
          return (
            <mesh key={i} position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial
                color={i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#3b82f6' : '#06b6d4'}
                emissive={i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#3b82f6' : '#06b6d4'}
                emissiveIntensity={0.8}
              />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}
