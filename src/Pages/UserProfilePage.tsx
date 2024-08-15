import { useGetMyUser, useUpdateMyUser } from "@/Api/MyUser"
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm"

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser()
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser()

  if (isGetLoading) {
    return <span>Loading...</span>
  }

  if (!currentUser) {
    return <span>Unable load User Profile</span>
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  )
}

export default UserProfilePage
