'use client'

import React, { useId } from 'react'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

interface Props {
  onChange: (value?: string) => void
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  const id = useId();
  return (
    <AddressSuggestions
      uid={id}
      token="033eb029d1d7af01f527f8de42f1b677944e42da"
      onChange={(data) => onChange(data?.value || '')}
    />
  )
}
