import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onNext: () => void
}

export default function PageSimran({ onNext }: Props) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })
  const [noClicks, setNoClicks] = useState(0)
  const [showBlobs, setShowBlobs] = useState(false)

  useEffect(() => {
    setTimeout(() => setShowBlobs(true), 300)
  }, [])

  const runAway = () => {
    const x = (Math.random() - 0.5) * 280
    const y = (Math.random() - 0.5) * 180
    setNoPos({ x, y })
    setNoClicks(c => c + 1)
  }

  const noMessages = [
    'nope 😤', 'try again', 'run run run', 'not today',
    'lol no', 'catch me', '😂', 'nice try'
  ]

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 28px',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--pink-pale)',
    }}>
      {/* Decorative blobs */}
      {showBlobs && <>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: '#fce8f2', opacity: 0.5, zIndex: 0 }} />
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          style={{ position: 'absolute', bottom: 80, left: -50, width: 120, height: 120, borderRadius: '50%', background: '#fbeaf0', opacity: 0.6, zIndex: 0 }} />
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
          style={{ position: 'absolute', top: 60, left: 20, width: 30, height: 30, borderRadius: '50%', background: '#ED93B1', opacity: 0.3, zIndex: 0 }} />
        <motion.div
          animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', bottom: 120, right: 24, fontSize: 18, opacity: 0.4, zIndex: 0 }}>✦</motion.div>
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ position: 'absolute', top: 100, right: 30, fontSize: 14, opacity: 0.3, zIndex: 0 }}>♡</motion.div>
      </>}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: 64, marginBottom: 20 }}
        >🌸</motion.div>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--pink-mid)', opacity: 0.7, marginBottom: 10 }}>
          wait a second...
        </p>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 34,
          fontWeight: 500,
          color: 'var(--text-dark)',
          textAlign: 'center',
          lineHeight: 1.2,
          marginBottom: 12,
        }}>
          Are you<br />Simran?
        </h1>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginBottom: 36 }}>
          please be honest with me
        </p>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center', position: 'relative' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            style={{
              background: 'var(--pink-soft)',
              border: '1.5px solid var(--pink-border)',
              color: 'var(--pink-deep)',
              padding: '13px 36px',
              borderRadius: 28,
              fontSize: 15,
              fontWeight: 500,
              fontFamily: 'var(--font-body)',
              cursor: 'pointer',
            }}
          >
            Yes
          </motion.button>

          <AnimatePresence>
            <motion.button
              key={noClicks}
              animate={{ x: noPos.x, y: noPos.y }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onMouseEnter={runAway}
              onTouchStart={runAway}
              style={{
                background: '#f5f0f2',
                border: '1px solid #e8dde2',
                color: '#bba8b2',
                padding: '13px 36px',
                borderRadius: 28,
                fontSize: 15,
                fontFamily: 'var(--font-body)',
                cursor: 'default',
                whiteSpace: 'nowrap',
                position: noClicks > 0 ? 'fixed' : 'relative',
                zIndex: 999,
              }}
            >
              {noClicks > 0 ? noMessages[Math.min(noClicks - 1, noMessages.length - 1)] : 'No'}
            </motion.button>
          </AnimatePresence>
        </div>

        {noClicks > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginTop: 20, color: 'var(--text-muted)', fontFamily: 'var(--font-hand)', fontSize: 14 }}
          >
            {noClicks > 3 ? "okay fine, I know it's you 😄" : "that button isn't cooperating..."}
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}
