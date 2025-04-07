import { Api } from "@/services/api-client"
import { Ingredient } from "@prisma/client"
import { useEffect, useState } from "react"
import { useSet } from "react-use"


interface ReturnProps {
  ingredients: Ingredient[]
  isLoading: boolean
  error: string | null
  selectedIngredients: Set<string>
  toggleSelectedIngredients: (id: string) => void
}
export  function useFilterIngredients(): ReturnProps{
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedIngredients, {toggle}] = useSet(new Set<string>([]))
  const toggleSelectedIngredients = (id: string) => {
    toggle(id)
  }

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
    selectedIngredients,
    toggleSelectedIngredients,
  }
}