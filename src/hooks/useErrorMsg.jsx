import { useDispatch } from 'react-redux'
import { setErrorsMsg } from '../slices/error/errorSlice'

/**
 * Custom hook for managing form field validation errors.
 * It dispatches actions to update error messages in the global state.
 *
 * @returns {Object} An object containing the `validateField` function.
 */
const useErrorMsg = () => {
  const dispatch = useDispatch()

  /**
   * Validates a form field and updates the error message state.
   * It checks different form fields like firstname, lastname, street, etc.,
   * and sets appropriate error messages based on the validation rules.
   *
   * @param {string} name - The name of the form field to validate.
   * @param {string} value - The current value of the form field.
   */
  const validateField = (name, value) => {
    let errorMsg = ''

    switch (name) {
      case 'firstname':
      case 'lastname':
        if (value === '' || value.length < 2) {
          errorMsg = `The ${name} field cannot be empty and must contain at least 2 characters.`
        } else {
          const regex = /^[a-zA-ZÀ-ÿ\s"’.-]*$/
          errorMsg = !regex.test(value)
            ? `The ${name} field must contain only letters`
            : ''
        }
        break

      case 'street':
      case 'city':
        errorMsg =
          value === '' || value.length < 2
            ? `The field ${name} cannot be empty.`
            : ''
        break

      case 'state':
        errorMsg = value === '' ? 'You must select a State.' : ''
        break

      case 'code':
        if (value === '') {
          errorMsg = `The field ${name} cannot be empty and must contain only numbers.`
        } else {
          const regex = /^[0-9]{1,5}$/
          errorMsg = !regex.test(value)
            ? `The field ${name} must contain only numbers and at least 5 numbers.`
            : ''
        }
        break

      case 'department':
        errorMsg = value === '' ? 'You must select a department.' : ''
        break

      default:
        console.log(`Sorry, we are out of ${name}.`)
        return
    }

    dispatch(setErrorsMsg({ [name]: errorMsg }))
  }

  return { validateField }
}

export default useErrorMsg
