"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import { useReducedMotion } from "framer-motion"

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse;
    float t = u_time * 0.15;
    float n1 = snoise(uv * 2.0 + t * 0.5 + mouse * 0.3);
    float n2 = snoise(uv * 3.0 - t * 0.3 + vec2(5.0, 3.0));
    float n3 = snoise(uv * 1.5 + t * 0.2 + mouse * 0.2 + vec2(10.0, 7.0));
    float combined = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    vec3 violet = vec3(0.545, 0.361, 0.965);
    vec3 blue = vec3(0.231, 0.510, 0.965);
    vec3 cyan = vec3(0.024, 0.714, 0.831);
    vec3 color = mix(violet, blue, smoothstep(-0.3, 0.3, n1));
    color = mix(color, cyan, smoothstep(-0.2, 0.5, n2));
    float mouseDist = distance(uv, mouse);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.15;
    float alpha = (0.12 + combined * 0.06 + mouseInfluence);
    alpha = clamp(alpha, 0.0, 0.25);
    gl_FragColor = vec4(color, alpha);
  }
`

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shouldReduce = useReducedMotion()
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef(0)
  const firstFrameRef = useRef(false)
  const [ready, setReady] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: 1.0 - (e.clientY - rect.top) / rect.height,
    }
  }, [])

  useEffect(() => {
    if (shouldReduce) return

    let mounted = true

    try {
      const canvas = canvasRef.current
      if (!canvas) return

      const gl = canvas.getContext("webgl", {
        alpha: true,
        premultipliedAlpha: false,
        antialias: false,
      })
      if (!gl) return // No WebGL = canvas stays opacity:0 = parent gradient visible

      function createShader(glCtx: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
        const shader = glCtx.createShader(type)
        if (!shader) return null
        glCtx.shaderSource(shader, source)
        glCtx.compileShader(shader)
        if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
          glCtx.deleteShader(shader)
          return null
        }
        return shader
      }

      const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
      const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
      if (!vs || !fs) return

      const program = gl.createProgram()
      if (!program) return
      gl.attachShader(program, vs)
      gl.attachShader(program, fs)
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return

      gl.useProgram(program)

      const posBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
      const posLoc = gl.getAttribLocation(program, "a_position")
      gl.enableVertexAttribArray(posLoc)
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

      const uTime = gl.getUniformLocation(program, "u_time")
      const uResolution = gl.getUniformLocation(program, "u_resolution")
      const uMouse = gl.getUniformLocation(program, "u_mouse")

      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

      const resize = () => {
        try {
          const dpr = Math.min(window.devicePixelRatio, 1.5)
          canvas.width = canvas.clientWidth * dpr
          canvas.height = canvas.clientHeight * dpr
          gl.viewport(0, 0, canvas.width, canvas.height)
        } catch { /* ignore */ }
      }
      resize()
      const ro = new ResizeObserver(resize)
      ro.observe(canvas)

      startTimeRef.current = performance.now()

      const c = canvas // local const for TypeScript closure
      function render() {
        if (!mounted || !gl || !program || !c) return
        try {
          const time = (performance.now() - startTimeRef.current) / 1000
          gl.clearColor(0, 0, 0, 0)
          gl.clear(gl.COLOR_BUFFER_BIT)
          gl.useProgram(program)
          gl.uniform1f(uTime, time)
          gl.uniform2f(uResolution, c.width, c.height)
          gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y)
          gl.drawArrays(gl.TRIANGLES, 0, 6)

          // After first successful frame → fade in the canvas
          if (!firstFrameRef.current && mounted) {
            firstFrameRef.current = true
            setReady(true)
          }

          rafRef.current = requestAnimationFrame(render)
        } catch {
          // WebGL error — stop rendering, canvas stays transparent
        }
      }

      rafRef.current = requestAnimationFrame(render)

      let lastMouseUpdate = 0
      const throttledMouseMove = (e: MouseEvent) => {
        const now = performance.now()
        if (now - lastMouseUpdate < 16) return
        lastMouseUpdate = now
        handleMouseMove(e)
      }
      window.addEventListener("mousemove", throttledMouseMove, { passive: true })

      return () => {
        mounted = false
        cancelAnimationFrame(rafRef.current)
        window.removeEventListener("mousemove", throttledMouseMove)
        ro.disconnect()
        try { gl.deleteProgram(program); gl.deleteShader(vs); gl.deleteShader(fs); gl.deleteBuffer(posBuffer) } catch { /* ignore */ }
      }
    } catch {
      // WebGL completely failed — canvas stays at opacity: 0
      return
    }
  }, [shouldReduce, handleMouseMove])

  // Reduced motion: render nothing (parent has static gradient)
  if (shouldReduce) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000"
      style={{ opacity: ready ? 1 : 0 }}
      aria-hidden="true"
    />
  )
}
