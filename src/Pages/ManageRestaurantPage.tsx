import useCreateMyRestaurant, {
  useGetMyRestaturant,
} from "@/Api/MyRestaurantApi"
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateMyRestaurant()
  const { restaurant } = useGetMyRestaturant()
  
  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={createRestaurant}
      isLoading={isLoading}
    />
  )
}

export default ManageRestaurantPage
