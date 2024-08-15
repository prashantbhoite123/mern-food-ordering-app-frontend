import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"
import {User } from "../types"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getMyUserRequest = async ():Promise<User> => {
    const accessToken = await getAccessTokenSilently()

    const responce = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
    if (!responce.ok) {
      throw new Error("Faild to fetch user")
    }
    return responce.json()
  }

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest)

  if (error) {
    toast.error(error.toString())
  }

  return { currentUser, isLoading }
}

type CreateUserRequest = {
  auth0Id: String
  email: String
}

export const userCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently()
    const responce = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    if (!responce.ok) {
      throw new Error("Faild to create user")
    }
  }

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest)

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  }
}

type UpdateMyUserRequest = {
  name: string
  addressLine1: string
  city: string
  country: string
}

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const updateMyUserRequest = async (fromData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently()
    const responce = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fromData),
    })

    if (!responce.ok) {
      throw new Error("Failed to update user")
    }
  }

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest)

  if (isSuccess) {
    toast.success("User Profile Updated !")
  }

  if (error) {
    toast.error(error.toString())
    reset()
  }

  return { updateUser, isLoading }
}
