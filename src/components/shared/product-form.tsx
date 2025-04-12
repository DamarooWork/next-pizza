'use client'
import { useCartStore } from '@/store/cart'
import { Prisma } from '@prisma/client'
import { toast } from 'react-hot-toast'
import { ChoosePizzaForm } from './choose-pizza-form'
import { ChooseProductForm } from './choose-product-form'
const ProductSelect = {
  id: true,
  name: true,
  imageUrl: true,
  items: true,
  description: true,
  ingredients: true,
} satisfies Prisma.ProductSelect
interface Props {
  product: Prisma.ProductGetPayload<{
    select: typeof ProductSelect
  }>
  onSubmit?: () => void
}
export  function ProductForm({  product, onSubmit }: Props) {
  const { addCartItem, loading } = useCartStore()
  const firstItem = product.items[0]
  const isPizzaForm = Boolean(firstItem.pizzaType)
  const onAddProduct = async (
    productItemId?: number,
    ingredients?: number[]
  ) => {
    try {
      const itemId = productItemId ?? firstItem.id
      await addCartItem({
        productItemId: itemId,
        ingredients,
      })
      toast.success(
        `${itemId ? 'Пицца добавлена' : 'Товар добавлен'}  в корзину`
      )
      onSubmit?.()
    } catch (error) {
      console.error(error)
      toast.error('Ошибка при добавлении в корзину')
    }
  }
  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onAddProduct}
        description={product.description}
        loading={loading}
      />
    )
  }
  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      price={firstItem.price}
      onSubmit={onAddProduct}
      description={product.description}
      loading={loading}
    />
  )
}
