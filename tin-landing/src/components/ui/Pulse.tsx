import styles from './Pulse.module.scss'

interface PulseProps {
  label?: string
  className?: string
}

export function Pulse({ label, className }: PulseProps) {
  const classes = [styles.pulse, className].filter(Boolean).join(' ')
  return (
    <span
      className={classes}
      role="status"
      aria-label={label ?? 'Sistema en vivo'}
    />
  )
}
