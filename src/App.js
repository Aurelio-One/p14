import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import LandingPage from './pages/LandingPage/LandingPage'
import EmployeesPage from './pages/EmployeesPage/EmployeesPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import Navbar from './components/Navbar/Navbar'

/**
 * Main application component.
 * It sets up the Redux provider, router, and defines the application's main routes.
 */
function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App
