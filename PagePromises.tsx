import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Props {
  onNext: () => void
}

const PROMISES = [
  'I promise to always listen first, before anything else',
  'I promise to never make you feel alone in this',
  'I promise to show up for you, every single time',
  'I promise to be the person you deserve, not just when it is easy',
  'I promise to choose you, always',
]

export default function PagePromises({ onNext }: Props) {
  const [checked, setChecked] = useState<boolean[]>(new Array(PROMISES.length).fill(false))

  useEffect(() => {
    PROMISES.forEach((_, i) => {
      setTimeout(() => {
        setChecked(prev => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, 600 + i * 700)
    })
  }, [])

  const allDone = checked.every(Boolean)

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 22px 16px',
      background: 'var(--pink-pale)',
    }}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--pink-mid)', opacity: 0.6, textAlign: 'center', marginBottom: 24 }}>
          i mean every word
        </p>
      </motion.div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {PROMISES.map((promise, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}
          >
            <motion.div
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                border: checked[i] ? '2px solid #5a9a5a' : '2px solid #e8d0dc',
                background: checked[i] ? '#f0faf0' : 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 2,
                transition: 'all 0.3s ease',
              }}
            >
              {checked[i] && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  style={{ fontSize: 11, color: '#2d6a2d', lineHeight: 1 }}
                >✓</motion.span>
              )}
            </motion.div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: checked[i] ? 'var(--text-dark)' : 'var(--text-muted)',
              lineHeight: 1.6,
              transition: 'color 0.4s ease',
            }}>
              {promise}
            </p>
          </motion.div>
        ))}
      </div>

      {allDone && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: 'var(--font-hand)', fontSize: 15, color: 'var(--text-muted)', textAlign: 'center', marginTop: 12 }}
        >
          and I mean all of them 🤍
        </motion.p>
      )}

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: allDone ? 1 : 0 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onNext}
        style={{
          marginTop: 14,
          alignSelf: 'center',
          background: 'var(--pink-soft)',
          border: '1.5px solid var(--pink-border)',
          color: 'var(--pink-deep)',
          padding: '10px 28px',
          borderRadius: 24,
          fontSize: 13,
          fontWeight: 500,
          fontFamily: 'var(--font-body)',
          cursor: allDone ? 'pointer' : 'default',
          pointerEvents: allDone ? 'auto' : 'none',
        }}
      >
        next →
      </motion.button>
    </div>
  )
}
