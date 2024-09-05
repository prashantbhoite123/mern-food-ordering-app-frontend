import {
  useCreateMyRestaurant,
  useGetMyRestaturant,
  useUpdateMyRestaurant,
} from "@/Api/MyRestaurantApi"
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant()
  const { restaurant, refetch } = useGetMyRestaturant()
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant(refetch)

  const isEditing = !!restaurant

  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
    />
  )
}

export default ManageRestaurantPage
