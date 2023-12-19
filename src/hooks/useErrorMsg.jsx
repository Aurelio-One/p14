import { useDispatch } from 'react-redux'
import { setErrorsMsg } from '../features/error/errorSlice'
import moment from 'moment'

const useErrorMsg = () => {
  const dispatch = useDispatch()

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

      case 'dateOfBirth':
      case 'startDate':
        if (!value) {
          errorMsg = `The ${name} field is required.`
        } else {
          const formattedDate = moment(value, 'MM/DD/YYYY', true)
          if (!formattedDate.isValid()) {
            errorMsg = `The entered date for the field ${name} is invalid.`
          }
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
