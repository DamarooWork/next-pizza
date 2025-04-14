'use client'
import { FormProvider, useForm } from 'react-hook-form'
import { formLoginSchema, TFormLoginSchema } from './schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput, Title } from '@/components/shared'
import { Button } from '@/components/ui'

import Image from 'next/image'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'

interface Props {
  onClose: VoidFunction
}
export function LoginForm({ onClose }: Props) {
  const form = useForm<TFormLoginSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formLoginSchema),
  })
  const onSubmit = async (data: TFormLoginSchema) => {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false
      })

      if (!resp?.ok){
        throw new Error('Ошибка авторизации')
      }

      toast.success('Вы успешно вошли в аккаунт', {
        icon: '🎉',
      })

      onClose()
    } catch (error) {
      console.error('[LoginForm] Server error', error)
      toast.error('Не удалось войти. Пожалуйста, попробуйте еще раз.', {
        icon: '😢',
      })
    }
  }
  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">
              Введите свою почту, чтобы войти в свой аккаунт
            </p>
          </div>
          <Image
            className="size-15 min-h-15 min-w-15 "
            src="/assets/images/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Войти
        </Button>
      </form>
    </FormProvider>
  )
}
