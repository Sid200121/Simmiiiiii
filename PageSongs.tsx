import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onNext: () => void
}

const SONGS = [
  { title: 'Tajdar-E-Haram', artist: 'Atif Aslam', color: '#1a3a2a', accent: '#4CAF7D', id: '5euB7CZQXxjqe2s2Bb8KWl' },
  { title: 'Saawali Si Raat', artist: 'Pritam, Arijit Singh', color: '#1a1a3a', accent: '#7B8CF5', id: '4I5Xcdu5Hnki1aP0Uxbs4n' },
  { title: 'Kun Faya Kun', artist: 'A.R. Rahman, Javed Ali, Mohit Chauhan', color: '#2a1a3a', accent: '#C084FC', id: '1kgj3TvYyr1emn8txywNBv' },
  { title: 'O Rangrez', artist: 'Shankar-Ehsaan-Loy, Shreya Ghoshal, Javed Bashir', color: '#3a1a1a', accent: '#F08DBD', id: '03Iuqy6uN1LfXBelHpgwvX' },
  { title: 'Abhi Mujh Mein Kahin', artist: 'Ajay-Atul, Sonu Nigam', color: '#1a2a3a', accent: '#60A5FA', id: '526QLadaZbpH0TtmGVD0jB' },
  { title: 'In Dino', artist: 'Pritam, Soham', color: '#2a2a1a', accent: '#FBBF24', id: '6YycppSAeGtSvwmu8qCcr2' },
  { title: 'Aabaad Barbaad', artist: 'Pritam, Arijit Singh', color: '#3a1a2a', accent: '#F472B6', id: '3jxNbVmugKWFFc3YAVl0sD' },
  { title: 'Uff Teri Adaa', artist: 'Shankar Mahadevan', color: '#1a3a3a', accent: '#34D399', id: '6V7VbV5nG9c5oLizQnKUcg' },
  { title: 'Jogi', artist: 'Yasser Desai, Aakanksha Sharma', color: '#2a1a1a', accent: '#FB923C', id: '2tqIKAq7jGWdt7u6Gb8tRF' },
  { title: 'Dildaara', artist: 'Shafqat Amanat Ali, Shreya Ghoshal', color: '#1a2a2a', accent: '#38BDF8', id: '1RORoJPX4mglFFtg1OPl17' },
  { title: 'Gehra Hua', artist: 'Shankar Mahadevan, Sonu Nigam', color: '#3a2a1a', accent: '#A78BFA', id: '21I81OmDpGKALqjK1hg4Vo' },
  { title: 'Channa Ve', artist: 'Akhil Sachdeva', color: '#1a3a1a', accent: '#86EFAC', id: '3TOhzLRYnkkul71yRBxIoM' },
  { title: 'Be Intehaan', artist: 'Atif Aslam, Sunidhi Chauhan, Pritam', color: '#2a1a3a', accent: '#F9A8D4', id: '0NAht0EfhYoFS5g9JYQnFN' },
  { title: 'Piya O Re Piya', artist: 'Atif Aslam, Shreya Ghoshal, Sachin-Jigar', color: '#3a1a1a', accent: '#FCA5A5', id: '10cD1YdOF1OusOIlD1Kb7G' },
  { title: 'Samjhawan', artist: 'Shaarib-Toshi, Arijit Singh, Shreya Ghoshal', color: '#1a2a3a', accent: '#93C5FD', id: '24kMsMmPHzXW6SUUipdxP5' },
  { title: 'Bade Acche Lagte Hain', artist: 'Kumar Sanu, Alka Yagnik', color: '#2a3a1a', accent: '#BEF264', id: '6YycppSAeGtSvwmu8qCcr2' },
  { title: 'Hum Tere Pyaar Mein', artist: 'Shreya Ghoshal, Udit Narayan', color: '#3a1a2a', accent: '#FDA4AF', id: '4I5Xcdu5Hnki1aP0Uxbs4n' },
]

export default function PageSongs({ onNext }: Props) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--pink-pale)', overflow: 'hidden' }}>
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        style={{ padding: '20px 22px 12px', borderBottom: '1px dashed rgba(212,83,126,0.15)', flexShrink: 0 }}>
        <p style={{ fontFamily: 'var(--font-hand)', fontSize: 12, color: 'var(--pink-mid)', opacity: 0.7, marginBottom: 4 }}>songs you sent me —</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 400, fontStyle: 'italic', color: 'var(--text-dark)', lineHeight: 1.2 }}>
          your playlist,<br />my heart 🎵
        </h2>
      </motion.div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 16px' }}>
        {SONGS.map((song, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04 }} style={{ marginBottom: 8 }}>
            <div onClick={() => setActive(active === i ? null : i)} style={{
              background: 'white', borderRadius: active === i ? '14px 14px 0 0' : 14,
              border: `1.5px solid ${active === i ? song.accent : 'transparent'}`,
              borderBottom: active === i ? 'none' : undefined,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)', cursor: 'pointer', transition: 'all 0.3s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px' }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, background: song.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <motion.div animate={active === i ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 3, repeat: active === i ? Infinity : 0, ease: 'linear' }}
                    style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${song.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: song.accent }} />
                  </motion.div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: 'var(--text-dark)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{song.title}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--text-muted)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{song.artist}</p>
                </div>
                <motion.div animate={{ scale: active === i ? 1.1 : 1 }} style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: active === i ? song.accent : '#f5e8ef',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.3s',
                }}>
                  {active === i
                    ? <div style={{ display: 'flex', gap: 3 }}><div style={{ width: 3, height: 10, background: 'white', borderRadius: 2 }} /><div style={{ width: 3, height: 10, background: 'white', borderRadius: 2 }} /></div>
                    : <div style={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '8px solid var(--pink-mid)', marginLeft: 2 }} />
                  }
                </motion.div>
              </div>
            </div>
            <AnimatePresence>
              {active === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 96, opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden', border: `1.5px solid ${song.accent}`, borderTop: 'none', borderRadius: '0 0 14px 14px', background: '#121212' }}>
                  <iframe src={`https://open.spotify.com/embed/track/${song.id}?utm_source=generator&theme=0`}
                    width="100%" height="96" frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy" style={{ display: 'block' }} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
        <div style={{ height: 8 }} />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        style={{ padding: '8px 22px 14px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={onNext}
          style={{ background: 'var(--pink-soft)', border: '1.5px solid var(--pink-border)', color: 'var(--pink-deep)', padding: '10px 32px', borderRadius: 24, fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
          next →
        </motion.button>
      </motion.div>
    </div>
  )
}
