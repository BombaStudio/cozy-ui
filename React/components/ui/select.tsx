import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
    error?: boolean
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          className={cn(
            "flex h-12 w-full appearance-none rounded-xl border-2 border-line bg-paper px-4 py-3 pr-10 text-base font-body text-ink shadow-sm ring-offset-background focus-visible:outline-none focus-visible:border-primary focus-visible:bg-white focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 cursor-pointer",
            error && "border-destructive focus-visible:border-destructive",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sub pointer-events-none" />
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }