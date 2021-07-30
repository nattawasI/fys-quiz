import React, {forwardRef, useState, useEffect} from 'react'
import PropTypes from 'prop-types'

const Input = forwardRef(({type, placeholder, value, onChange, isError, onlyText}, ref) => {
  // state
  const [inputValue, setInputValue] = useState()
  const [error, setError] = useState(isError)

  const handleChange = (e) => {
    const val = e.target.value

    if (type === 'number') {
      const regex = new RegExp('^[0-9]+$')
      const isOnlyNumber = regex.test(val)

      if (isOnlyNumber) {
        setInputValue(val)
      } else {
        setInputValue(inputValue + '')
      }
    } else { // type === 'text'
      setInputValue(val)
    }

    if (onlyText) {
      const regex = new RegExp('[0-9]')
      const isNumber = regex.test(val)
      if (!isNumber) {
        setInputValue(val)
      } else {
        setInputValue(inputValue + '')
      }
    }

    setError(false)
    onChange(val)
  }

  const classStyle = () => {
    return error ? 'input-text input-text--error' : 'input-text'
  }

  const handleClick = () => {
    ref.current.focus()
  }

  useEffect(() => {
    setError(isError)
  }, [isError])

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <div className={classStyle()}>
      {
        type === 'text'
        &&  <input
              type="text"
              ref={ref}
              placeholder={placeholder}
              value={inputValue}
              onChange={handleChange}
              onClick={handleClick}
            />
      }
      {
        type === 'number'
        &&  <input
              type="number"
              ref={ref}
              placeholder={placeholder}
              min="0"
              max="100"
              value={inputValue}
              onChange={handleChange}
              onClick={handleClick}
            />
      }
    </div>
  )
})

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderError: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  isError: PropTypes.bool,
  onlyText: PropTypes.bool,
}

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  placeholderError: '',
  value: '',
  onChange: () => {},
  isError: false,
  onlyText: false
}

export default Input
