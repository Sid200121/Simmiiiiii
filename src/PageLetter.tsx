import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Props {
  onNext: () => void
}

const LETTER = `I know you're upset with me, and honestly, you have every right to be. I've been thinking a lot about what happened, and I just needed you to know — truly know — how sorry I am.

Not the kind of sorry that just fills silence. The kind that comes from actually sitting with what I did wrong.

You matter to me more than I probably show sometimes. And that's on me. You deserve someone who makes you feel that every single day, not just in the moments when things go wrong.

I'm not asking you to forgive me right now. I just needed you to read this. To know that I see you, I value you, and I'm going to do better.

Because you're worth doing better for.`

export default function PageLetter({ onNext }: Props) {
  const [displayed, setDisplayed] = useState('')
  const [isDone, setIsDone] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (charIndex < LETTER.length) {
      const speed = LETTER[charIndex] === '.' || LETTER[charIndex] === ',' ? 60 : 22
      const timeout = setTimeout(() => {
        setDisplayed(prev => prev + LETTER[charIndex])
        setCharIndex(i => i + 1)
      }, speed)
      return () => clearTimeout(timeout)
    } else {
      setTimeout(() => setIsDone(true), 400)
    }
  }, [charIndex])

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 24px 16px',
      background: 'var(--pink-pale)',
      overflow: 'hidden',
    }}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--pink-mid)', opacity: 0.6, textAlign: 'center', marginBottom: 16 }}>
          a letter, just for you
        </p>

        <div style={{ borderBottom: '1px solid var(--text-faint)', paddingBottom: 12, marginBottom: 16 }}>
          <p style={{ fontFamily: 'var(--font-hand)', fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>from Sid, with love</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, fontStyle: 'italic', color: 'var(--text-dark)' }}>Dear Simran,</h2>
        </div>
      </motion.div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        paddingRight: 4,
        paddingBottom: 8,
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          lineHeight: 1.9,
          color: 'var(--text-dark)',
          whiteSpace: 'pre-wrap',
        }}>
          {displayed}
          {!isDone && (
            <span style={{
              display: 'inline-block',
              width: 2,
              height: 14,
              background: 'var(--pink-mid)',
              borderRadius: 2,
              marginLeft: 1,
              verticalAlign: 'middle',
              animation: 'blink 0.9s infinite',
            }} />
          )}
        </p>

        {isDone && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ fontFamily: 'var(--font-hand)', fontSize: 18, color: 'var(--text-muted)', marginTop: 20, textAlign: 'right' }}
          >
            — Sid 🤍
          </motion.p>
        )}
      </div>

      {!isDone && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: 8 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 5, height: 5, borderRadius: '50%', background: 'var(--pink-mid)',
              animation: `pulse-soft 1.2s ${i * 0.2}s infinite`,
            }} />
          ))}
          <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 4 }}>typing...</span>
        </div>
      )}

      {isDone && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          style={{
            marginTop: 12,
            alignSelf: 'center',
            background: 'var(--pink-soft)',
            border: '1.5px solid var(--pink-border)',
            color: 'var(--pink-deep)',
            padding: '10px 28px',
            borderRadius: 24,
            fontSize: 13,
            fontWeight: 500,
            fontFamily: 'var(--font-body)',
          }}
        >
          next →
        </motion.button>
      )}
    </div>
  )
}
