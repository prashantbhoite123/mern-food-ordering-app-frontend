import useCreateMyRestaurant from "@/Api/MyRestaurantApi"
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateMyRestaurant()
  return (
    <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} />
  )
}

export default ManageRestaurantPage
