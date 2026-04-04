'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function ServiceBox({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const orbitRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15
      meshRef.current.rotation.x = t * 0.1
    }
    if (orbitRef.current) {
      orbitRef.current.position.x = position[0] + Math.cos(t * 0.8) * 0.6
      orbitRef.current.position.z = position[2] + Math.sin(t * 0.8) * 0.6
    }
  })

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh ref={meshRef} position={position}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.15}
            roughness={0.1}
            metalness={0.8}
            transmission={0.6}
            thickness={0.5}
          />
        </mesh>
      </Float>
      {/* Wireframe overlay */}
      <mesh position={position}>
        <boxGeometry args={[0.62, 0.62, 0.62]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
      {/* Orbiting sphere */}
      <mesh ref={orbitRef} position={position}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  )
}

export function ServicesScene() {
  const { viewport } = useThree()
  const ringRef = useRef<THREE.Mesh>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  const boxPositions: [number, number, number][] = [
    [-1.2, 0.6, 0],
    [1.2, 0.6, 0],
    [-1.2, -0.6, 0],
    [1.2, -0.6, 0],
  ]
  const colors = ['#8b5cf6', '#3b82f6', '#06b6d4', '#8b5cf6']

  const lineGeometry = useMemo(() => {
    const points: number[] = []
    // Connect boxes in grid pattern
    const connects = [
      [0, 1], [0, 2], [1, 3], [2, 3], [0, 3], [1, 2],
    ]
    connects.forEach(([a, b]) => {
      points.push(...boxPositions[a], ...boxPositions[b])
    })
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    return geo
  }, [])

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.1
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group position={[0, -viewport.height * 1, 0]}>
      {boxPositions.map((pos, i) => (
        <ServiceBox key={i} position={pos} color={colors[i]} />
      ))}

      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.15}
        />
      </lineSegments>

      {/* Background ring */}
      <mesh ref={ringRef} position={[0, 0, -2]}>
        <torusGeometry args={[3, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.8}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}
