import { motion } from 'framer-motion'

interface Props {
  onNext: () => void
}

const LOVES = [
  { text: 'Your laugh when something is actually funny', emoji: '😂', bg: '#FFF9E6', pin: '#F5C842', rotate: -2.5 },
  { text: 'The way you recommend songs like they matter', emoji: '🎵', bg: '#FFE8F4', pin: '#F08DBD', rotate: 1.8 },
  { text: 'How honest you are, always', emoji: '💬', bg: '#E8F0FF', pin: '#7BA3F5', rotate: -1.2 },
  { text: 'Your taste in everything — music, vibes, life', emoji: '✨', bg: '#EDFAF2', pin: '#6DC993', rotate: 2.2 },
  { text: 'The way you care so deeply about things', emoji: '🥺', bg: '#FFF0E8', pin: '#F5A472', rotate: -2.8 },
  { text: 'Your smile. I could write a whole page on just that.', emoji: '🌸', bg: '#FFE8F4', pin: '#F08DBD', rotate: 1.5 },
  { text: 'How you make the ordinary feel special', emoji: '☀️', bg: '#FFF9E6', pin: '#F5C842', rotate: -1.8 },
  { text: 'You. Just every little bit of you.', emoji: '💕', bg: '#F3E8FF', pin: '#C084FC', rotate: 2.0 },
]

export default function PageLoves({ onNext }: Props) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--pink-pale)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          padding: '20px 22px 12px',
          borderBottom: '1px dashed rgba(212,83,126,0.15)',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-hand)',
          fontSize: 12,
          color: 'var(--pink-mid)',
          opacity: 0.7,
          marginBottom: 4,
          letterSpacing: '0.5px',
        }}>
          things I love about you —
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 26,
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'var(--text-dark)',
          lineHeight: 1.2,
        }}>
          let me count<br />the ways 🌸
        </h2>
      </motion.div>

      {/* Sticky notes board */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '14px 16px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '14px 10px',
        alignContent: 'start',
      }}>
        {LOVES.map((love, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: love.rotate }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: 'easeOut' }}
            whileHover={{ scale: 1.06, rotate: 0, zIndex: 20, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
            style={{
              background: love.bg,
              borderRadius: 4,
              padding: '28px 10px 12px',
              position: 'relative',
              boxShadow: '2px 4px 10px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
              cursor: 'default',
              transformOrigin: 'top center',
            }}
          >
            {/* Pin dot at top */}
            <div style={{
              position: 'absolute',
              top: 10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: love.pin,
              boxShadow: `0 2px 4px ${love.pin}66`,
            }} />

            {/* Emoji */}
            <div style={{ fontSize: 20, marginBottom: 6 }}>{love.emoji}</div>

            {/* Text */}
            <p style={{
              fontFamily: 'var(--font-hand)',
              fontSize: 14,
              lineHeight: 1.55,
              color: '#2d1020',
            }}>
              {love.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Next button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{ padding: '10px 22px 16px', display: 'flex', justifyContent: 'center' }}
      >
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onNext}
          style={{
            background: 'var(--pink-soft)',
            border: '1.5px solid var(--pink-border)',
            color: 'var(--pink-deep)',
            padding: '10px 32px',
            borderRadius: 24,
            fontSize: 13,
            fontWeight: 500,
            fontFamily: 'var(--font-body)',
            cursor: 'pointer',
          }}
        >
          next →
        </motion.button>
      </motion.div>
    </div>
  )
}
