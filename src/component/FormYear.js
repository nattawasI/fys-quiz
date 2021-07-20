import React, {useRef, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {motion} from 'framer-motion'
import { useUserStateContext, useUserActionContext } from '../context/UserContext'
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

const FormYear = ({changeScene}) => {
  // context
  const {yearsKnownContext} = useUserStateContext()
  const {addYearsKnownContext} = useUserActionContext()

  // ref
  const inputRef = useRef(null)

  // state
  const [error, setError] = useState(false)

  // function
  const handleClick = () => {
    const inputValue = inputRef.current.value

    if (inputValue) {
      addYearsKnownContext(inputValue)
      changeScene()
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <div className="form-year">
      <motion.div className="form-year__form"
        key="motion1"
        variants={formVariant}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <div className="form-year__label text-story">คุณรู้จักเพื่อนสนิทคนนี้มากี่ปี?</div>
        <div className="form-year__input">
          <InputText
            ref={inputRef}
            type="number"
            placeholder="ใส่ตัวเลข..."
            value={yearsKnownContext}
            isError={error}
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
        <ButtonNext onClick={handleClick} />
      </motion.div>
    </div>
  )
}

FormYear.propTypes = {
  changeScene: PropTypes.func,
}

FormYear.defaultProps = {
  changeScene: () => {},
}

export default FormYear
