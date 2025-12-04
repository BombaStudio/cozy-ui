import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "../../lib/utils"

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <div className="relative flex items-center">
      <input
        type="checkbox"
        className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-sub checked:border-primary checked:bg-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
        ref={ref}
        {...props}
      />
      <Check className="pointer-events-none absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
    </div>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }