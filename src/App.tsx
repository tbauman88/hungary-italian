import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { ScrollToTop } from './components/ScrollToTop'
import { useAuth } from './contexts/AuthContext'
import { AddRecipePage } from './pages/AddRecipePage'
import { EditRecipePage } from './pages/EditRecipePage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import { PantryPage } from './pages/PantryPage'
import { ProfileSettingsPage } from './pages/ProfileSettingsPage'
import { RecipePage } from './pages/RecipePage'

const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="sm:container sm:mx-auto sm:px-4 lg:px-6 sm:py-6 lg:py-8 sm:max-w-7xl pt-8">
        {children ?? <Outlet />}
      </main>
    </div>
  )
}

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route index element={<HomePage />} />
          <Route path="recipe/:id" element={<RecipePage />} />
          <Route path="recipe/:id/edit" element={<EditRecipePage />} />
          <Route path="recipe/add" element={<AddRecipePage />} />
          <Route path="profile/pantry" element={<PantryPage />} />
          <Route path="profile/settings" element={<ProfileSettingsPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/signup" element={<SignupPage />} /> */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
