import { z } from 'zod'

export const CheckoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Имя должно содержать не менее 2 символов' }),
  lastName: z
    .string()
    .min(2, { message: 'Фамилия должна содержать не менее 2 символов' }),
  email: z.string().email({ message: 'Неверный формат электронной почты' }),
  phone: z.string().min(11, { message: 'Неверный формат телефона' }),
  address: z.string().min(5, { message: 'Введите корректный адрес' }),
  comment: z.string().optional(),
})

export type CheckoutFormValues = z.infer<typeof CheckoutFormSchema>
