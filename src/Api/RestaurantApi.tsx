import { SearchState } from "@/Pages/SearchPage"

3
import { Restaurant, RestaurantSearchResponce } from "@/types"
import { useQuery } from "react-query"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const usegetRestaurant = (restaurantId?: string) => {
  const getMyrestaurantByIdRequest = async (): Promise<Restaurant> => {
    const responce = await fetch(
      `${API_BASE_URL}/api/my/restaurant/${restaurantId}`
    )

    if (!responce.ok) {
      throw new Error("Failed to get restaurant")
    }

    return responce.json()
  }
  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    getMyrestaurantByIdRequest,
    {
      enabled: !!restaurantId,
    }
  )
  return {
    restaurant,
    isLoading,
  }
}
export const useSearchRestaurant = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponce> => {
    const params = new URLSearchParams()
    params.set("searchQuery", searchState.searchQuery)
    params.set("page", searchState.page.toString())
    params.set("selectedCuisines", searchState.selectedCuisines.join(","))
    params.set("sortOption", searchState.sortOption)
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
