import * as React from "react"
import { cn } from "@/lib/utils"


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  start?: React.ReactElement
  end?: React.ReactElement
  containerClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerClassName, type, start, end, ...props }, ref) => {
    const Start = start
    const End = end
    return (
      <div className={cn("w-full relative h-10", containerClassName)}>
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6">
          {Start}
        </div>
        <input
          type={type}
          className={cn(
            "flex h-full w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            Start ? "pl-12" : "pl-3",
            End ? "pr-12" : "pr-3",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6">
          {End}
        </div>
      </div>

    )
  }
)
Input.displayName = "Input"

export { Input }
