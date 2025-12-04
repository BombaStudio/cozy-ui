import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-cozy font-hand text-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: 
          "bg-primary text-white border-2 border-ink shadow-hard hover:-translate-y-[2px] hover:shadow-hard-hover active:translate-y-[1px] active:shadow-none",
        secondary: 
          "bg-secondary text-white border-2 border-ink shadow-hard hover:-translate-y-[2px] hover:shadow-hard-hover active:translate-y-[1px] active:shadow-none",
        outline: 
          "bg-surface text-ink border-2 border-ink shadow-hard hover:-translate-y-[2px] hover:shadow-hard-hover active:translate-y-[1px] active:shadow-none hover:bg-paper",
        ghost: 
          "hover:bg-primary/10 hover:text-primary",
        link: 
          "text-sub hover:text-ink underline decoration-dashed underline-offset-4 decoration-2",
        soft: 
          "bg-primary/10 text-primary hover:bg-primary hover:text-white",
        softSecondary:
          "bg-secondary/10 text-secondary hover:bg-secondary hover:text-white"
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-xl px-4 text-lg",
        lg: "h-14 rounded-cozy px-8 text-2xl",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? "span" : "button"

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }