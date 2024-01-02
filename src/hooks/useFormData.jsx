import { useSelector, useDispatch } from 'react-redux'
import { setData, setIsSubmitted } from '../slices/form/formSlice'
import { setErrorsMsg } from '../slices/error/errorSlice'
import useErrorMsg from './useErrorMsg'
import { addUser } from '../slices/user/userSlice'

/**
 * Custom hook to manage form data for creating and submitting an employee form.
 * It encapsulates the logic for handling changes, resetting form, and saving employee data.
 *
 * @returns {Object} An object containing functions for form handling.
 */
const useFormData = () => {
  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.form)
  const { validateField } = useErrorMsg()

  // Initial data structure for the form
  const initialData = {
    firstname: '',
    lastname: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    code: '',
    department: '',
  }

  /**
   * Handles changes in form inputs and updates the form data in the state.
   * It also validates the field value.
   *
   * @param {Event} event - The change event from the input field.
   */
  const handleChange = (event) => {
    const { name, value } = event.target
    dispatch(setData({ ...data, [name]: value }))
    validateField(name, value)
  }

  /**
   * Resets the form to its initial state and clears any error messages.
   */
  const resetForm = () => {
    dispatch(setData(initialData))
    dispatch(setErrorsMsg({}))
  }

  /**
   * Saves the employee data to the store if the data is valid.
   * If there are validation errors, sets error messages in the state.
   *
   * @param {Event} e - The submit event from the form.
   */
  const saveEmployee = (e) => {
    e.preventDefault()

    const requiredFields = [
      'firstname',
      'lastname',
      'dateOfBirth',
      'startDate',
      'street',
      'city',
      'state',
      'code',
      'department',
    ]

    let newErrors = {}
    let hasErrors = false
    requiredFields.forEach((field) => {
      if (!data[field]) {
        newErrors[field] = `Please enter your ${field}`
        hasErrors = true
      }
    })

    dispatch(setErrorsMsg(newErrors))

    if (!hasErrors) {
      dispatch(addUser(data))
      dispatch(setIsSubmitted(true))
      resetForm()
    } else {
      dispatch(setIsSubmitted(false))
    }
  }

  return {
    handleChange,
    resetForm,
    saveEmployee,
  }
}

export default useFormData
