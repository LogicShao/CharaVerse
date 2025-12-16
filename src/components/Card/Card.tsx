/**
 * Card 组件
 * 支持多种样式和交互状态的卡片容器组件
 */

import type { FC } from 'react'
import styles from './Card.module.css'
import type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
} from './Card.types'

/**
 * Card 主组件
 */
export const Card: FC<CardProps> = ({
  variant = 'default',
  hoverable = false,
  clickable = false,
  children,
  className = '',
  onClick,
  ...rest
}) => {
  const cardClasses = [
    styles.card,
    styles[variant],
    hoverable && styles.hoverable,
    clickable && styles.clickable,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cardClasses} onClick={onClick} {...rest}>
      {children}
    </div>
  )
}

/**
 * CardHeader 组件
 */
export const CardHeader: FC<CardHeaderProps> = ({
  title,
  subtitle,
  extra,
  children,
  className = '',
  ...rest
}) => {
  const headerClasses = [styles.header, className].filter(Boolean).join(' ')

  return (
    <div className={headerClasses} {...rest}>
      <div className={styles.headerContent}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children}
      </div>
      {extra && <div className={styles.extra}>{extra}</div>}
    </div>
  )
}

/**
 * CardBody 组件
 */
export const CardBody: FC<CardBodyProps> = ({
  children,
  className = '',
  ...rest
}) => {
  const bodyClasses = [styles.body, className].filter(Boolean).join(' ')

  return (
    <div className={bodyClasses} {...rest}>
      {children}
    </div>
  )
}

/**
 * CardFooter 组件
 */
export const CardFooter: FC<CardFooterProps> = ({
  children,
  className = '',
  ...rest
}) => {
  const footerClasses = [styles.footer, className].filter(Boolean).join(' ')

  return (
    <div className={footerClasses} {...rest}>
      {children}
    </div>
  )
}

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardBody.displayName = 'CardBody'
CardFooter.displayName = 'CardFooter'
