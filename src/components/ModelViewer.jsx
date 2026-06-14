/**
 * ModelViewer — wraps Google's <model-viewer> web component.
 *
 * HOW GLB SWAPPING WORKS (no code changes needed):
 *   1. Drop your .glb into public/assets/3d/  e.g. ai-brain.glb
 *   2. Pass src="/Portfolio/assets/3d/ai-brain.glb" as a prop
 *   3. This component tries to fetch the file — if it 404s it shows
 *      the animated placeholder instead of a broken model viewer.
 *   4. Once the real GLB is there, it renders automatically on next page load.
 */

import { useState, useEffect, useRef } from 'react'

const BASE_STYLES = { position: 'relative', width: '100%', height: '100%' }

function Placeholder({ label, ringColor = '#00f5ff' }) {
  return (
    <div style={{ ...BASE_STYLES, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Concentric spinning rings */}
      {[100, 150, 200].map((size, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: size, height: size,
          borderRadius: '50%',
          border: `1px solid ${ringColor}`,
          opacity: 0.25 - i * 0.06,
          animation: `mvSpin ${6 + i * 4}s linear infinite ${i % 2 ? 'reverse' : ''}`,
        }} />
      ))}

      {/* Pulsing core */}
      <div style={{
        width: 70, height: 70, borderRadius: '50%',
        background: `radial-gradient(circle, ${ringColor}33, #7c3aed22, transparent)`,
        border: `2px solid ${ringColor}88`,
        boxShadow: `0 0 40px ${ringColor}44`,
        animation: 'mvPulse 3s ease-in-out infinite',
        position: 'relative', zIndex: 1,
      }} />

      {/* Label */}
      {label && (
        <span style={{
          position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '0.52rem', letterSpacing: '4px',
          color: ringColor, opacity: 0.55,
          whiteSpace: 'nowrap',
        }}>
          {label} — GLB PENDING
        </span>
      )}

      <style>{`
        @keyframes mvSpin  { to { transform: rotate(360deg); } }
        @keyframes mvPulse {
          0%,100% { box-shadow: 0 0 30px ${ringColor}44; }
          50%      { box-shadow: 0 0 70px ${ringColor}99; }
        }
      `}</style>
    </div>
  )
}

export default function ModelViewer({
  src,
  alt = '3D model',
  label,
  className = '',
  style = {},
  autoRotate = true,
  cameraControls = true,
  ringColor = '#00f5ff',
  exposure = '0.9',
  shadowIntensity = '0',
  extraProps = {},
}) {
  const [glbReady, setGlbReady] = useState(false)
  const checkedRef = useRef(null)

  useEffect(() => {
    if (!src || checkedRef.current === src) return
    checkedRef.current = src
    // Check if GLB actually exists — falls back to placeholder on 404
    fetch(src, { method: 'HEAD' })
      .then(r => { if (r.ok) setGlbReady(true) })
      .catch(() => {})
  }, [src])

  const containerStyle = { ...BASE_STYLES, ...style }

  if (!src || !glbReady) {
    return (
      <div className={className} style={containerStyle}>
        <Placeholder label={label} ringColor={ringColor} />
      </div>
    )
  }

  return (
    <div className={className} style={containerStyle}>
      {/* eslint-disable-next-line */}
      <model-viewer
        src={src}
        alt={alt}
        auto-rotate={autoRotate ? '' : undefined}
        camera-controls={cameraControls ? '' : undefined}
        shadow-intensity={shadowIntensity}
        exposure={exposure}
        environment-image="neutral"
        loading="lazy"
        style={{ width: '100%', height: '100%', background: 'transparent' }}
        class={className}
        {...extraProps}
      />
    </div>
  )
}
