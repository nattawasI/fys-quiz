import React, {useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {motion} from 'framer-motion'
import {useUserStateContext, useUserActionContext} from '../contexts/UserContext'
import ButtonNext from './ButtonNext'
import InputText from './InputText'

// Motion Variants
const formVariant = {
  hidden: {
    opacity: 0,
    y: 70
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.7
    },
  },
}

const buttonVariant = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 0.7,
      delay: 0.7,
    }
  },
}

const FormYear = ({changeScene, checkAnimate, inputFocus, inputBlur}) => {
  // context
  const {yearsKnownContext} = useUserStateContext()
  const {addYearsKnownContext} = useUserActionContext()

  // ref
  const inputRef = useRef(null)

  // state
  const [error, setError] = useState(false)

  // function
  const submitForm = (e) => {
    e.preventDefault()
    const inputValue = inputRef.current.value

    if (inputValue) {
      addYearsKnownContext(inputValue)
      changeScene()
    } else {
      setError(true)
    }
  }

  return (
    <div className="form-year">
      <form onSubmit={submitForm}>
        <motion.div className="form-year__form"
          key="motion1"
          variants={formVariant}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <div className="form-year__label text-story">คุณรู้จักเพื่อนสนิทคนนี้มานานแค่ไหน?</div>
          <div className="form-year__input">
            <InputText
              ref={inputRef}
              type="text"
              placeholder="ระบุช่วงเวลา"
              value={yearsKnownContext}
              isError={error}
              maxLength="2"
              onClick={inputFocus}
              onBlur={inputBlur}
            />
          </div>
        </motion.div>
        <motion.div className="form-year__button"
          key="motion2"
          variants={buttonVariant}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <ButtonNext onClick={submitForm} animateCompleted={checkAnimate} />
        </motion.div>
      </form>
    </div>
  )
}

FormYear.propTypes = {
  changeScene: PropTypes.func,
  inputFocus: PropTypes.func,
  inputBlur: PropTypes.func,
  checkAnimate: PropTypes.bool,
}

FormYear.defaultProps = {
  changeScene: () => {},
  inputFocus: () => {},
  inputBlur: () => {},
  checkAnimate: false,
}

export default FormYear
