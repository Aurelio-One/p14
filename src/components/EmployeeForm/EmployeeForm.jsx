import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../../Datepicker.css'
import DatePicker from 'react-datepicker'
import Modal from 'am-react-modal'
import './EmployeeForm.css'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import states from '../../data/states'
import departments from '../../data/departments'
import useFormData from '../../hooks/useFormData'
import { setData, setIsSubmitted } from '../../slices/form/formSlice'
import { setErrorsMsg } from '../../slices/error/errorSlice'

/**
 * Component for adding a new employee to the system.
 * It allows for entering employee details, validates the input, and submits the data.
 */
function AddEmployeeForm() {
  const dispatch = useDispatch()
  const { data, isSubmitted } = useSelector((state) => state.form)
  const { errorsMsg } = useSelector((state) => state.error)

  const [stateOptions, setStateOptions] = useState([])
  const [departmentOptions, setDepartmentOptions] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)

  const { handleChange, saveEmployee, resetForm } = useFormData()

  // Initialize form state and options
  useEffect(() => {
    dispatch(
      setData({
        firstname: '',
        lastname: '',
        dateOfBirth: '',
        startDate: '',
        street: '',
        city: '',
        state: '',
        code: '',
        department: '',
      })
    )
    dispatch(setIsSubmitted(false))

    setStateOptions(
      states.map((state) => ({ value: state.abbreviation, label: state.name }))
    )
    setDepartmentOptions(
      departments.map((department) => ({
        value: department,
        label: department,
      }))
    )
  }, [dispatch])

  /**
   * Handles changes to date fields and updates the form state.
   * @param {Date} date - The new date selected by the user.
   * @param {string} fieldName - The field in the form state that this date corresponds to.
   */
  const handleDateChange = (date, fieldName) => {
    const formattedDate = date
      ? date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
      : ''
    dispatch(setData({ ...data, [fieldName]: formattedDate }))

    if (date) {
      dispatch(setErrorsMsg({ ...errorsMsg, [fieldName]: '' }))
    }
  }

  /**
   * Handles the submission of the form.
   * @param {Event} e - The event triggered on form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    await saveEmployee(e, data)
    if (isSubmitted) {
      setModalOpen(true)
    }
  }

  // Effect to handle the opening of the modal post submission
  useEffect(() => {
    if (isSubmitted) {
      setModalOpen(true)
    }
  }, [isSubmitted])

  /**
   * Closes the modal and resets the form to its initial state.
   */
  const handleCloseModal = () => {
    setModalOpen(false)
    resetForm()
  }

  // Render the form and the modal
  return (
    <div className='add-employee-form'>
      <h2 className='form-title'>HR NET - Create employee</h2>
      <form
        action='#'
        id='create-employee'
        onSubmit={handleSubmit}
      >
        <div className='form-content'>
          <div className='input-group'>
            <label htmlFor='first-name'>First Name</label>
            <input
              type='text'
              id='first-name'
              name='firstname'
              value={data.firstname}
              onChange={handleChange}
              className={errorsMsg.firstname ? 'error' : ''}
            />
            {errorsMsg.firstname && (
              <p className='form-error'>{errorsMsg.firstname}</p>
            )}
          </div>

          <div className='input-group'>
            <label htmlFor='last-name'>Last Name</label>
            <input
              type='text'
              id='last-name'
              name='lastname'
              value={data.lastname}
              onChange={handleChange}
              className={errorsMsg.lastname ? 'error' : ''}
            />
            {errorsMsg.lastname && (
              <p className='form-error'>{errorsMsg.lastname}</p>
            )}
          </div>

          <div className='input-group'>
            <label htmlFor='date-of-birth'>Date of Birth</label>
            <DatePicker
              selected={data.dateOfBirth ? new Date(data.dateOfBirth) : null}
              onChange={(date) => handleDateChange(date, 'dateOfBirth')}
              dateFormat='MM/dd/yyyy'
              className={errorsMsg.dateOfBirth ? 'error' : ''}
            />
            {errorsMsg.dateOfBirth && (
              <p className='form-error'>{errorsMsg.dateOfBirth}</p>
            )}
          </div>

          <div className='input-group'>
            <label htmlFor='start-date'>Start Date</label>
            <DatePicker
              selected={data.startDate ? new Date(data.startDate) : null}
              onChange={(date) => handleDateChange(date, 'startDate')}
              dateFormat='MM/dd/yyyy'
              className={errorsMsg.startDate ? 'error' : ''}
            />
            {errorsMsg.startDate && (
              <p className='form-error'>{errorsMsg.startDate}</p>
            )}
          </div>

          <fieldset className='address'>
            <legend>Address</legend>

            <div className='input-group'>
              <label htmlFor='street'>Street</label>
              <input
                id='street'
                type='text'
                name='street'
                value={data.street}
                onChange={handleChange}
                className={errorsMsg.street ? 'error' : ''}
              />
              {errorsMsg.street && (
                <p className='form-error'>{errorsMsg.street}</p>
              )}
            </div>

            <div className='input-group'>
              <label htmlFor='city'>City</label>
              <input
                id='city'
                type='text'
                name='city'
                value={data.city}
                onChange={handleChange}
                className={errorsMsg.city ? 'error' : ''}
              />
              {errorsMsg.city && <p className='form-error'>{errorsMsg.city}</p>}
            </div>

            <div className='input-group'>
              <label htmlFor='state'>State</label>
              <Select
                name='state'
                id='state'
                options={stateOptions}
                value={stateOptions.find(
                  (option) => option.value === data.state
                )}
                onChange={(selectedOption) =>
                  handleChange({
                    target: {
                      name: 'state',
                      value: selectedOption ? selectedOption.value : '',
                    },
                  })
                }
                className={errorsMsg.state ? 'error' : ''}
              />

              {errorsMsg.state && (
                <p className='form-error'>{errorsMsg.state}</p>
              )}
            </div>

            <div className='input-group'>
              <label htmlFor='zip-code'>Zip Code</label>
              <input
                id='zip-code'
                type='number'
                name='code'
                value={data.code}
                onChange={handleChange}
                className={errorsMsg.code ? 'error' : ''}
              />
              {errorsMsg.code && <p className='form-error'>{errorsMsg.code}</p>}
            </div>
          </fieldset>

          <div className='form-department'>
            <label htmlFor='department'>Department</label>
            <Select
              name='department'
              id='department'
              options={departmentOptions}
              value={
                departmentOptions.find(
                  (option) => option.value === data.department
                ) || null
              }
              onChange={(selectedOption) =>
                handleChange({
                  target: { name: 'department', value: selectedOption.value },
                })
              }
              className={errorsMsg.department ? 'error' : ''}
            />
            {errorsMsg.department && (
              <p className='form-error'>{errorsMsg.department}</p>
            )}
          </div>
        </div>

        <button
          type='submit'
          className='form-button'
        >
          Save
        </button>
      </form>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title='Employee Added'
          content={
            <p>The employee has been successfully added to your database.</p>
          }
          overlayClassName='m-overlay'
          contentClassName='m-content'
          titleClassName='m-title'
          bodyClassName='m-body'
          footerClassName='m-footer'
          closeButtonClassName='m-close-button'
        />
      )}
    </div>
  )
}

export default AddEmployeeForm
