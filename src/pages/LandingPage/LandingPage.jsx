import React from 'react'
import AddEmployeeForm from '../../components/EmployeeForm/EmployeeForm'

/**
 * LandingPage component serves as the main entry point of the application.
 * It primarily renders the AddEmployeeForm component.
 */
function LandingPage() {
  return (
    <main>
      <div className='container'>
        <AddEmployeeForm />
      </div>
    </main>
  )
}

export default LandingPage