import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  page: number
}

const PROGRESS: Record<number, number> = {
  // 6-page flow: pages 2-5 walking, page 5 merged
  2: 0,
  3: 0.25,
  4: 0.52,
  5: 0.78,
  // removed page 6 from walking
}

function BoyAvatar() {
  return (
    <motion.svg
      width={32} height={32} viewBox="0 0 40 44"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <ellipse cx="20" cy="10" rx="9" ry="6.5" fill="#4a2c0a" />
      <ellipse cx="13" cy="13" rx="3" ry="5" fill="#4a2c0a" />
      <circle cx="20" cy="15" r="9" fill="#FDDBB4" />
      <circle cx="16.5" cy="14.5" r="1.4" fill="#1a0a08" />
      <circle cx="23.5" cy="14.5" r="1.4" fill="#1a0a08" />
      <circle cx="17.2" cy="13.9" r="0.5" fill="white" />
      <circle cx="24.2" cy="13.9" r="0.5" fill="white" />
      <path d="M16.5 18.5 Q20 21 23.5 18.5" stroke="#c0856a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <rect x="12" y="24" width="16" height="14" rx="5" fill="#6AAEE8" />
      <rect x="6" y="24" width="6" height="11" rx="3" fill="#6AAEE8" />
      <rect x="28" y="24" width="6" height="11" rx="3" fill="#6AAEE8" />
      <rect x="13" y="36" width="6" height="8" rx="2.5" fill="#2a2a4a" />
      <rect x="21" y="36" width="6" height="8" rx="2.5" fill="#2a2a4a" />
    </motion.svg>
  )
}

function GirlAvatar() {
  return (
    <motion.svg
      width={32} height={32} viewBox="0 0 40 44"
      style={{ transform: 'scaleX(-1)' }}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
    >
      <ellipse cx="20" cy="9" rx="10" ry="7" fill="#7B2F7B" />
      <ellipse cx="11" cy="20" rx="4" ry="10" fill="#7B2F7B" />
      <ellipse cx="29" cy="20" rx="4" ry="10" fill="#7B2F7B" />
      <circle cx="20" cy="15" r="9" fill="#FDDBB4" />
      <ellipse cx="20" cy="8" rx="9" ry="4" fill="#7B2F7B" />
      <circle cx="16.5" cy="14.5" r="1.5" fill="#1a0a08" />
      <circle cx="23.5" cy="14.5" r="1.5" fill="#1a0a08" />
      <circle cx="17.3" cy="13.8" r="0.55" fill="white" />
      <circle cx="24.3" cy="13.8" r="0.55" fill="white" />
      <line x1="15" y1="12.5" x2="14.2" y2="11.5" stroke="#1a0a08" strokeWidth="0.8" />
      <line x1="16.5" y1="12" x2="16.2" y2="10.8" stroke="#1a0a08" strokeWidth="0.8" />
      <ellipse cx="14" cy="17" rx="2.5" ry="1.5" fill="#FFB3BA" opacity="0.5" />
      <ellipse cx="26" cy="17" rx="2.5" ry="1.5" fill="#FFB3BA" opacity="0.5" />
      <path d="M16.5 18.5 Q20 21.5 23.5 18.5" stroke="#c0856a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M12 24 L9 44 L31 44 L28 24 Z" fill="#F08DBD" />
      <rect x="12" y="23" width="16" height="9" rx="5" fill="#F08DBD" />
      <rect x="6" y="24" width="6" height="10" rx="3" fill="#F08DBD" />
      <rect x="28" y="24" width="6" height="10" rx="3" fill="#F08DBD" />
    </motion.svg>
  )
}

export default function BottomBar({ page }: Props) {
  const isMerged = page === 5
  const progress = PROGRESS[page] ?? 0
  const boyX = progress * 36
  const girlX = progress * 36

  return (
    <div style={{ position: 'absolute', bottom: 10, left: 14, right: 14, height: 48 }}>
      <AnimatePresence mode="wait">
        {isMerged ? (
          <motion.div
            key="merged"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              height: '100%',
              borderRadius: 24,
              background: 'linear-gradient(135deg, #FBEAF0, #fce4ef, #f0e8fb)',
              border: '1.5px solid #ED93B1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <BoyAvatar />
            <motion.span
              animate={{ scale: [1, 1.35, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.6 }}
              style={{ fontSize: 22 }}
            >❤️</motion.span>
            <GirlAvatar />
          </motion.div>
        ) : (
          <motion.div
            key="walking"
            style={{
              height: '100%',
              borderRadius: 24,
              background: '#fff3f7',
              border: '1px solid rgba(212,83,126,0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Boy from left */}
            <motion.div
              animate={{ left: `${boyX}%` }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                paddingLeft: 6,
              }}
            >
              <BoyAvatar />
              <span style={{ fontSize: 9, color: '#993556', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Sid</span>
            </motion.div>

            {/* Girl from right */}
            <motion.div
              animate={{ right: `${girlX}%` }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                paddingRight: 6,
              }}
            >
              <span style={{ fontSize: 9, color: '#2855a0', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Simran</span>
              <GirlAvatar />
            </motion.div>

            {/* Floating dots in gap */}
            {progress < 0.65 && (
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex', gap: 4,
              }}>
                {[0, 1, 2].map(i => (
                  <motion.div key={i}
                    animate={{ opacity: [0.1, 0.5, 0.1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                    style={{ width: 4, height: 4, borderRadius: '50%', background: '#ED93B1' }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
