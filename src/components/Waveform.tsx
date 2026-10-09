import { useEffect, useRef } from 'react'

/** Live microphone waveform while recording; a calm flat line otherwise. */
export function Waveform({ stream, className = '' }: { stream: MediaStream | null; className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const ctx = el.getContext('2d')
    if (!ctx) return
    const color = getComputedStyle(el).color
    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      el.width = el.clientWidth * dpr
      el.height = el.clientHeight * dpr
    }
    resize()

    const drawLine = (data?: Uint8Array) => {
      const { width, height } = el
      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = 2.5 * dpr
      ctx.strokeStyle = color
      ctx.lineCap = 'round'
      ctx.beginPath()
      const points = 96
      for (let i = 0; i <= points; i++) {
        const x = (i / points) * width
        const v = data ? (data[Math.floor((i / points) * (data.length - 1))] - 128) / 128 : Math.sin(i / 6) * 0.04
        const y = height / 2 + v * height * 0.42
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }

    if (!stream) {
      drawLine()
      return
    }

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const audio = new AudioCtx()
    const source = audio.createMediaStreamSource(stream)
    const analyser = audio.createAnalyser()
    analyser.fftSize = 1024
    source.connect(analyser)
    const data = new Uint8Array(analyser.fftSize)
    let raf = 0
    const tick = () => {
      analyser.getByteTimeDomainData(data)
      drawLine(data)
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => {
      cancelAnimationFrame(raf)
      source.disconnect()
      audio.close().catch(() => undefined)
    }
  }, [stream])

  return <canvas ref={canvas} className={`block h-full w-full text-primary-2 ${className}`} aria-hidden />
}
