import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import EmployeesPage from './pages/EmployeesPage/EmployeesPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <div className='App'>
      <Router>
        <header>
          <Navbar />
        </header>
        <Routes>
          <Route
            path='/'
            element={<LandingPage />}
          />
          <Route
            path='/employees'
            element={<EmployeesPage />}
          />
          <Route
            path='*'
            element={<ErrorPage />}
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
