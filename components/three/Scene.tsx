'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AnimatedSphere } from './AnimatedSphere'
import { Particles } from './Particles'

export function Scene() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <AnimatedSphere />
          <Particles count={150} />
        </Suspense>
      </Canvas>
    </div>
  )
}
