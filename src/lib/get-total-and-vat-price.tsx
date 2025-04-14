import { VAT, DELIVERY_PRICE } from "@/lib"

export const getTotalAndVatPrice = (totalAmount: number) => {
  const vatPrice= +((totalAmount * VAT) / 100).toFixed()
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE
  return {totalPrice, vatPrice}
} 