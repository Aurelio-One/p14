import React, { useEffect, useState } from 'react'
function AddEmployeeForm() {
  const { errorsMsg } = useSelector((state) => state.error)
  const [stateOptions, setStateOptions] = useState([])
  const [departmentOptions, setDepartmentOptions] = useState([])
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
              dateFormat='yyyy-MM-dd'
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
              dateFormat='yyyy-MM-dd'
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
                    target: { name: 'state', value: selectedOption.value },
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
              value={departmentOptions.find(
                (option) => option.value === data.department
              )}
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
    </div>
  )
export default AddEmployeeForm
