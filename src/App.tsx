import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { AddRecipePage } from './pages/AddRecipePage'
import { HomePage } from './pages/HomePage'
import { RecipePage } from './pages/RecipePage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/add-recipe" element={<AddRecipePage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
