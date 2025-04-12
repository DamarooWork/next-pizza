'use client'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '../ui'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { CartDrawerItem } from './cart-drawer-item'
import { getCartItemDetails } from '@/lib/get-cart-item-details'
import { useCartStore } from '@/store'
import { useEffect, useState } from 'react'
import { PizzaSize, PizzaType } from '@/lib/constants'
import { getDeclension } from '@/lib/utils'
import Image from 'next/image'
import { Title } from './title'
import { DialogTitle } from '@radix-ui/react-dialog'

interface Props {
  className?: string
  children: React.ReactNode
}
export function CartDrawer({ children }: Props) {
  const {
    totalAmount,
    updateItemQuantity,
    items,
    removeCartItem,
    fetchCartItems,
    loading,
  } = useCartStore()
  const [redirecting, setRedirecting] = useState(false)
  useEffect(() => {
    fetchCartItems()
  }, [fetchCartItems])

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        {totalAmount > 0 ? (
          <>
            {' '}
            <SheetHeader>
              <SheetTitle>
                В корзине{' '}
                <span className="font-bold">
                  {items.length}{' '}
                  {getDeclension(items.length, {
                    one: 'товар',
                    few: 'товара',
                    many: 'товаров',
                  })}
                </span>
              </SheetTitle>
            </SheetHeader>
            {/* Cart items */}
            <div className="mt-5 overflow-auto flex-1 flex flex-col gap-2">
              {items.map((item) => (
                <CartDrawerItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  details={
                    item.pizzaSize && item.pizzaType
                      ? getCartItemDetails(
                          item.ingredients,
                          item.pizzaSize as PizzaSize,
                          item.pizzaType as PizzaType
                        )
                      : ''
                  }
                  disabled={item.disabled}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  onClickCountButton={(type) =>
                    updateItemQuantity(
                      item.id,
                      type === 'plus' ? item.quantity + 1 : item.quantity - 1
                    )
                  }
                  onClickRemove={() => removeCartItem(item.id)}
                />
              ))}
            </div>
            <SheetFooter className="bg-white p-8 ">
              <div className="flex mb-4">
                <span className="flex flex-1 text-lg text-neutral-500">
                  Итого
                  <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                </span>

                <span className="font-bold text-lg">{totalAmount} ₽</span>
              </div>

              <Link href="/checkout">
                <Button
                  onClick={() => setRedirecting(true)}
                  loading={redirecting}
                  type="submit"
                  className="w-full h-12 text-base"
                >
                  Оформить заказ
                  <ArrowRight className="w-5 ml-2" />
                </Button>
              </Link>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col justify-between items-center my-auto">
            <DialogTitle className="hidden">Корзина пустая</DialogTitle>
            <Image
              src="/assets/images/empty-box.png"
              alt="Корзина"
              width={150}
              height={150}
            />
            <Title
              size="md"
              text="Корзина пустая"
              className="text-center font-bold my-2"
            />
            <p className="text-center text-neutral-500 mb-5 px-4">
              Добавьте хотя бы одну пиццу, чтобы совершить заказ
            </p>

            <SheetClose>
              <Button className="w-56 h-12 text-base" size="lg">
                <ArrowLeft className="w-5 mr-2" />
                Вернуться назад
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
