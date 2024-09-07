import { SearchState } from "@/Pages/SearchPage"
import { RestaurantSearchResponce } from "@/types"
import { useQuery } from "react-query"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useSearchRestaurant = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponce> => {
    const params = new URLSearchParams()
    params.set("searchQuery", searchState.searchQuery)
    const responce = await fetch(
      `${API_BASE_URL}/api/my/restaurant/search/${city}?${params.toString()}`
    )
    if (!responce.ok) {
      throw new Error("Failed to get restaurant")
    }

    return responce.json()
  }

  const { data: results, isLoading } = useQuery(
    ["searchRestaurant", searchState],
    createSearchRequest,

    { enabled: !!city }
  )

  return {
    results,
    isLoading,
  }
}
