'use client'

import { useState, Suspense } from 'react'
import Scene from './components/Scene'
import InfoPanel from './components/InfoPanel'
import Navigation from './components/Navigation'
import { monuments } from './data/monuments'

export default function Home() {
  const [selectedMonument, setSelectedMonument] = useState(0)
  const [showInfo, setShowInfo] = useState(true)

  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div className="scan-line"></div>
      <div className="noise"></div>

      <Suspense fallback={
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          fontFamily: 'Orbitron',
        }} className="neon-text glitch">
          INITIALIZING NEURAL LINK...
        </div>
      }>
        <Scene monument={monuments[selectedMonument]} />
      </Suspense>

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        pointerEvents: 'none',
        zIndex: 100,
      }}>
        <div style={{ pointerEvents: 'auto' }}>
          <h1 style={{
            fontFamily: 'Orbitron',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            fontWeight: 900,
            margin: 0,
            letterSpacing: '3px',
          }} className="neon-text glitch">
            MONUMENTS 2077
          </h1>
          <p style={{
            fontFamily: 'Rajdhani',
            fontSize: '1rem',
            marginTop: '5px',
            opacity: 0.8,
            letterSpacing: '2px',
          }}>
            WORLD HERITAGE // CYBERPUNK ERA
          </p>
        </div>

        <button
          onClick={() => setShowInfo(!showInfo)}
          style={{
            pointerEvents: 'auto',
            background: 'rgba(0, 255, 255, 0.1)',
            border: '2px solid #0ff',
            color: '#0ff',
            padding: '10px 20px',
            cursor: 'pointer',
            fontFamily: 'Orbitron',
            fontSize: '0.9rem',
            letterSpacing: '2px',
            transition: 'all 0.3s',
          }}
          className="neon-border"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 255, 255, 0.2)'
            e.currentTarget.style.boxShadow = '0 0 20px #0ff, inset 0 0 20px #0ff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 255, 255, 0.1)'
            e.currentTarget.style.boxShadow = '0 0 5px #0ff, 0 0 10px #0ff, inset 0 0 5px #0ff, inset 0 0 10px #0ff'
          }}
        >
          {showInfo ? 'HIDE DATA' : 'SHOW DATA'}
        </button>
      </div>

      {showInfo && (
        <InfoPanel monument={monuments[selectedMonument]} />
      )}

      <Navigation
        monuments={monuments}
        selectedIndex={selectedMonument}
        onSelect={setSelectedMonument}
      />
    </main>
  )
}
