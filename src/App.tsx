import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { HomePage } from './pages/HomePage'
import { RecipesPage } from './pages/RecipesPage'
import { CreateRecipePage } from './pages/CreateRecipePage'
import { SearchPage } from './pages/SearchPage'
import { LoginPage } from './pages/LoginPage'

const basename = new URL(document.baseURI).pathname.replace(/\/[^/]*$/, '') || '/'

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="recipes/new" element={<CreateRecipePage />} />
          <Route path="recipes" element={<RecipesPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
