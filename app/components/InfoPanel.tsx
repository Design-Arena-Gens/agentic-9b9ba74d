'use client'

import { Monument } from '../data/monuments'

interface InfoPanelProps {
  monument: Monument
}

export default function InfoPanel({ monument }: InfoPanelProps) {
  return (
    <div style={{
      position: 'absolute',
      left: '20px',
      bottom: '100px',
      width: 'clamp(300px, 40vw, 500px)',
      background: 'rgba(0, 10, 20, 0.85)',
      border: '2px solid #0ff',
      padding: '20px',
      backdropFilter: 'blur(10px)',
      zIndex: 50,
      fontFamily: 'Rajdhani',
    }} className="neon-border">
      <div style={{
        borderBottom: '1px solid #0ff',
        paddingBottom: '10px',
        marginBottom: '15px',
      }}>
        <h2 style={{
          fontFamily: 'Orbitron',
          fontSize: '1.8rem',
          fontWeight: 700,
          margin: 0,
          color: '#0ff',
          textShadow: '0 0 10px #0ff',
        }}>
          {monument.name}
        </h2>
        <p style={{
          fontSize: '1rem',
          marginTop: '5px',
          color: '#f0f',
          textShadow: '0 0 5px #f0f',
        }}>
          {monument.location}
        </p>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h3 style={{
          fontFamily: 'Orbitron',
          fontSize: '1rem',
          color: '#0ff',
          marginBottom: '8px',
          letterSpacing: '2px',
        }}>
          // HISTORICAL DATA
        </h3>
        <p style={{
          fontSize: '0.95rem',
          lineHeight: '1.6',
          color: '#aaf',
          marginBottom: '10px',
        }}>
          {monument.original}
        </p>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h3 style={{
          fontFamily: 'Orbitron',
          fontSize: '1rem',
          color: '#f0f',
          marginBottom: '8px',
          letterSpacing: '2px',
        }}>
          // 2077 TRANSFORMATION
        </h3>
        <p style={{
          fontSize: '0.95rem',
          lineHeight: '1.6',
          color: '#faf',
        }}>
          {monument.cyberpunk}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        marginTop: '20px',
        paddingTop: '15px',
        borderTop: '1px solid rgba(0, 255, 255, 0.3)',
      }}>
        <div>
          <div style={{
            fontSize: '0.75rem',
            color: '#0ff',
            opacity: 0.7,
            letterSpacing: '1px',
          }}>
            STATUS
          </div>
          <div style={{
            fontSize: '1rem',
            color: '#0f0',
            fontFamily: 'Orbitron',
            textShadow: '0 0 5px #0f0',
          }}>
            ACTIVE
          </div>
        </div>
        <div>
          <div style={{
            fontSize: '0.75rem',
            color: '#0ff',
            opacity: 0.7,
            letterSpacing: '1px',
          }}>
            TECH LEVEL
          </div>
          <div style={{
            fontSize: '1rem',
            color: '#ff0',
            fontFamily: 'Orbitron',
            textShadow: '0 0 5px #ff0',
          }}>
            {monument.techLevel}
          </div>
        </div>
        <div>
          <div style={{
            fontSize: '0.75rem',
            color: '#0ff',
            opacity: 0.7,
            letterSpacing: '1px',
          }}>
            YEAR
          </div>
          <div style={{
            fontSize: '1rem',
            color: '#f0f',
            fontFamily: 'Orbitron',
          }}>
            {monument.year}
          </div>
        </div>
        <div>
          <div style={{
            fontSize: '0.75rem',
            color: '#0ff',
            opacity: 0.7,
            letterSpacing: '1px',
          }}>
            VISITORS
          </div>
          <div style={{
            fontSize: '1rem',
            color: '#0ff',
            fontFamily: 'Orbitron',
          }}>
            {monument.visitors}
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '15px',
        padding: '10px',
        background: 'rgba(255, 0, 255, 0.1)',
        border: '1px solid #f0f',
        fontSize: '0.85rem',
        color: '#faf',
        lineHeight: '1.4',
      }}>
        <strong style={{ color: '#f0f' }}>⚡ TECH FEATURES:</strong> {monument.features.join(' • ')}
      </div>
    </div>
  )
}
