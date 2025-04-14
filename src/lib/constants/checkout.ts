const VAT = 15
const DELIVERY_PRICE = 150

const getTotalAndVatPrice = (totalAmount: number) => {
  const vatPrice= +((totalAmount * VAT) / 100).toFixed()
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE
  return {totalPrice, vatPrice}
} 
export { VAT, DELIVERY_PRICE, getTotalAndVatPrice }