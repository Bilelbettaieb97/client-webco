'use client'

import { useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'

interface ShapeConfig {
  position: [number, number, number]
  type: 'octahedron' | 'tetrahedron' | 'torus' | 'box' | 'dodecahedron'
  color: string
  scale: number
  speed: number
  floatIntensity: number
  rotationIntensity: number
}

function Shape({ config }: { config: ShapeConfig }) {
  const geometry = useMemo(() => {
    switch (config.type) {
      case 'octahedron':
        return <octahedronGeometry args={[0.15 * config.scale]} />
      case 'tetrahedron':
        return <tetrahedronGeometry args={[0.18 * config.scale]} />
      case 'torus':
        return <torusGeometry args={[0.12 * config.scale, 0.03 * config.scale, 8, 20]} />
      case 'box':
        return <boxGeometry args={[0.15 * config.scale, 0.15 * config.scale, 0.15 * config.scale]} />
      case 'dodecahedron':
        return <dodecahedronGeometry args={[0.12 * config.scale]} />
    }
  }, [config.type, config.scale])

  return (
    <Float
      speed={config.speed}
      floatIntensity={config.floatIntensity}
      rotationIntensity={config.rotationIntensity}
    >
      <mesh position={config.position}>
        {geometry}
        <meshStandardMaterial
          color={config.color}
          emissive={config.color}
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  )
}

export function FloatingGeometry() {
  const { viewport } = useThree()
  const totalHeight = viewport.height * 7

  const shapes = useMemo(() => {
    const types: ShapeConfig['type'][] = ['octahedron', 'tetrahedron', 'torus', 'box', 'dodecahedron']
    const colors = ['#8b5cf6', '#3b82f6', '#06b6d4']
    const configs: ShapeConfig[] = []

    for (let i = 0; i < 30; i++) {
      configs.push({
        position: [
          (Math.random() - 0.5) * 14,
          -Math.random() * totalHeight,
          (Math.random() - 0.5) * 6 - 2,
        ],
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: 0.5 + Math.random() * 1.5,
        speed: 1 + Math.random() * 2,
        floatIntensity: 0.3 + Math.random() * 0.5,
        rotationIntensity: 0.3 + Math.random() * 0.8,
      })
    }

    return configs
  }, [totalHeight])

  return (
    <group>
      {shapes.map((config, i) => (
        <Shape key={i} config={config} />
      ))}
    </group>
  )
}
