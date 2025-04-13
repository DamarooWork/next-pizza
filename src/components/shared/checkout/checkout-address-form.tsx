'use client'
import {
  AddressInput,
  ErrorText,
  FormTextarea,
  WhiteBlock,
} from '@/components/shared'
import { Controller, useFormContext } from 'react-hook-form'

interface Props {
  className?: string
}
export function CheckoutAddressForm({ className }: Props) {
  const { control } = useFormContext()
  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <div className="relative">
              <AddressInput {...field} />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} className="mt-2" />
              )}
            </div>
          )}
        />

        <FormTextarea
          rows={5}
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
        />
      </div>
    </WhiteBlock>
  )
}
