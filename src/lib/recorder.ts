import { useCallback, useEffect, useRef, useState } from 'react'

export const canRecord = typeof window !== 'undefined' && !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== 'undefined'

// Safari records mp4/aac, Chrome/Android records webm/opus.
function pickMime(): string | undefined {
  const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/aac']
  return types.find((t) => MediaRecorder.isTypeSupported?.(t))
}

export function useRecorder() {
  const [recording, setRecording] = useState(false)
  const [blob, setBlob] = useState<Blob | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [error, setError] = useState<'denied' | null>(null)
  /** Live microphone stream while recording (for the waveform). */
  const [stream, setStream] = useState<MediaStream | null>(null)
  const recorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])
  const discard = useRef(false) // set by reset(): throw the take away instead of keeping it

  useEffect(
    () => () => {
      recorder.current?.stream.getTracks().forEach((t) => t.stop())
    },
    [],
  )

  useEffect(
    () => () => {
      if (url) URL.revokeObjectURL(url)
    },
    [url],
  )

  const start = useCallback(async () => {
    setError(null)
    try {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mime = pickMime()
      const rec = new MediaRecorder(media, mime ? { mimeType: mime } : undefined)
      chunks.current = []
      discard.current = false
      rec.ondataavailable = (e) => e.data.size > 0 && chunks.current.push(e.data)
      rec.onstop = () => {
        media.getTracks().forEach((t) => t.stop())
        setStream(null)
        if (discard.current) return
        const result = new Blob(chunks.current, { type: rec.mimeType || mime })
        setBlob(result)
        setUrl(URL.createObjectURL(result))
      }
      recorder.current = rec
      rec.start()
      setBlob(null)
      setUrl(null)
      setStream(media)
      setRecording(true)
      return true
    } catch {
      setError('denied')
      return false
    }
  }, [])

  const stop = useCallback(() => {
    if (recorder.current?.state === 'recording') recorder.current.stop()
    setRecording(false)
  }, [])

  const reset = useCallback(() => {
    discard.current = true
    stop()
    setBlob(null)
    setUrl(null)
  }, [stop])

  return { recording, blob, url, error, stream, start, stop, reset }
}
