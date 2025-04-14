'use client'

import React, { useId } from 'react'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

interface Props {
  onChange: (value?: string) => void
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  const id = useId()
  return (
    <AddressSuggestions
      uid={id}
      token={process.env.ADDRESS_SUGGESTIONS_TOKEN as string}
      onChange={(data) => onChange(data?.value || '')}
    />
  )
}
