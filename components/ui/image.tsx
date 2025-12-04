import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const imageVariants = cva(
  "block max-w-full h-auto object-cover transition-all duration-300",
  {
    variants: {
      variant: {
        default: "rounded-cozy border border-line shadow-soft",
        retro: "rounded-cozy border-2 border-ink shadow-hard hover:shadow-hard-hover hover:-translate-y-[2px]",
        polaroid: "bg-surface p-3 pb-12 border-2 border-line shadow-md rotate-2 hover:rotate-0 hover:scale-105 origin-center hover:shadow-xl hover:z-10",
        circle: "rounded-full aspect-square border-2 border-line shadow-soft",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof imageVariants> {
      caption?: string
    }

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, variant, caption, ...props }, ref) => {
    if (variant === 'polaroid' && caption) {
        return (
            <figure className={cn(imageVariants({ variant, className }), "relative")}>
                <img
                    className="w-full h-auto rounded-sm border border-line/20"
                    ref={ref}
                    {...props}
                />
                <figcaption className="absolute bottom-3 left-0 right-0 text-center font-hand text-xl text-ink">
                    {caption}
                </figcaption>
            </figure>
        )
    }

    return (
      <img
        className={cn(imageVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Image.displayName = "Image"

export { Image, imageVariants }