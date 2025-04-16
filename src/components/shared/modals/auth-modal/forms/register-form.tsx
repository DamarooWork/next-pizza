'use client'
import { FormProvider, useForm } from 'react-hook-form'
import { formRegisterSchema, TFormRegisterSchema } from './schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { FormInput, Title } from '@/components/shared'

import { Button } from '@/components/ui'
import { registerUser } from '@/actions'
interface Props {
  onClose: () => void
  className?: string
}
export function RegisterForm({ className, onClose }: Props) {
  const form = useForm<TFormRegisterSchema>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(formRegisterSchema),
  })
  const onSubmit = async (data: TFormRegisterSchema) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      })

      toast.success('Регистрация успешна. Подтвердите свою почту!', {
        icon: '🎉',
      })

      onClose()
    } catch (error) {
      console.error('[RegisterForm] Server error', error)
      toast.error(
        'Не удалось зарегистрироваться. Пожалуйста, попробуйте еще раз.',
        {
          icon: '😢',
        }
      )
    }
  }
  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <Title text="Создание аккаунта" size="lg" className="font-bold" />
          <p className="text-gray-400">
            Введите свои данные для создания аккаунта
          </p>
        </div>

        <FormInput name="fullName" label="Имя и фамилия" requiredInput />
        <FormInput name="email" label="E-Mail" requiredInput />
        <FormInput name="password" label="Пароль" type="password" requiredInput />
        <FormInput
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          requiredInput
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  )
}
