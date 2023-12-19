import React from 'react'
import PropTypes from 'prop-types'
import './Modal.css'

function Modal({ text }) {
  const handleCloseModal = () => {
    const modal = document.querySelector('.modal')
    modal.style.display = 'none'
  }
  return (
    <div className='modal'>
      <div
        id='confirmation'
        className='modal-content'
      >
        <span
          className='modal-content-close'
          onClick={handleCloseModal}
          aria-hidden
        >
          X
        </span>
        <p className='modal-content-text'>{text}</p>
      </div>
    </div>
  )
}

Modal.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Modal
