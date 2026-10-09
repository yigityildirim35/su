import { useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LoadingScreen } from './components/LoadingScreen'
import { SpecialDayOverlay } from './components/SpecialDayOverlay'
import { SpecialDayProvider } from './components/SpecialDayContext'
import { LessonDetail } from './pages/LessonDetail'
import { Lessons } from './pages/Lessons'
import { More } from './pages/More'
import { Practice } from './pages/Practice'
import { Street } from './pages/Street'
import { Study } from './pages/Study'
import { Tactics } from './pages/Tactics'
import { Today } from './pages/Today'
import { Video } from './pages/Video'
import { WordDetail } from './pages/WordDetail'
import { Words } from './pages/Words'
import { SettingsProvider } from './store/settings'
import { WordsProvider } from './store/words'
import { preloadFrames } from './mascot/preload'
import { resolveFrames } from './mascot/registry'

const WALK_MS = 1800 // two loops of the walk cycle
const MAX_WAIT_MS = 2500 // don't hold the app hostage on a slow connection

/** Splash: wait until the walk frames are decoded, let the mascot walk in place for a moment, then fade out. */
function useSplash() {
  const [phase, setPhase] = useState<'loading' | 'walking' | 'leaving' | 'gone'>('loading')
  useEffect(() => {
    let alive = true
    const timers: number[] = []
    const startWalk = () => {
      if (!alive) return
      alive = false
      setPhase('walking')
      timers.push(window.setTimeout(() => setPhase('leaving'), WALK_MS))
      timers.push(window.setTimeout(() => setPhase('gone'), WALK_MS + 300))
    }
    preloadFrames(resolveFrames('walk').frames).then(startWalk)
    timers.push(window.setTimeout(startWalk, MAX_WAIT_MS))
    return () => {
      alive = false
      timers.forEach(window.clearTimeout)
    }
  }, [])
  return phase
}

export default function App() {
  const splash = useSplash()
  return (
    <SettingsProvider>
      <SpecialDayProvider>
        <WordsProvider>
          {/* HashRouter: GitHub Pages has no server-side routing. */}
          <HashRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Today />} />
                <Route path="words" element={<Words />} />
                <Route path="words/:id" element={<WordDetail />} />
                <Route path="study" element={<Study />} />
                <Route path="lessons" element={<Lessons />} />
                <Route path="lessons/:id" element={<LessonDetail />} />
                <Route path="street" element={<Street />} />
                <Route path="practice" element={<Practice />} />
                <Route path="tactics" element={<Tactics />} />
                <Route path="video" element={<Video />} />
                <Route path="more" element={<More />} />
                <Route path="*" element={<Today />} />
              </Route>
            </Routes>
          </HashRouter>
          {splash !== 'gone' && <LoadingScreen walking={splash !== 'loading'} leaving={splash === 'leaving'} />}
          {splash === 'gone' && <SpecialDayOverlay />}
        </WordsProvider>
      </SpecialDayProvider>
    </SettingsProvider>
  )
}
