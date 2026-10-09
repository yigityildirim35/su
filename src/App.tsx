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

const SPLASH_MS = 1400

function useSplash() {
  const [phase, setPhase] = useState<'show' | 'leaving' | 'gone'>('show')
  useEffect(() => {
    const leave = window.setTimeout(() => setPhase('leaving'), SPLASH_MS)
    const gone = window.setTimeout(() => setPhase('gone'), SPLASH_MS + 300)
    return () => {
      window.clearTimeout(leave)
      window.clearTimeout(gone)
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
          {splash !== 'gone' && <LoadingScreen leaving={splash === 'leaving'} />}
          {splash === 'gone' && <SpecialDayOverlay />}
        </WordsProvider>
      </SpecialDayProvider>
    </SettingsProvider>
  )
}
