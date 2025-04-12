import { WhiteBlock, CheckoutItemDetails } from '@/components/shared'
import { Button, Skeleton } from '@/components/ui'
import { cn } from '@/lib/utils'
import { ArrowRight, Package, Percent, Truck } from 'lucide-react'

interface Props {
  className?: string
  loading: boolean
  totalAmount: number
}
const VAT = 15
const DELIVERY_PRICE = 250
export function CheckoutSidebar({
  className,
  loading,
  totalAmount,
}: Props) {
  const vatPrice = (totalAmount * VAT) / 100
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE
  return (
    <WhiteBlock className={cn('p-6 sticky top-6 w-[450px] h-fit', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">
            {totalPrice} ₽
          </span>
        )}
      </div>
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Стоимость корзины:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${totalAmount} ₽`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-400" />
            Налоги:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${vatPrice} ₽`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Доставка:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${DELIVERY_PRICE} ₽`
          )
        }
      />
      <Button
        loading={loading}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  )
}
