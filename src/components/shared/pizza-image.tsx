import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Props {
  className?: string
  src: string
  alt: string
  size: 20 | 30 | 40
}
export function PizzaImage({ className, src, alt, size }: Props) {
  return (
    <section
      className={cn(
        'relative flex items-center flex-1 justify-center aspect-square',
        `min-w-[500px] min-h-[500px] size-[500px]`,
        className
      )}
    >
      <Image
        className={cn(
          'relative left-2 top-2 transition-all will-change-transform z-10 duration-300',
          {
            'w-[300px] h-[300px]': size === 20,
            'w-[400px] h-[400px]': size === 30,
            'w-[500px] h-[500px]': size === 40,
          }
        )}
        src={src}
        alt={alt}
        width={(size + 10) * 10}
        height={(size + 10) * 10}
      />
      {(size === 20 || size === 30) && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
      )}
      {size === 20 && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-200 w-[370px] h-[370px]" />
      )}
    </section>
  )
}
