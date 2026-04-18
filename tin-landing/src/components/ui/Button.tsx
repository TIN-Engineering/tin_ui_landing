import { forwardRef } from 'react'
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  Ref,
} from 'react'
import styles from './Button.module.scss'

type Variant = 'primary' | 'ghost'
type Size = 'default' | 'compact'

type CommonProps = {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  children: ReactNode
  className?: string
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps | 'type'> & {
    as?: 'button'
    type?: 'button' | 'submit' | 'reset'
  }

type ButtonAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    as: 'a'
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor

const COMMON_KEYS = [
  'variant',
  'size',
  'fullWidth',
  'children',
  'className',
  'as',
] as const

function splitProps<T extends Record<string, unknown>>(
  props: T,
): Record<string, unknown> {
  const rest: Record<string, unknown> = {}
  for (const key of Object.keys(props)) {
    if ((COMMON_KEYS as readonly string[]).includes(key)) continue
    rest[key] = props[key]
  }
  return rest
}

function composeClassName(
  variant: Variant,
  size: Size,
  fullWidth: boolean,
  extra?: string,
): string {
  const parts = [styles.button, styles[variant]]
  if (size === 'compact') parts.push(styles.sizeCompact)
  if (fullWidth) parts.push(styles.fullWidth)
  if (extra) parts.push(extra)
  return parts.filter(Boolean).join(' ')
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const variant = props.variant ?? 'primary'
    const size = props.size ?? 'default'
    const fullWidth = props.fullWidth ?? false
    const classes = composeClassName(variant, size, fullWidth, props.className)
    const rest = splitProps(props as unknown as Record<string, unknown>)

    if (props.as === 'a') {
      return (
        <a
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
          ref={ref as Ref<HTMLAnchorElement>}
          className={classes}
        >
          {props.children}
        </a>
      )
    }

    const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>
    return (
      <button
        {...buttonRest}
        ref={ref as Ref<HTMLButtonElement>}
        type={buttonRest.type ?? 'button'}
        className={classes}
      >
        {props.children}
      </button>
    )
  },
)

Button.displayName = 'Button'
