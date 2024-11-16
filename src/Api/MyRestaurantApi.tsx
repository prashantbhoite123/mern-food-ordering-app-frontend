import { Order, Restaurant } from "@/types"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// export const useGetMyRestaturant = () => {
//   const { getAccessTokenSilently } = useAuth0()

//   const getMyrestaurantRequest = async (): Promise<Restaurant> => {
//     const accessToken = await getAccessTokenSilently()

//     const responce = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     })
//     if (!responce.ok) {
//       throw new Error("Faild to get restaurant !")
//     }

//     return restaurant
//   }

//   const { data: restaurant, isLoading } = useQuery(
//     "fetchMyRestaurant",
//     getMyrestaurantRequest
//   )

//   return { restaurant, isLoading }
// }

export const useGetMyRestaturant = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getMyrestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get restaurant!")
    }

    return response.json()
  }

  const {
    data: restaurant,
    isLoading,
    refetch,
  } = useQuery("fetchMyRestaurant", getMyrestaurantRequest)

  return { restaurant, isLoading, refetch }
}

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0()

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    })

    if (!response.ok) {
      throw new Error("Failed to create restaurant")
    }

    return response.json()
  }

  const { mutate: createRestaurant, isLoading } = useMutation(
    createMyRestaurantRequest,
    {
      onSuccess: () => {
        toast.success("Restaurant Created")
      },
      onError: () => {
        toast.error("Cannot create restaurant")
      },
    }
  )
  return { createRestaurant, isLoading }
}

// export const useUpdateRestaurant = () => {
//   const { getAccessTokenSilently } = useAuth0()

//   const updateRestaurantRequest = async (
//     restaurantFormData: FormData
//   ): Promise<Restaurant> => {
//     const accessToken = await getAccessTokenSilently()

//     const responce = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: restaurantFormData,
//     })

//     if (!responce) {
//       throw new Error("Failed to update restaurant")
//     }

//     return responce.json()
//   }

//   const {
//     mutate: updateRestaurant,
//     isLoading,
//     error,
//     isSuccess,
//   } = useMutation(updateRestaurantRequest)
//   if (isSuccess) {
//     toast.success("Restaurant Updated")
//   }

//   if (error) {
//     toast.error("Unable to update restaurant")
//   }

//   return { updateRestaurant, isLoading }
// }

export const useUpdateMyRestaurant = (refetch: () => void) => {
  const { getAccessTokenSilently } = useAuth0()

  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    for (let [key, value] of restaurantFormData.entries()) {
      console.log(`this is a api data : ${key}: ${value}`)
    }
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    })

    if (!response) {
      throw new Error("Failed to update restaurant")
    }

    return response.json()
  }

  const { mutate: updateRestaurant, isLoading } = useMutation(
    updateRestaurantRequest,
    {
      onSuccess: () => {
        toast.success("Restaurant Updated")
        refetch()
      },
      onError: () => {
        toast.error("Unable to update restaurant")
      },
    }
  )

  return { updateRestaurant, isLoading }
}


export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch orders")
    }

    return response.json()
  }

  const { data: orders, isLoading } = useQuery(
    "fetchMyRestaurantOrders",
    getMyRestaurantOrdersRequest
  )

  return { orders, isLoading }
}

export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0()

  const updateMyRestaurantOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    )

    if (!response.ok) {
      throw new Error("Failed to update status")
    }

    return response.json()
  }

  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyRestaurantOrder)

  if (isSuccess) {
    toast.success("Order updated")
  }

  if (isError) {
    toast.error("Unable to update order")
    reset()
  }

  return { updateRestaurantStatus, isLoading }
}

type UpdateOrderStatusRequest = {
  orderId: string
  status: string
}