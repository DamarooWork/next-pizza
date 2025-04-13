'use client'
import { ClearButton, ErrorText, RequiredSymbol } from '@/components/shared'
import { Input } from '@/components/ui'
import React from 'react'
import { useFormContext } from 'react-hook-form'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  className?: string
  ref?: React.Ref<HTMLInputElement>
}
export function FormInput({
  className,
  name,
  label,
  ref,
  ...props
}: Props) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()
  const value = watch(name)
  const errorText = errors[name]?.message as string

  return (
    <section className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {props.required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input className="h-12 text-md pr-10" {...register(name)} {...props} />
        {value && <ClearButton onClick={() => setValue(name, '')} />}
      </div>
      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </section>
  )
}
