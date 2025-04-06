import { Product } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constans"
export const searchProducts = async (query: string) => {
  const { data } = await axiosInstance.get<Product[]>(
    ApiRoutes.SEARCH_PRODUCTS,
    { params: { query } }
  )
  return data
}


