import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onNext: () => void
}

const HEART_COLORS = ['#FF6B9D', '#FF8FB1', '#FFB3CB', '#FF4F81', '#E8436A', '#FF85A1', '#FFD6E0', '#FF3366']

function FallingHearts() {
  const hearts = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 3.5 + Math.random() * 3,
    size: 12 + Math.random() * 22,
    color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
    rotation: (Math.random() - 0.5) * 40,
    wobble: (Math.random() - 0.5) * 60,
  }))

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {hearts.map(h => (
        <motion.div
          key={h.id}
          initial={{ y: -60, x: 0, opacity: 0, rotate: h.rotation, scale: 0.5 }}
          animate={{ y: '110vh', x: [0, h.wobble, -h.wobble / 2, h.wobble / 3, 0], opacity: [0, 1, 1, 1, 0], rotate: h.rotation + 20, scale: [0.5, 1, 0.9, 1] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'easeIn', x: { duration: h.duration, ease: 'easeInOut', repeat: Infinity } }}
          style={{ position: 'absolute', left: `${h.left}%`, top: 0, fontSize: h.size, lineHeight: 1 }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  )
}

// Replace with your actual Supabase URL and anon key after setup
const SUPABASE_URL = 'https://yauxvegcfplfsriawucg.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhdXh2ZWdjZnBsZnNyaWF3dWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0ODIyMDcsImV4cCI6MjA5MzA1ODIwN30.SQuiVBk4NQiMXfe4ZIfUbwXN09GdPa_sN0t7PrET7Rc'

export default function PageThankYou({ onNext }: Props) {
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [showHearts, setShowHearts] = useState(false)

  useEffect(() => {
    setTimeout(() => setShowHearts(true), 200)
  }, [])

  const handleSend = async () => {
    if (!message.trim() || sending) return
    setSending(true)
    try {
      if (SUPABASE_URL !== 'https://yauxvegcfplfsriawucg.supabase.co') {
        await fetch(`${SUPABASE_URL}/rest/v1/replies`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ message, created_at: new Date().toISOString() }),
        })
      }
      await new Promise(r => setTimeout(r, 600))
      setSent(true)
    } catch (e) {
      console.error(e)
      setSent(true)
    }
    setSending(false)
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--pink-pale)', position: 'relative', overflow: 'hidden' }}>
      {showHearts && <FallingHearts />}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 24px 16px', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 0 }}>

          <motion.div animate={{ scale: [1, 1.18, 1, 1.1, 1] }} transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.5 }}
            style={{ fontSize: 50, marginBottom: 14 }}>🥺</motion.div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 400, fontStyle: 'italic', color: 'var(--text-dark)', textAlign: 'center', lineHeight: 1.3, marginBottom: 10 }}>
            thank you for<br />being you
          </h2>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 24, maxWidth: 230,
            background: 'rgba(255,255,255,0.7)', padding: '12px 16px', borderRadius: 14, backdropFilter: 'blur(4px)' }}>
            "you are the most important person in my world, and I never want you to forget that."
          </p>

          <div style={{ width: '100%', background: 'rgba(255,255,255,0.8)', borderRadius: 16, padding: '16px', backdropFilter: 'blur(6px)', border: '1px solid rgba(237,147,177,0.2)' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--pink-mid)', marginBottom: 8, fontWeight: 500 }}>say something back... 💌</p>

            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <textarea value={message} onChange={e => setMessage(e.target.value)}
                    placeholder="only Sid will ever read this"
                    rows={3}
                    style={{ width: '100%', background: 'white', border: '1.5px solid #f0dae4', borderRadius: 12, padding: '10px 14px', fontSize: 12, color: 'var(--text-dark)', resize: 'none', fontFamily: 'var(--font-body)', lineHeight: 1.6, outline: 'none' }} />
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleSend}
                    disabled={!message.trim() || sending}
                    style={{ marginTop: 8, width: '100%', background: message.trim() ? 'var(--pink-soft)' : '#f5f0f2', border: `1.5px solid ${message.trim() ? 'var(--pink-border)' : '#e8dde2'}`, color: message.trim() ? 'var(--pink-deep)' : '#bba8b2', padding: '10px', borderRadius: 20, fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-body)', cursor: message.trim() ? 'pointer' : 'default', transition: 'all 0.3s' }}>
                    {sending ? 'sending... 💌' : 'send it 💌'}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div key="sent" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ background: '#f0faf5', border: '1px solid #a8d5bc', borderRadius: 12, padding: '14px', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-hand)', fontSize: 17, color: '#2d6a4a' }}>Sid will see this 🤍</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        style={{ padding: '8px 22px 16px', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={onNext}
          style={{ background: 'rgba(251,234,240,0.9)', border: '1.5px solid var(--pink-border)', color: 'var(--pink-deep)', padding: '10px 32px', borderRadius: 24, fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-body)', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
          one last thing →
        </motion.button>
      </motion.div>
    </div>
  )
}
