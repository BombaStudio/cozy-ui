import * as React from "react"
import { cn } from "../../lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean
  }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-xl border-2 border-line bg-paper px-4 py-3 text-base font-body text-ink shadow-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:border-primary focus-visible:bg-white focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none",
          error && "border-destructive focus-visible:border-destructive",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }