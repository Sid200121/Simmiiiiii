import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageReveal() {
  const [stage, setStage] = useState<'black' | 'line' | 'button' | 'playing'>('black')
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const t1 = setTimeout(() => setStage('line'), 2000)
    const t2 = setTimeout(() => setStage('button'), 4500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const handlePlay = () => {
    setStage('playing')
    setTimeout(() => {
      videoRef.current?.play()
    }, 600)
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#080808', position: 'relative', overflow: 'hidden' }}>

      {/* Stars background */}
      {[...Array(20)].map((_, i) => (
        <motion.div key={i}
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4 }}
          style={{ position: 'absolute', left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: 2, height: 2, borderRadius: '50%', background: 'white' }} />
      ))}

      <AnimatePresence mode="wait">
        {stage !== 'playing' ? (
          <motion.div key="reveal-content"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, padding: '32px 28px', zIndex: 1 }}>

            <AnimatePresence>
              {(stage === 'line' || stage === 'button') && (
                <motion.div key="text"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
                    one last thing
                  </p>
                  <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.1)' }} />
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontStyle: 'italic', color: 'rgba(255,255,255,0.88)', textAlign: 'center', lineHeight: 1.8, maxWidth: 240 }}>
                    "this one's for you,<br />always has been."
                  </p>
                  <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.1)' }} />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {stage === 'button' && (
                <motion.div key="playbtn"
                  initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                  <motion.button onClick={handlePlay}
                    whileHover={{ scale: 1.12, borderColor: 'rgba(255,255,255,0.5)' }}
                    whileTap={{ scale: 0.92 }}
                    style={{ width: 72, height: 72, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.25)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'border-color 0.3s' }}>
                    <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <div style={{ width: 0, height: 0, borderTop: '13px solid transparent', borderBottom: '13px solid transparent', borderLeft: '22px solid rgba(255,255,255,0.8)', marginLeft: 5 }} />
                    </motion.div>
                  </motion.button>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
                    tap to play
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* VIDEO PLAYING STATE */
          <motion.div key="video-player"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
            <video
              ref={videoRef}
              src="/reveal.mp4"
              controls
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'contain', maxHeight: '100%' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
