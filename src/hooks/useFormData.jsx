import { useSelector, useDispatch } from 'react-redux'
import { setData, setIsSubmitted } from '../features/form/formSlice'
import { setErrorsMsg } from '../features/error/errorSlice'
import useErrorMsg from './useErrorMsg'

const useFormData = () => {
  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.form)
  const { validateField } = useErrorMsg()

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

  const handleChange = (event) => {
    const { name, value } = event.target
    dispatch(setData({ ...data, [name]: value }))
    validateField(name, value)
  }

  const resetForm = () => {
    dispatch(setData(initialData))
    dispatch(setErrorsMsg({}))
  }

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
