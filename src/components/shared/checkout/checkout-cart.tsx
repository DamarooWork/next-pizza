'use client'

import { EmptyCartPlaceholder, WhiteBlock } from '@/components/shared'
import { CheckoutItem } from '@/components/shared'
import { getCartItemDetails } from '@/lib/get-cart-item-details'
import { Skeleton } from '@/components/ui'
import { PizzaSize, PizzaType } from '@/lib/constants'
import { CartStateItem } from '@/lib/get-cart-details'
import { cn } from '@/lib/utils'

interface Props {
  items: CartStateItem[]
  totalAmount: number
  loading: boolean
  updateItemQuantity: (id: number, quantity: number) => void
  removeCartItem: (id: number) => void
}
export function CheckoutCart({
  items,
  totalAmount,
  loading,
  updateItemQuantity,
  removeCartItem,
}: Props) {
  return (
    <WhiteBlock title="1. Корзина">
      <div
        className={cn(
          'flex flex-col gap-5',
          items.length === 0 ? 'items-center gap-2' : ''
        )}
      >
        {loading ? (
          <Skeleton className="h-15 w-full" />
        ) : !items || items.length === 0 ? (
          <EmptyCartPlaceholder />
        ) : (
          items.map((item) => (
            <CheckoutItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              details={getCartItemDetails(
                item.ingredients,
                item.pizzaSize as PizzaSize,
                item.pizzaType as PizzaType
              )}
              disabled={item.disabled}
              onClickCountButton={(type) =>
                updateItemQuantity(
                  item.id,
                  type === 'plus' ? item.quantity + 1 : item.quantity - 1
                )
              }
              onClickRemove={() => removeCartItem(item.id)}
            />
          ))
        )}
        {/* <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">
            {totalAmount} ₽
          </span>
        )} */}
      </div>
    </WhiteBlock>
  )
}
