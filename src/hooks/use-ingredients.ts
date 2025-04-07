import { Api } from '@/services/api-client'
import { Ingredient } from '@prisma/client'
import { useState, useEffect } from 'react'

interface ReturnProps {
  ingredients: Ingredient[]
  isLoading: boolean
  error: string | null
}
export  function useIngredients(): ReturnProps {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setIsLoading(true)
        const ingredients = await Api.ingredients.getAll()
        setIngredients(ingredients)
      } catch (error) {
        setError(error as string)
      } finally {
        setIsLoading(false)
      }
    }
    fetchIngredients()
  }, [])

  return {
    ingredients,
    isLoading,
    error,
  }
}
