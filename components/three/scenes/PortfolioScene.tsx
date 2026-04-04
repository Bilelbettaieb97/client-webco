'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function FloatingPlane({ position, rotation, color }: {
  position: [number, number, number]
  rotation: [number, number, number]
  color: string
}) {
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh position={position} rotation={rotation}>
        <planeGeometry args={[1.2, 0.8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Frame border */}
      <lineSegments position={position} rotation={rotation}>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.2, 0.8)]} />
        <lineBasicMaterial color={color} transparent opacity={0.4} />
      </lineSegments>
    </Float>
  )
}

export function PortfolioScene() {
  const { viewport } = useThree()
  const gridRef = useRef<THREE.GridHelper>(null)
  const decoGroupRef = useRef<THREE.Group>(null)

  const planes = useMemo(() => {
    const items: { position: [number, number, number]; rotation: [number, number, number]; color: string }[] = []
    const colors = ['#8b5cf6', '#3b82f6', '#06b6d4']
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      const radius = 2.5
      items.push({
        position: [Math.cos(angle) * radius, Math.sin(angle) * 0.3, Math.sin(angle) * radius * 0.5 - 1],
        rotation: [0, -angle + Math.PI * 0.1, 0],
        color: colors[i % 3],
      })
    }
    return items
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (decoGroupRef.current) {
      decoGroupRef.current.rotation.y = t * 0.03
    }
  })

  return (
    <group position={[0, -viewport.height * 2, 0]}>
      {/* Floating planes arranged in arc */}
      {planes.map((p, i) => (
        <FloatingPlane key={i} {...p} />
      ))}

      {/* Wireframe grid floor */}
      <gridHelper
        ref={gridRef}
        args={[20, 40, '#8b5cf620', '#8b5cf610']}
        position={[0, -2, 0]}
      />

      {/* Floating decorations */}
      <group ref={decoGroupRef}>
        <Float speed={2} floatIntensity={0.5}>
          <mesh position={[3, 1, -1]}>
            <tetrahedronGeometry args={[0.2]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={0.8}
              wireframe
            />
          </mesh>
        </Float>

        <Float speed={1.5} floatIntensity={0.4}>
          <mesh position={[-3, -0.5, 0.5]}>
            <octahedronGeometry args={[0.25]} />
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#8b5cf6"
              emissiveIntensity={0.8}
              wireframe
            />
          </mesh>
        </Float>

        <Float speed={1.8} floatIntensity={0.6}>
          <mesh position={[0, 1.5, -2]}>
            <dodecahedronGeometry args={[0.15]} />
            <meshStandardMaterial
              color="#3b82f6"
              emissive="#3b82f6"
              emissiveIntensity={0.8}
              wireframe
            />
          </mesh>
        </Float>
      </group>
    </group>
  )
}
