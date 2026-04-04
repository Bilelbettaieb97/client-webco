'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export function ContactScene() {
  const { viewport } = useThree()
  const portalRef = useRef<THREE.Mesh>(null)
  const portalInnerRef = useRef<THREE.Mesh>(null)
  const streamGroupRef = useRef<THREE.Group>(null)

  const streamParticles = useMemo(() => {
    const streams: { positions: Float32Array; color: string }[] = []
    const colors = ['#8b5cf6', '#3b82f6', '#06b6d4']

    for (let s = 0; s < 3; s++) {
      const count = 40
      const positions = new Float32Array(count * 3)
      const angleOffset = (s / 3) * Math.PI * 2

      for (let i = 0; i < count; i++) {
        const t = i / count
        const radius = 4 - t * 3.5
        const angle = angleOffset + t * Math.PI * 3
        positions[i * 3] = Math.cos(angle) * radius
        positions[i * 3 + 1] = Math.sin(angle) * radius * 0.3
        positions[i * 3 + 2] = -t * 2
      }
      streams.push({ positions, color: colors[s] })
    }
    return streams
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (portalRef.current) {
      portalRef.current.rotation.z = t * 0.3
    }
    if (portalInnerRef.current) {
      portalInnerRef.current.rotation.z = -t * 0.5
      const pulse = 1 + Math.sin(t * 2) * 0.05
      portalInnerRef.current.scale.setScalar(pulse)
    }
    if (streamGroupRef.current) {
      streamGroupRef.current.rotation.z = t * 0.05
    }
  })

  return (
    <group position={[0, -viewport.height * 6, 0]}>
      {/* Large glowing portal torus */}
      <mesh ref={portalRef} position={[0, 0, -2]}>
        <torusGeometry args={[1.8, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Inner portal ring */}
      <mesh ref={portalInnerRef} position={[0, 0, -2]}>
        <torusGeometry args={[1.2, 0.02, 16, 80]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Portal glow center */}
      <mesh position={[0, 0, -2.1]}>
        <circleGeometry args={[1.2, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.3}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Converging particle streams */}
      <group ref={streamGroupRef}>
        {streamParticles.map((stream, i) => (
          <points key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[stream.positions, 3]}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.04}
              color={stream.color}
              transparent
              opacity={0.7}
              sizeAttenuation
              depthWrite={false}
            />
          </points>
        ))}
      </group>

      {/* Ambient floating geometry */}
      <Float speed={1.5} floatIntensity={0.5}>
        <mesh position={[-3, 1, -1]}>
          <icosahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.6}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={2} floatIntensity={0.4}>
        <mesh position={[3, -0.5, 0]}>
          <tetrahedronGeometry args={[0.25]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.6}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  )
}
