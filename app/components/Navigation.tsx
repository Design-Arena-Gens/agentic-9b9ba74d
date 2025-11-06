'use client'

import { Monument } from '../data/monuments'

interface NavigationProps {
  monuments: Monument[]
  selectedIndex: number
  onSelect: (index: number) => void
}

export default function Navigation({ monuments, selectedIndex, onSelect }: NavigationProps) {
  return (
    <div style={{
      position: 'absolute',
      right: '20px',
      bottom: '20px',
      width: 'clamp(250px, 30vw, 350px)',
      maxHeight: '70vh',
      overflowY: 'auto',
      background: 'rgba(0, 10, 20, 0.85)',
      border: '2px solid #0ff',
      backdropFilter: 'blur(10px)',
      zIndex: 50,
    }} className="neon-border">
      <div style={{
        padding: '15px',
        borderBottom: '1px solid #0ff',
        position: 'sticky',
        top: 0,
        background: 'rgba(0, 10, 20, 0.95)',
        zIndex: 1,
      }}>
        <h3 style={{
          fontFamily: 'Orbitron',
          fontSize: '1.2rem',
          margin: 0,
          color: '#0ff',
          letterSpacing: '2px',
        }}>
          // MONUMENT INDEX
        </h3>
      </div>

      <div>
        {monuments.map((monument, index) => (
          <button
            key={monument.id}
            onClick={() => onSelect(index)}
            style={{
              width: '100%',
              padding: '15px',
              background: selectedIndex === index
                ? 'rgba(0, 255, 255, 0.2)'
                : 'transparent',
              border: 'none',
              borderBottom: '1px solid rgba(0, 255, 255, 0.2)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.3s',
              position: 'relative',
              fontFamily: 'Rajdhani',
            }}
            onMouseEnter={(e) => {
              if (selectedIndex !== index) {
                e.currentTarget.style.background = 'rgba(0, 255, 255, 0.1)'
              }
            }}
            onMouseLeave={(e) => {
              if (selectedIndex !== index) {
                e.currentTarget.style.background = 'transparent'
              }
            }}
          >
            {selectedIndex === index && (
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '3px',
                background: '#0ff',
                boxShadow: '0 0 10px #0ff',
              }} />
            )}

            <div style={{
              fontSize: '0.7rem',
              color: '#f0f',
              letterSpacing: '1px',
              marginBottom: '3px',
              fontFamily: 'Orbitron',
            }}>
              #{String(index + 1).padStart(2, '0')}
            </div>

            <div style={{
              fontSize: '1.1rem',
              color: selectedIndex === index ? '#0ff' : '#aaf',
              fontWeight: selectedIndex === index ? 600 : 400,
              marginBottom: '3px',
              textShadow: selectedIndex === index ? '0 0 5px #0ff' : 'none',
            }}>
              {monument.name}
            </div>

            <div style={{
              fontSize: '0.85rem',
              color: '#888',
              opacity: 0.8,
            }}>
              {monument.location}
            </div>

            {selectedIndex === index && (
              <div style={{
                marginTop: '8px',
                padding: '5px 10px',
                background: 'rgba(0, 255, 0, 0.2)',
                border: '1px solid #0f0',
                fontSize: '0.75rem',
                color: '#0f0',
                fontFamily: 'Orbitron',
                letterSpacing: '1px',
                display: 'inline-block',
              }}>
                ACTIVE
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
