import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDeclension = (count: number, word: {
  one: string
  few: string
  many: string
}): string => {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return word.many
  }

  if (lastDigit === 1) {
    return word.one
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return word.few
  }

  return word.many
}