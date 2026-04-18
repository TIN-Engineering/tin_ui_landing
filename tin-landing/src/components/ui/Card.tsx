import { forwardRef } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import styles from './Card.module.scss'

type Elevation = 'flat' | 'raised'
type Padding = 'default' | 'compact'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: Elevation
  padding?: Padding
  children: ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    elevation = 'flat',
    padding = 'default',
    className,
    children,
    ...rest
  } = props

  const classes = [
    styles.card,
    elevation === 'raised' ? styles.raised : null,
    padding === 'compact' ? styles.compact : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div {...rest} ref={ref} className={classes}>
      {children}
    </div>
  )
})

Card.displayName = 'Card'
