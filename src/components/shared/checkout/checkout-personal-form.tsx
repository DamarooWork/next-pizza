'use client'

import { WhiteBlock, FormInput } from '@/components/shared'
interface Props {
  className?: string
}
export function CheckoutPersonalForm({ className }: Props) {
  return (
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput
          name="firstName"
          label="Имя"
          className="text-base"
          placeholder="Введите имя получателя"
          requiredInput
        />
        <FormInput
          name="lastName"
          className="text-base"
          label="Фамилия"
          placeholder="Введите фамилию получателя"
          requiredInput
        />
        <FormInput
          name="email"
          label="Email"
          className="text-base"
          placeholder="Для отправки данных заказа"
          requiredInput
        />
        <FormInput
          name="phone"
          className="text-base"
          label="Телефон"
          placeholder="Введите номер телефона"
          requiredInput
        />
      </div>
    </WhiteBlock>
  )
}
