import { useEffect, useRef, useState } from 'react'

export const canRecord = typeof window !== 'undefined' && !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== 'undefined'

// Safari records mp4/aac, Chrome/Android records webm/opus.
function pickMime(): string | undefined {
  const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/aac']
  return types.find((t) => MediaRecorder.isTypeSupported?.(t))
}

export function useRecorder() {
  const [recording, setRecording] = useState(false)
  const [url, setUrl] = useState<string | null>(null)
  const [error, setError] = useState<'denied' | null>(null)
  const recorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])

  useEffect(() => () => {
    recorder.current?.stream.getTracks().forEach((t) => t.stop())
  }, [])

  useEffect(() => () => {
    if (url) URL.revokeObjectURL(url)
  }, [url])

  const start = async () => {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mime = pickMime()
      const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined)
      chunks.current = []
      rec.ondataavailable = (e) => e.data.size > 0 && chunks.current.push(e.data)
      rec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop())
        setUrl(URL.createObjectURL(new Blob(chunks.current, { type: rec.mimeType || mime })))
      }
      recorder.current = rec
      rec.start()
      setUrl(null)
      setRecording(true)
    } catch {
      setError('denied')
    }
  }

  const stop = () => {
    if (recorder.current?.state === 'recording') recorder.current.stop()
    setRecording(false)
  }

  return { recording, url, error, start, stop }
}
