import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div className={cn('mx-auto max-w-[1280px] px-4 lg:px-10', className)}>
      {children}
    </div>
  )
}
