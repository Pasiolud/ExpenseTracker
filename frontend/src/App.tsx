import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import DashBoardPage from './pages/dashboard'
import Navbar from './components/navbar'
import TagsPage from './pages/tags'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/tags" element={<TagsPage />} />
      </Routes>
    </>
  )
}
export default App