import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { AddRecipePage } from './pages/AddRecipePage'
import { HomePage } from './pages/HomePage'
import { RecipePage } from './pages/RecipePage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
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
