interface FilterChipProps {
  label: string
  isActive: boolean
  onClick: () => void
  className?: string
}

export function FilterChip({
  label,
  isActive,
  onClick,
  className = '',
}: FilterChipProps) {
  return (
    <button
      aria-pressed={isActive}
      className={`filter-chip ${className} ${isActive ? 'filter-chip-active' : ''}`.trim()}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  )
}

interface MetaBlockProps {
  label: string
  value: string
}

export function MetaBlock({ label, value }: MetaBlockProps) {
  return (
    <article className="meta-block">
      <p className="mini-label">{label}</p>
      <strong>{value}</strong>
    </article>
  )
}

interface StatCardProps {
  value: string
  label: string
  detail: string
}

export function StatCard({ value, label, detail }: StatCardProps) {
  return (
    <article className="stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
      <p>{detail}</p>
    </article>
  )
}
