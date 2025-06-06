'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Textarea } from '@/components/ui'
import { ClearButton, ErrorText } from '@/components/shared'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  name: string
  label?: string
  requiredTextarea?: boolean
  required?: boolean
}

export const FormTextarea: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  requiredTextarea = false,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  const value = watch(name)
  const errorText = errors[name]?.message as string

  return (
    <div className={className}>
      <p className="font-medium mb-2">
        {label}{' '}
        {(required || requiredTextarea) && (
          <span className="text-red-500">*</span>
        )}
      </p>

      <div className="relative">
        <Textarea className="h-12 text-md" {...register(name)} {...props} />

        {value && <ClearButton onClick={() => setValue(name, '')} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  )
}
