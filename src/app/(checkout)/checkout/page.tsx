'use client'
import {
  CheckoutItem,
  CheckoutItemDetails,
  CheckoutSidebar,
  Title,
  WhiteBlock,
} from '@/components/shared'
import { Button, Skeleton, Textarea } from '@/components/ui'
import { Input } from '@/components/ui/input'
import { getCartItemDetails } from '@/lib/get-cart-item-details'
import { PizzaSize } from '@/lib/constants'
import { PizzaType } from '@/lib/constants'
import { ArrowRight, Package, Percent, Truck } from 'lucide-react'
import { useCart } from '@/hooks'

export default function CheckoutPage() {
  const { items, totalAmount, loading, updateItemQuantity, removeCartItem } =
    useCart()

  return (
    <section>
      <Title
        text="Оформление заказа"
        size="xl"
        className="font-extrabold mb-8"
      />
      <div className="flex gap-10">
        {/* Левая часть */}
        <div className="flex flex-col gap-8 flex-1 mb-20">
          <WhiteBlock title="1. Корзина">
            <div className="flex flex-col gap-5">
              {items.map((item) => (
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
              ))}
              <span className="text-xl">Итого:</span>
              {loading ? (
                <Skeleton className="h-11 w-48" />
              ) : (
                <span className="h-11 text-[34px] font-extrabold">
                  {totalAmount} ₽
                </span>
              )}
            </div>
          </WhiteBlock>
          <WhiteBlock title="2. Персональные данные">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="Имя" />
              <Input
                name="lastName"
                className="text-base"
                placeholder="Фамилия"
              />
              <Input name="email" className="text-base" placeholder="Email" />
              <Input name="phone" className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <Input
                name="firstName"
                className="text-base"
                placeholder="Адрес доставки"
              />
              <Textarea
                rows={5}
                name="lastName"
                className="text-base"
                placeholder="Комментарий к заказу"
              />
            </div>
          </WhiteBlock>
        </div>
        {/* Правая часть */}
        <CheckoutSidebar loading={loading} totalAmount={totalAmount} />
      </div>
    </section>
  )
}
