import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Props {
  className?: string
  src: string
  alt: string
  size: 20 | 30 | 40
}
export function ProductImage({ className, src, alt, size }: Props) {
  return (
    <section className={cn('relative', className)}>
      <Image
        className={cn(
          'relative left-2 top-2 transition-all z-10 duration-300',
          {
            'size-[300px]': size === 20,
            'size-[400px]': size === 30,
            'size-[500px]': size === 40,
          }
        )}
        src={src}
        alt={alt}
        width={(size + 10) * 10}
        height={(size + 10) * 10}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
    </section>
  )
}
