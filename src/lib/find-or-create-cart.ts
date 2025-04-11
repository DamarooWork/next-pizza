import { prisma } from "../../prisma"

export default async function FindOrCreateCart(token: string){
  let cart = await prisma.cart.findFirst({
    where: {
      token,
    },
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        token,
      },
    })
  }

  return cart
}