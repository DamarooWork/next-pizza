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
              <p className="font-medium mb-2">
                {'Адрес '}
                <span className="text-red-500">*</span>
              </p>
              <AddressInput {...field} />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} className="mt-2" />
              )}
            </div>
          )}
        />

        <FormTextarea
          rows={5}
          label="Комментарий"
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
        />
      </div>
    </WhiteBlock>
  )
}
