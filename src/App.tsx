import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageSimran from './pages/PageSimran'
import PageLetter from './pages/PageLetter'
import PageSongs from './pages/PageSongs'
import PagePromises from './pages/PagePromises'
import PageThankYou from './pages/PageThankYou'
import PageReveal from './pages/PageReveal'
import BottomBar from './components/BottomBar'

const TOTAL_PAGES = 6

const pageVariants = {
  enter: { opacity: 0, x: 40, scale: 0.97 },
  center: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -40, scale: 0.97 },
}

export default function App() {
  const [page, setPage] = useState(1)

  const goNext = () => {
    if (page < TOTAL_PAGES) setPage(p => p + 1)
  }

  const isReveal = page === 6
  // Show bar on pages 2, 3, 4, 5
  const showBar = page >= 2 && page <= 5

  const renderPage = () => {
    switch (page) {
      case 1: return <PageSimran onNext={goNext} />
      case 2: return <PageLetter onNext={goNext} />
      case 3: return <PageSongs onNext={goNext} />
      case 4: return <PagePromises onNext={goNext} />
      case 5: return <PageThankYou onNext={goNext} />
      case 6: return <PageReveal />
      default: return null
    }
  }

  return (
    <div style={{
      width: '100vw', height: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: isReveal ? '#000' : 'linear-gradient(135deg, #2d0a1a 0%, #1a0a12 50%, #0a0818 100%)',
    }}>
      <div style={{
        width: '100%', maxWidth: 390, height: '100%', maxHeight: 844,
        background: isReveal ? '#080808' : 'var(--pink-pale)',
        borderRadius: 44, overflow: 'hidden', position: 'relative',
        display: 'flex', flexDirection: 'column',
        boxShadow: isReveal
          ? '0 0 80px rgba(0,0,0,0.8)'
          : '0 40px 80px rgba(139,34,82,0.25), 0 8px 32px rgba(0,0,0,0.3)',
        border: isReveal ? '2px solid #111' : '2px solid rgba(237,147,177,0.3)',
      }}>

        {/* Status bar */}
        <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
          <span style={{ fontSize: 12, color: isReveal ? '#333' : 'var(--text-muted)', fontWeight: 500 }}>9:41</span>
          {!isReveal && (
            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              {Array.from({ length: TOTAL_PAGES }, (_, i) => (
                <div key={i} style={{
                  width: i + 1 === page ? 16 : 5,
                  height: 5,
                  borderRadius: 3,
                  background: i + 1 === page ? 'var(--pink-mid)' : 'var(--text-faint)',
                  transition: 'all 0.3s ease',
                }} />
              ))}
            </div>
          )}
          <span style={{ fontSize: 12, color: isReveal ? '#333' : 'var(--text-muted)' }}>✦</span>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'absolute', inset: 0 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom bar — only pages 2 through 5 */}
        {showBar && (
          <div style={{ height: 66, position: 'relative', flexShrink: 0 }}>
            <BottomBar page={page} />
          </div>
        )}
      </div>
    </div>
  )
}
