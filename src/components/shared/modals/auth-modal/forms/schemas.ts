import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(4, { message: 'Введите корректный пароль' })

export const formLoginSchema = z.object({
  email: z.string().email({ message: 'Введите корректную почту' }),
  password: passwordSchema,
})

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      confirmPassword: passwordSchema,
      fullname: z.string().min(2, { message: 'Введите имя и фамилию' }),
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

  export type TFormLoginSchema = z.infer<typeof formLoginSchema>
  export type TFormRegisterSchema = z.infer<typeof formRegisterSchema>