import { Routes, Route, Navigate } from "react-router-dom"
import Layoutone from "./layouts/Layoutone.tsx"
import HomePage from "./Pages/HomePage.tsx"
import AuthCallbackPage from "./Pages/AuthCallbackPage.tsx"
import UserProfilePage from "./Pages/UserProfilePage.tsx"
import ProtectedRoute from "./auth/ProtectedRoute"

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

      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layoutone>
              <UserProfilePage />
            </Layoutone>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
