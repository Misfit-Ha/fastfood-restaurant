import Link from 'next/link'
import clsx from 'clsx'

const baseStyles = {
  solid:
    'group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
  outline:
    'group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none',
  thin: 'group inline-flex items-center justify-center rounded-full px-4  text-sm  focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 backdrop-blur',
}

const variantStyles = {
  disabled: {
    base: 'bg-slate-300 text-slate-500 cursor-not-allowed',
  },
  solid: {
    slate:
      'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900',
    orange:
      'bg-arkanOrange/90 text-white shadow-md shadow-orange-600/40 hover:text-slate-100 hover:bg-orange-500 active:bg-orange-800 active:text-orange-100 focus-visible:outline-orange-600',
    white:
      'bg-white text-slate-900 hover:bg-orange-50 active:bg-orange-200 active:text-slate-700 focus-visible:outline-white dark:bg-slate-900 dark:text-slate-200',
  },
  thin: {
    orange:
      'bg-arkanOrange/80 text-white hover:text-slate-100 hover:bg-orange-500 active:bg-orange-800 active:text-orange-100 focus-visible:outline-orange-600',
  },
  outline: {
    slate:
      'ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-700 focus-visible:outline-orange-600 focus-visible:ring-slate-300',
    white:
      'ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white',
    glass:
      'ring-slate-200 text-slate-700 bg-slate-100/10 transition ease-in-out delay-150 hover:bg-slate-100/30 hover:ring-slate-300 active:bg-slate-100 active:text-slate-700 focus-visible:outline-orange-600 focus-visible:ring-slate-300',
  },
}

export function Button({
  variant = 'solid',
  color = 'slate',
  className,
  disabled = false,
  ...props
}) {
  return (
    <button
      className={clsx(
        baseStyles[variant],
        variantStyles[variant][color],
        disabled && variantStyles.disabled.base,
        className
      )}
      disabled={disabled}
      {...props}
    />
  )
}

export function ButtonLink({
  variant = 'solid',
  color = 'slate',
  href,
  className,
  ...props
}) {
  return (
    <Link
      href={href}
      className={clsx(
        baseStyles[variant],
        variantStyles[variant][color],
        className
      )}
      {...props}
    ></Link>
  )
}
