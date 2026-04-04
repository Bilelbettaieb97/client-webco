'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, Float } from '@react-three/drei'
import * as THREE from 'three'

export function HeroScene() {
  const { viewport } = useThree()
  const scroll = useScroll()

  const icoRef = useRef<THREE.Mesh>(null)
  const torusKnotRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const groupRef = useRef<THREE.Group>(null)

  const particlePositions = useMemo(() => {
    const count = 200
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2 + Math.random() * 3
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      sizes[i] = Math.random() * 3 + 1
    }
    return { positions, sizes }
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const offset = scroll.offset

    if (groupRef.current) {
      groupRef.current.position.y = offset * -viewport.height * 0.5
      groupRef.current.rotation.y = offset * 0.5
    }

    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.1
      icoRef.current.rotation.y = t * 0.15
      const breathe = 1 + Math.sin(t * 0.5) * 0.08
      icoRef.current.scale.setScalar(breathe)
    }

    if (torusKnotRef.current) {
      torusKnotRef.current.position.x = Math.cos(t * 0.3) * 2.5
      torusKnotRef.current.position.z = Math.sin(t * 0.3) * 2.5
      torusKnotRef.current.position.y = Math.sin(t * 0.5) * 0.5
      torusKnotRef.current.rotation.x = t * 0.4
      torusKnotRef.current.rotation.y = t * 0.3
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.2
      ring1Ref.current.rotation.z = t * 0.1
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.15
      ring2Ref.current.rotation.x = Math.PI * 0.3 + t * 0.05
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.25
      ring3Ref.current.rotation.y = Math.PI * 0.5 + t * 0.08
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.02
      particlesRef.current.rotation.x = t * 0.01
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main icosahedron */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Orbiting torus knot */}
      <mesh ref={torusKnotRef}>
        <torusKnotGeometry args={[0.3, 0.08, 64, 8]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>

      {/* 3 rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={1}
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.8, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={1}
          transparent
          opacity={0.5}
        />
      </mesh>

      <mesh ref={ring3Ref}>
        <torusGeometry args={[3.4, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={1}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Particle cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[particlePositions.sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#8b5cf6"
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Floating accents */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[3, 1.5, -1]}>
          <octahedronGeometry args={[0.15]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.8}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh position={[-3, -1, 1]}>
          <tetrahedronGeometry args={[0.2]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.8}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  )
}
