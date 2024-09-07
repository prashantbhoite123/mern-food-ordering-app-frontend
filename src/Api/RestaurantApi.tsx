import { RestaurantSearchResponce } from "@/types"
import { useQuery } from "react-query"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useSearchRestaurant = (city?: string) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponce> => {
    const responce = await fetch(
      `${API_BASE_URL}/api/my/restaurant/search/${city}`
    )
    if (!responce.ok) {
      throw new Error("Failed to get restaurant")
    }

    return responce.json()
  }

  const { data: results, isLoading } = useQuery(
    ["searchRestaurant"],
    createSearchRequest,

    { enabled: !!city }
  )

  return {
    results,
    isLoading,
  }
}
