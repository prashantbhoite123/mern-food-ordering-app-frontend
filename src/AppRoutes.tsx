import { Routes, Route, Navigate } from "react-router-dom"
import Layoutone from "./layouts/Layoutone.tsx"
import HomePage from "./Pages/HomePage.tsx"
import AuthCallbackPage from "./Pages/AuthCallbackPage.tsx"
import UserProfilePage from "./Pages/UserProfilePage.tsx"
import ProtectedRoute from "./auth/ProtectedRoute"
import ManageRestaurantPage from "./Pages/ManageRestaurantPage.tsx"
import SearchPage from "./Pages/SearchPage.tsx"
import DetailPage from "./Pages/DetailPage.tsx"
import OrderStatusPage from "./Pages/OrderStatusPage.tsx"

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layoutone showHero>
            <HomePage />
          </Layoutone>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/search/:city"
        element={
          <Layoutone showHero={false}>
            <SearchPage />
          </Layoutone>
        }
      />
      <Route
        path="/detail/:restaurantId"
        element={
          <Layoutone showHero={false}>
            <DetailPage />
          </Layoutone>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/order-status"
          element={
            <Layoutone>
              <OrderStatusPage />
            </Layoutone>
          }
        />
        <Route
          path="/user-profile"
          element={
            <Layoutone>
              <UserProfilePage />
            </Layoutone>
          }
        />
        <Route
          path="/manage-restaurant"
          element={
            <Layoutone>
              <ManageRestaurantPage />
            </Layoutone>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
