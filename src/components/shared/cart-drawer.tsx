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
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { CartDrawerItem } from './cart-drawer-item'
import { getCartItemDetails } from '@/lib/get-cart-item-details'
interface Props {
  className?: string
  children: React.ReactNode
}
export function CartDrawer({ children }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">3 товара</span>
          </SheetTitle>
        </SheetHeader>

        {/* Cart items */}
        <div className="mt-5 overflow-auto flex-1 flex flex-col gap-2">
          <CartDrawerItem
            id={1}
            imageUrl={
              'https://media.dodostatic.net/image/r:584x584/11EE7D61304FAF5A98A6958F2BB2D260.webp'
            }
            details={getCartItemDetails(
              [
                { name: 'Сыр', price: 100 },
                { name: 'Сыр', price: 100 },
              ],
              1,
              30
            )}
            name={'Маргарита'}
            price={550}
            quantity={1}
          />
          <CartDrawerItem
            id={1}
            imageUrl={
              'https://media.dodostatic.net/image/r:584x584/11EE7D61304FAF5A98A6958F2BB2D260.webp'
            }
            details={getCartItemDetails(
              [
                { name: 'Сыр', price: 100 },
                { name: 'Сыр', price: 100 },
              ],
              1,
              30
            )}
            name={'Маргарита'}
            price={550}
            quantity={1}
          />
          <CartDrawerItem
            id={1}
            imageUrl={
              'https://media.dodostatic.net/image/r:584x584/11EE7D61304FAF5A98A6958F2BB2D260.webp'
            }
            details={getCartItemDetails(
              [
                { name: 'Сыр', price: 100 },
                { name: 'Сыр', price: 100 },
              ],
              1,
              30
            )}
            name={'Маргарита'}
            price={550}
            quantity={1}
          />
          <CartDrawerItem
            id={1}
            imageUrl={
              'https://media.dodostatic.net/image/r:584x584/11EE7D61304FAF5A98A6958F2BB2D260.webp'
            }
            details={getCartItemDetails(
              [
                { name: 'Сыр', price: 100 },
                { name: 'Сыр', price: 100 },
              ],
              1,
              30
            )}
            name={'Маргарита'}
            price={550}
            quantity={1}
          />
          <CartDrawerItem
            id={1}
            imageUrl={
              'https://media.dodostatic.net/image/r:584x584/11EE7D61304FAF5A98A6958F2BB2D260.webp'
            }
            details={getCartItemDetails(
              [
                { name: 'Сыр', price: 100 },
                { name: 'Сыр', price: 100 },
              ],
              1,
              30
            )}
            name={'Маргарита'}
            price={550}
            quantity={1}
          />
          <CartDrawerItem
            id={1}
            imageUrl={
              'https://media.dodostatic.net/image/r:584x584/11EE7D61304FAF5A98A6958F2BB2D260.webp'
            }
            details={getCartItemDetails(
              [
                { name: 'Сыр', price: 100 },
                { name: 'Сыр', price: 100 },
              ],
              1,
              30
            )}
            name={'Маргарита'}
            price={550}
            quantity={1}
          />
        </div>

        <SheetFooter className="bg-white p-8 ">
          <div className="flex mb-4">
            <span className="flex flex-1 text-lg text-neutral-500">
              Итого
              <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
            </span>

            <span className="font-bold text-lg">550 ₽</span>
          </div>

          <Link href="/checkout">
            <Button
              // onClick={() => setRedirecting(true)}
              // loading={redirecting}
              type="submit"
              className="w-full h-12 text-base"
            >
              Оформить заказ
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
