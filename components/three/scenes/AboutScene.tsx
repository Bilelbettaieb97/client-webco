'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function HelixSphere({ position, color, size = 0.06 }: {
  position: [number, number, number]
  color: string
  size?: number
}) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
      />
    </mesh>
  )
}

export function AboutScene() {
  const { viewport } = useThree()
  const helixRef = useRef<THREE.Group>(null)
  const dodecRef = useRef<THREE.Mesh>(null)

  const helixPoints = useMemo(() => {
    const points: { position: [number, number, number]; color: string }[] = []
    const colors = ['#8b5cf6', '#3b82f6', '#06b6d4']
    for (let i = 0; i < 60; i++) {
      const t = (i / 60) * Math.PI * 6
      const radius = 1.2
      const y = (i / 60 - 0.5) * 4
      points.push({
        position: [Math.cos(t) * radius, y, Math.sin(t) * radius],
        color: colors[i % 3],
      })
      // Second strand (DNA double helix)
      points.push({
        position: [Math.cos(t + Math.PI) * radius, y, Math.sin(t + Math.PI) * radius],
        color: colors[(i + 1) % 3],
      })
    }
    return points
  }, [])

  // Connection lines between helix strands
  const connectionLines = useMemo(() => {
    const positions: number[] = []
    for (let i = 0; i < 60; i += 3) {
      const t = (i / 60) * Math.PI * 6
      const radius = 1.2
      const y = (i / 60 - 0.5) * 4
      positions.push(
        Math.cos(t) * radius, y, Math.sin(t) * radius,
        Math.cos(t + Math.PI) * radius, y, Math.sin(t + Math.PI) * radius,
      )
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (helixRef.current) {
      helixRef.current.rotation.y = t * 0.1
    }
    if (dodecRef.current) {
      dodecRef.current.rotation.x = t * 0.15
      dodecRef.current.rotation.y = t * 0.2
    }
  })

  return (
    <group position={[0, -viewport.height * 3, 0]}>
      {/* DNA helix */}
      <group ref={helixRef} position={[-2.5, 0, 0]}>
        {helixPoints.map((p, i) => (
          <HelixSphere key={i} position={p.position} color={p.color} />
        ))}
        {/* Connection rungs */}
        <lineSegments geometry={connectionLines}>
          <lineBasicMaterial color="#8b5cf6" transparent opacity={0.2} />
        </lineSegments>
      </group>

      {/* Floating dodecahedron */}
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh ref={dodecRef} position={[2.5, 0, -1]}>
          <dodecahedronGeometry args={[0.8]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.4}
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>

      {/* Network nodes */}
      {[
        { pos: [2, 1, 0.5] as [number, number, number], c: '#3b82f6' },
        { pos: [3, -0.5, -0.5] as [number, number, number], c: '#06b6d4' },
        { pos: [2.5, 0.8, -1.5] as [number, number, number], c: '#8b5cf6' },
      ].map((node, i) => (
        <Float key={i} speed={1.5 + i * 0.3} floatIntensity={0.3}>
          <mesh position={node.pos}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={node.c}
              emissive={node.c}
              emissiveIntensity={1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}
