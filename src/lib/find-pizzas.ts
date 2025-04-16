import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export interface GetSearchParams {
  query?: string
  sortBy?: string
  sizes?: string
  pizzaTypes?: string
  selectedIngredients?: string
  priceFrom?: string
  priceTo?: string
}
const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 1000

const categorySelect = {
  id: true,
  name: true,
  products: {
    include: {
      items: true,
      ingredients: true,
    },
  },
} satisfies Prisma.CategorySelect

export interface CategoryWithProducts
  extends Prisma.CategoryGetPayload<{
    select: typeof categorySelect
  }> {}
export async function FindPizzas(
  params: GetSearchParams
): Promise<CategoryWithProducts[]> {
  const sizes = params.sizes?.split(',').map(Number)
  const pizzaTypes = params.pizzaTypes?.split(',').map(Number)
  const ingredientsIdArr = params.selectedIngredients?.split(',').map(Number)

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE

  const pizzas = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          ingredients: ingredientsIdArr
            ? {
                some: {
                  id: {
                    in: ingredientsIdArr,
                  },
                },
              }
            : undefined,
          items: {
            some: {
              size: {
                in: sizes,
              },

              pizzaType: {
                in: pizzaTypes,
              },
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        include: {
          items: {
            orderBy: {
              price: 'asc',
            },
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
          ingredients: true,
        },
      },
    },
  })
  return pizzas
}
