import { Restaurant } from "@/types"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0()

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()

    const responce = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    })

    if (!responce.ok) {
      throw new Error("Faild to create restaurant")
    }

    return responce.json()
  }

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest)

  if (isSuccess) {
    toast.success("Restaurant created !")
  }

  if (error) {
    toast.error("Unable to Update restauarant")
  }
  return {
    createRestaurant,
    isLoading,
  }
}

export default useCreateMyRestaurant
