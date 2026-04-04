'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

export function AnimatedSphere() {
  const meshRef = useRef<Mesh>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime

    // Slow rotation
    meshRef.current.rotation.x = time * 0.15 + mouseRef.current.y * 0.3
    meshRef.current.rotation.y = time * 0.2 + mouseRef.current.x * 0.3

    // Breathing scale
    const scale = 1 + Math.sin(time * 0.5) * 0.05
    meshRef.current.scale.setScalar(scale)

    // Track mouse
    mouseRef.current.x += (state.pointer.x - mouseRef.current.x) * 0.05
    mouseRef.current.y += (state.pointer.y - mouseRef.current.y) * 0.05
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.2, 1]} />
      <meshBasicMaterial
        color="#8b5cf6"
        wireframe
        transparent
        opacity={0.35}
      />
    </mesh>
  )
}
