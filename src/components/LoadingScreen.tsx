import { Mascot } from '../mascot/Mascot'

/** First-load splash: once the frames are ready, the mascot walks in place in the middle of the screen. */
export function LoadingScreen({ walking, leaving }: { walking: boolean; leaving: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden bg-bg transition-opacity duration-300 ${leaving ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
      aria-hidden={leaving}
    >
      <div className="flex h-[170px] w-full items-end justify-center">
        {walking && <Mascot anim="walk" size={160} label="Loading" />}
      </div>
      <div className="mt-4 text-3xl font-extrabold text-primary">Su</div>
      <div className="mt-3 flex gap-1.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  )
}
