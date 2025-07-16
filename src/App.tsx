import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { AddRecipePage } from './pages/AddRecipePage'
import { HomePage } from './pages/HomePage'
import { RecipePage } from './pages/RecipePage'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="sm:container sm:mx-auto sm:px-4 lg:px-6 sm:py-6 lg:py-8 sm:max-w-7xl pt-8">
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
