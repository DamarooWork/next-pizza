'use client'

import React, { useId } from 'react'
import dynamic from 'next/dynamic'

const AddressSuggestions = dynamic(
  () => import('react-dadata').then((mod) => mod.AddressSuggestions),
  { ssr: false }
)

interface Props {
  onChange: (value?: string) => void
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  const id = useId()
  return (
    <AddressSuggestions
      uid={id}
      token={
        (process.env.ADDRESS_SUGGESTIONS_TOKEN as string) ||
        'b5b8bb983ddcd08648080e0271d9dd367bb7aa65'
      }
      onChange={(data) => onChange(data?.value || '')}
    />
  )
}
