import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn('mx-auto max-w-[1536px] px-4 2xl:px-10', className)}>
      {children}
    </div>
  )
}
