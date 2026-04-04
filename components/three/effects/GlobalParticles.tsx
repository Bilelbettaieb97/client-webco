'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export function GlobalParticles() {
  const { viewport } = useThree()
  const pointsRef = useRef<THREE.Points>(null)

  const totalHeight = viewport.height * 7

  const { positions, colors, basePositions } = useMemo(() => {
    const count = 600
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const basePositions = new Float32Array(count * 3)

    const colorOptions = [
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#3b82f6'),
      new THREE.Color('#06b6d4'),
    ]

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20
      const y = -Math.random() * totalHeight
      const z = (Math.random() - 0.5) * 10 - 2

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      basePositions[i * 3] = x
      basePositions[i * 3 + 1] = y
      basePositions[i * 3 + 2] = z

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors, basePositions }
  }, [totalHeight])

  useFrame((state) => {
    if (!pointsRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position
    const arr = posAttr.array as Float32Array
    const t = state.clock.elapsedTime

    for (let i = 0; i < arr.length / 3; i++) {
      arr[i * 3] = basePositions[i * 3] + Math.sin(t * 0.2 + i * 0.1) * 0.15
      arr[i * 3 + 1] = basePositions[i * 3 + 1] + Math.cos(t * 0.15 + i * 0.05) * 0.1
      arr[i * 3 + 2] = basePositions[i * 3 + 2] + Math.sin(t * 0.1 + i * 0.08) * 0.1
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
