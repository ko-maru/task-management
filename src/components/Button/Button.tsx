import type { ButtonHTMLAttributes, ReactNode } from "react"

/**
 * ボタンコンポーネントのプロパティ
 */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

/**
 * ボタンコンポーネント
 */
function Button({ children, ...rest }: ButtonProps) {
  return (
    <button type="button" {...rest}>
      {children}
    </button>
  )
}

export default Button
