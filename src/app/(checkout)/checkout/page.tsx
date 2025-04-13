'use client'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutFormSchema,
  CheckoutFormValues,
  CheckoutPersonalForm,
  CheckoutSidebar,
  Title,
} from '@/components/shared'
import { useCart } from '@/hooks'
import toast from 'react-hot-toast'
import { createOrder } from '@/actions'
import { useState } from 'react'

export default function CheckoutPage() {
  const { items, totalAmount, loading, updateItemQuantity, removeCartItem } =
    useCart()
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      comment: '',
    },
  })
  const validatePhone = (phone: string): boolean => {
    // Сначала удаляем все пробелы, скобки и тире из номера
    const cleanedPhone = phone.replace(/[\s\-()]/g, '')

    // Проверяем, что номер начинается с +7 или 8 и содержит 11 цифр в общей сложности
    const phoneRegex = /^(\+7|7|8)\d{10}$/

    return phoneRegex.test(cleanedPhone)
  }
  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    try {
      setSubmitting(true)
      if (items.length === 0) {
        toast.error('В корзине нет товаров для оформления заказа')
        return
      }
      if (!validatePhone(data.phone)) {
        toast.error('Пожалуйста, введите корректный номер телефона')
        return
      }
      const url = await createOrder(data)
      toast.success('Заказ оформлен успешно')
      if (url) {
        location.href = url
      }
    } catch (error) {
      console.error(error)
      toast.error('Не удалось оформить заказ. Пожалуйста, попробуйте еще раз.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section>
      <Title
        text="Оформление заказа"
        size="xl"
        className="font-extrabold mb-8"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Левая часть */}
            <div className="flex flex-col gap-8 flex-1 mb-20">
              <CheckoutCart
                items={items}
                totalAmount={totalAmount}
                loading={loading}
                updateItemQuantity={updateItemQuantity}
                removeCartItem={removeCartItem}
              />
              <CheckoutPersonalForm
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />
              <CheckoutAddressForm
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />
            </div>
            {/* Правая часть */}
            <CheckoutSidebar
              loading={loading || submitting}
              totalAmount={totalAmount}
            />
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
