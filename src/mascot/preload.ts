// Frames must be decoded before playback starts, otherwise the flipbook shows blanks or freezes on frame 1.
const cache = new Map<string, Promise<void>>()

function loadOne(src: string): Promise<void> {
  let p = cache.get(src)
  if (!p) {
    p = new Promise<void>((resolve) => {
      const img = new Image()
      img.onload = img.onerror = () => resolve()
      img.src = src
      img.decode?.().then(resolve, resolve)
    })
    cache.set(src, p)
  }
  return p
}

export function preloadFrames(srcs: string[]): Promise<void> {
  return Promise.all(srcs.map(loadOne)).then(() => undefined)
}
