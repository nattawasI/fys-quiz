import React from 'react'
import PropTypes from 'prop-types'

const ButtonNext = ({dark, to, onClick}) => {
  const classStyle = () => {
    return dark ? 'button-next button-next--dark' : 'button-next'
  }

  const handleClick = () => {
    onClick()
  }

  return (
    <button type="button" className={classStyle()} onClick={handleClick}>
      ไปต่อ
    </button>
  )
}

ButtonNext.propTypes = {
  dark: PropTypes.bool,
  to: PropTypes.string,
  onClick: PropTypes.func,
}

ButtonNext.defaultProps = {
  dark: false,
  to: '',
  onClick: () => {},
}

export default ButtonNext
