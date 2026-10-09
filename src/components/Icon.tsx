/** Material Symbols icon (the subset is loaded in index.html — add new names to that URL). */
export function Icon({ name, fill = false, size, className = '' }: { name: string; fill?: boolean; size?: number; className?: string }) {
  return (
    <span aria-hidden className={`icon ${fill ? 'icon-fill' : ''} ${className}`} style={size ? { fontSize: size } : undefined}>
      {name}
    </span>
  )
}
